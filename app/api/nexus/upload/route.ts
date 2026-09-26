import { NextRequest } from "next/server"
import { authenticateNexusAdmin, apiSuccess, apiError } from "@/lib/api/nexus-auth"

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
])
const MAX_IMAGE_SIZE_BYTES = 20 * 1024 * 1024 // 20MB for images
const MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024 // 100MB for video walkthroughs

/**
 * POST /api/nexus/upload
 * Handles multipart media (images and videos) uploads to Supabase Storage with super admin validation.
 */
export async function POST(req: NextRequest) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const folder = (formData.get("folder") as string | null)?.trim() || "general"

    if (!file || typeof file === "string") {
      return apiError("No file provided for upload. Form field 'file' is required.", 400)
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return apiError(
        `Invalid file type '${file.type}'. Allowed types: Images (JPG, PNG, WebP, GIF, SVG, AVIF) and Videos (MP4, WebM, OGG, MOV).`,
        400
      )
    }

    const isVideo = file.type.startsWith("video/")
    const maxLimit = isVideo ? MAX_VIDEO_SIZE_BYTES : MAX_IMAGE_SIZE_BYTES
    const maxLimitLabel = isVideo ? "100MB" : "20MB"

    if (file.size > maxLimit) {
      return apiError(
        `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum limit of ${maxLimitLabel} for ${isVideo ? "video walkthroughs" : "images"}.`,
        400
      )
    }

    // Sanitize file name and build structured path
    const sanitizedOriginalName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, "-")
      .replace(/-+/g, "-")
    const timestamp = Date.now()
    const filePath = `${folder}/${timestamp}-${sanitizedOriginalName}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data, error: uploadError } = await auth.supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError || !data) {
      return apiError(`Storage upload failed: ${uploadError?.message}`, 500)
    }

    const {
      data: { publicUrl },
    } = auth.supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path)

    const mediaType = isVideo ? "video" : "image"

    return apiSuccess(
      {
        url: publicUrl,
        path: data.path,
        filename: file.name,
        size: file.size,
        mimeType: file.type,
        mediaType,
      },
      201,
      `${isVideo ? "Video" : "Image"} uploaded successfully to Tafawok CDN.`
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload processing failed."
    return apiError(message, 500)
  }
}

/**
 * GET /api/nexus/upload
 * Lists uploaded assets from Supabase Storage bucket.
 */
export async function GET(req: NextRequest) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { searchParams } = new URL(req.url)
    const folder = searchParams.get("folder") || ""
    const limit = parseInt(searchParams.get("limit") || "100", 10)
    const offset = parseInt(searchParams.get("offset") || "0", 10)

    const { data: files, error } = await auth.supabase.storage
      .from(BUCKET_NAME)
      .list(folder, {
        limit,
        offset,
        sortBy: { column: "created_at", order: "desc" },
      })

    if (error) {
      return apiError(`Failed to list storage assets: ${error.message}`, 500)
    }

    const filesWithUrls = (files || [])
      .filter((f) => f.name !== ".emptyFolderPlaceholder")
      .map((f) => {
        const fullPath = folder ? `${folder}/${f.name}` : f.name
        const {
          data: { publicUrl },
        } = auth.supabase.storage.from(BUCKET_NAME).getPublicUrl(fullPath)

        const isVideo = Boolean(
          f.metadata?.mimetype?.startsWith("video/") ||
          /\.(mp4|webm|ogg|mov|mkv)$/i.test(f.name)
        )

        return {
          id: f.id,
          name: f.name,
          path: fullPath,
          size: f.metadata?.size,
          mimeType: f.metadata?.mimetype,
          mediaType: isVideo ? "video" : "image",
          createdAt: f.created_at,
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
 * Removes an image asset from Supabase Storage by path.
 */
export async function DELETE(req: NextRequest) {
  const auth = await authenticateNexusAdmin()
  if (!auth.authorized) return auth.response

  try {
    const { searchParams } = new URL(req.url)
    let path = searchParams.get("path")

    if (!path) {
      const body = await req.json().catch(() => ({}))
      path = body?.path
    }

    if (!path) {
      return apiError("Query parameter or body field 'path' is required to delete an asset.", 400)
    }

    const { error } = await auth.supabase.storage.from(BUCKET_NAME).remove([path])
    if (error) {
      return apiError(`Failed to delete storage asset: ${error.message}`, 500)
    }

    return apiSuccess({ deletedPath: path }, 200, "Asset deleted successfully.")
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete media asset."
    return apiError(message, 500)
  }
}
