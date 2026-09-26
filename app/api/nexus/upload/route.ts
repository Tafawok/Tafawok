import { NextRequest } from "next/server"
import type { FileObject } from "@supabase/storage-js"
import { createClient } from "@/lib/supabase/server"
import {
  authenticateNexusAdmin,
  apiSuccess,
  apiError,
} from "@/lib/api/nexus-auth"

const BUCKET_NAME = "tafawok-media"

const ALLOWED_MIME_TYPES = new Set([
  // Images
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
  // Videos
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
  "video/x-matroska",
  // Documents (Company Profile, Brochures, Architectural Specifications)
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/octet-stream",
])

const MAX_IMAGE_SIZE_BYTES = 20 * 1024 * 1024 // 20MB for images
const MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024 // 100MB for video walkthroughs
const MAX_DOC_SIZE_BYTES = 50 * 1024 * 1024 // 50MB for PDF documents / profiles

/**
 * Extracts storage object path from a full CDN URL or relative path.
 */
function extractStoragePath(urlOrPath: string): string {
  if (!urlOrPath) return ""
  const marker = `/storage/v1/object/public/${BUCKET_NAME}/`
  if (urlOrPath.includes(marker)) {
    return decodeURIComponent(urlOrPath.split(marker)[1])
  }
  const altMarker = `/${BUCKET_NAME}/`
  if (urlOrPath.includes(altMarker) && urlOrPath.startsWith("http")) {
    return decodeURIComponent(urlOrPath.split(altMarker)[1])
  }
  if (urlOrPath.startsWith(`${BUCKET_NAME}/`)) {
    return urlOrPath.replace(`${BUCKET_NAME}/`, "")
  }
  return urlOrPath.trim()
}

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

interface StorageFileItem extends FileObject {
  path?: string
}

/**
 * Recursively lists all files in a Supabase storage bucket across nested folders.
 */
async function listAllFiles(
  supabase: SupabaseServerClient,
  folder: string = ""
): Promise<StorageFileItem[]> {
  const { data: items, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(folder, {
      limit: 100,
      sortBy: { column: "created_at", order: "desc" },
    })
  if (error || !items) return []

  let results: StorageFileItem[] = []
  for (const item of items) {
    if (item.name === ".emptyFolderPlaceholder") continue
    const itemPath = folder ? `${folder}/${item.name}` : item.name

    if (item.id === null) {
      // Subfolder - traverse recursively
      const subItems = await listAllFiles(supabase, itemPath)
      results = results.concat(subItems)
    } else {
      results.push({ ...item, path: itemPath })
    }
  }
  return results
}

/**
 * POST /api/nexus/upload
 * Handles multipart media (images, videos, and PDF documents) uploads to Supabase Storage.
 */
export async function POST(req: NextRequest) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const folder =
      (formData.get("folder") as string | null)?.trim() || "general"
    const customFilename = (
      formData.get("customFilename") as string | null
    )?.trim()

    if (!file || typeof file === "string") {
      return apiError(
        "No file provided for upload. Form field 'file' is required.",
        400
      )
    }

    const acceptType =
      (formData.get("acceptType") as string | null)?.trim() || ""

    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    const isDoc =
      isPdf ||
      file.type.includes("document") ||
      file.type.includes("presentation") ||
      file.type.includes("msword") ||
      /\.(pdf|docx?|pptx?)$/i.test(file.name)
    const isVideo =
      file.type.startsWith("video/") ||
      /\.(mp4|webm|ogg|mov|mkv)$/i.test(file.name)
    const isImage =
      file.type.startsWith("image/") ||
      /\.(jpe?g|png|webp|gif|svg|avif)$/i.test(file.name)

    // Strict validation based on acceptType or specific folders
    if (acceptType === "image" || (!acceptType && folder === "stores")) {
      if (!isImage) {
        return apiError(
          "Validation failed: This field only accepts image files (JPG, PNG, WebP, SVG, AVIF). Videos and PDF documents are not permitted.",
          400
        )
      }
    } else if (acceptType === "video") {
      if (!isVideo) {
        return apiError(
          "Validation failed: This field only accepts video files (MP4, WebM, MOV). Images and PDF documents are not permitted.",
          400
        )
      }
    } else if (
      acceptType === "document" ||
      (!acceptType && folder === "documents")
    ) {
      if (!isDoc) {
        return apiError(
          "Validation failed: This field only accepts document files (PDF). Images and video files are not permitted.",
          400
        )
      }
    } else if (acceptType === "media") {
      if (isDoc) {
        return apiError(
          "Validation failed: PDF documents are not permitted in the visual & video gallery. Please upload an image or video file.",
          400
        )
      }
      if (!isImage && !isVideo) {
        return apiError(
          "Validation failed: Only images and videos are permitted for this gallery field.",
          400
        )
      }
    }

    if (!ALLOWED_MIME_TYPES.has(file.type) && !isPdf && !isImage && !isVideo) {
      return apiError(
        `Invalid file type '${file.type}'. Allowed types: Images (JPG, PNG, WebP, GIF, SVG, AVIF), Videos (MP4, WebM, MOV), and Documents (PDF).`,
        400
      )
    }

    const maxLimit = isVideo
      ? MAX_VIDEO_SIZE_BYTES
      : isDoc
        ? MAX_DOC_SIZE_BYTES
        : MAX_IMAGE_SIZE_BYTES
    const maxLimitLabel = isVideo ? "100MB" : isDoc ? "50MB" : "20MB"

    if (file.size > maxLimit) {
      return apiError(
        `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum limit of ${maxLimitLabel} for ${
          isVideo ? "video walkthroughs" : isDoc ? "documents (PDF)" : "images"
        }.`,
        400
      )
    }

    // Sanitize file name and build structured path
    const sanitizedOriginalName = (customFilename || file.name)
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-")
      .replace(/-+/g, "-")
    const timestamp = Date.now()
    const filePath = `${folder}/${timestamp}-${sanitizedOriginalName}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const contentType = isPdf
      ? "application/pdf"
      : file.type || "application/octet-stream"

    const { data, error: uploadError } = await auth.supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType,
        upsert: true,
      })

    if (uploadError || !data) {
      return apiError(`Storage upload failed: ${uploadError?.message}`, 500)
    }

    const {
      data: { publicUrl },
    } = auth.supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path)

    const mediaType = isVideo ? "video" : isDoc ? "document" : "image"

    return apiSuccess(
      {
        url: publicUrl,
        path: data.path,
        filename: file.name,
        size: file.size,
        mimeType: contentType,
        mediaType,
      },
      201,
      `${
        isVideo ? "Video" : isDoc ? "Document" : "Image"
      } uploaded successfully to Tafawok CDN.`
    )
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Upload processing failed."
    return apiError(message, 500)
  }
}

/**
 * GET /api/nexus/upload
 * Lists uploaded assets from Supabase Storage bucket.
 * Supports folder filtering or full recursive listing.
 */
export async function GET(req: NextRequest) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { searchParams } = new URL(req.url)
    const folder = searchParams.get("folder") || "all"

    let rawFiles: StorageFileItem[] = []

    if (!folder || folder === "all") {
      // List all assets recursively
      rawFiles = await listAllFiles(auth.supabase)
    } else {
      const { data: files, error } = await auth.supabase.storage
        .from(BUCKET_NAME)
        .list(folder, {
          limit: 100,
          sortBy: { column: "created_at", order: "desc" },
        })

      if (error) {
        return apiError(`Failed to list storage assets: ${error.message}`, 500)
      }

      rawFiles = (files || [])
        .filter((f) => f.name !== ".emptyFolderPlaceholder" && f.id !== null)
        .map((f) => ({
          ...f,
          path: `${folder}/${f.name}`,
        }))
    }

    const filesWithUrls = rawFiles.map((f) => {
      const fullPath = f.path || f.name
      const {
        data: { publicUrl },
      } = auth.supabase.storage.from(BUCKET_NAME).getPublicUrl(fullPath)

      const mimeType = f.metadata?.mimetype || ""
      const isVideo = Boolean(
        mimeType.startsWith("video/") ||
        /\.(mp4|webm|ogg|mov|mkv)$/i.test(f.name)
      )
      const isDoc = Boolean(
        mimeType === "application/pdf" ||
        /\.(pdf|doc|docx|ppt|pptx)$/i.test(f.name)
      )
      const mediaType = isVideo ? "video" : isDoc ? "document" : "image"

      return {
        id: f.id || fullPath,
        name: f.name,
        path: fullPath,
        folder: fullPath.includes("/") ? fullPath.split("/")[0] : "root",
        size: f.metadata?.size || 0,
        mimeType,
        mediaType,
        createdAt: f.created_at || f.updated_at || new Date().toISOString(),
        url: publicUrl,
      }
    })

    return apiSuccess({ files: filesWithUrls, count: filesWithUrls.length })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to list media."
    return apiError(message, 500)
  }
}

/**
 * DELETE /api/nexus/upload
 * Removes an image, video, or document asset from Supabase Storage by path or URL.
 */
export async function DELETE(req: NextRequest) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { searchParams } = new URL(req.url)
    let rawPath = searchParams.get("path")
    let rawUrl = searchParams.get("url")

    if (!rawPath && !rawUrl) {
      const body = await req.json().catch(() => ({}))
      rawPath = body?.path
      rawUrl = body?.url
    }

    const targetPath = extractStoragePath(rawPath || rawUrl || "")

    if (!targetPath) {
      return apiError(
        "A valid storage 'path' or Supabase CDN 'url' is required to delete an asset.",
        400
      )
    }

    const { error } = await auth.supabase.storage
      .from(BUCKET_NAME)
      .remove([targetPath])
    if (error) {
      return apiError(`Failed to delete storage asset: ${error.message}`, 500)
    }

    return apiSuccess(
      { deletedPath: targetPath },
      200,
      `Asset '${targetPath}' permanently deleted from Supabase bucket.`
    )
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to delete media asset."
    return apiError(message, 500)
  }
}
