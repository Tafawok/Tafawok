"use client"

import * as React from "react"
import Image from "next/image"
import { toast } from "sonner"
import {
  UploadCloud,
  X,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Link as LinkIcon,
  Film,
  Video,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export type MediaAcceptType = "image" | "video" | "all"

interface MediaUploaderProps {
  value?: string
  onChange: (url: string) => void
  folder?: string
  label?: string
  className?: string
  acceptType?: MediaAcceptType
  aspectRatio?: "video" | "square" | "portrait" | "auto"
}

const IMAGE_MIME_TYPES =
  "image/jpeg,image/png,image/webp,image/gif,image/svg+xml,image/avif"
const VIDEO_MIME_TYPES =
  "video/mp4,video/webm,video/ogg,video/quicktime,video/x-matroska"
const ALL_MIME_TYPES = `${IMAGE_MIME_TYPES},${VIDEO_MIME_TYPES}`

const MAX_IMAGE_SIZE_BYTES = 20 * 1024 * 1024 // 20MB
const MAX_VIDEO_SIZE_BYTES = 100 * 1024 * 1024 // 100MB

function isVideoUrl(url?: string): boolean {
  if (!url) return false
  return /\.(mp4|webm|ogg|mov|mkv)(\?.*)?$/i.test(url)
}

export function MediaUploader({
  value,
  onChange,
  folder = "properties",
  label,
  className,
  acceptType = "all",
  aspectRatio = "video",
}: MediaUploaderProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [showUrlInput, setShowUrlInput] = React.useState(false)
  const [urlDraft, setUrlDraft] = React.useState("")
  const [dragActive, setDragActive] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const isSupabaseUrl = Boolean(
    value &&
    (value.includes("supabase.co") ||
      value.includes("/storage/v1/object/public/"))
  )

  const isCurrentVideo = isVideoUrl(value) || acceptType === "video"

  const acceptedMime =
    acceptType === "image"
      ? IMAGE_MIME_TYPES
      : acceptType === "video"
        ? VIDEO_MIME_TYPES
        : ALL_MIME_TYPES

  const helperText =
    acceptType === "image"
      ? "JPG, PNG, WebP, SVG up to 20MB"
      : acceptType === "video"
        ? "MP4, WebM, MOV, OGG up to 100MB"
        : "Images (up to 20MB) or Videos (up to 100MB)"

  const handleFileUpload = async (file: File) => {
    const isImageFile = file.type.startsWith("image/")
    const isVideoFile = file.type.startsWith("video/")

    if (acceptType === "image" && !isImageFile) {
      toast.error("Please upload an image file (JPG, PNG, WebP, SVG, AVIF).")
      return
    }

    if (acceptType === "video" && !isVideoFile) {
      toast.error("Please upload a video file (MP4, WebM, MOV, OGG).")
      return
    }

    if (!isImageFile && !isVideoFile) {
      toast.error("Invalid file format. Only images and videos are supported.")
      return
    }

    const maxLimit = isVideoFile ? MAX_VIDEO_SIZE_BYTES : MAX_IMAGE_SIZE_BYTES
    const maxLimitLabel = isVideoFile ? "100MB" : "20MB"

    if (file.size > maxLimit) {
      toast.error(
        `File size (${(file.size / 1024 / 1024).toFixed(1)}MB) exceeds maximum limit of ${maxLimitLabel}.`
      )
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)

    try {
      const res = await fetch("/api/nexus/upload", {
        method: "POST",
        body: formData,
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Upload failed.")
      }

      const uploadedUrl = json.data.url
      onChange(uploadedUrl)
      toast.success(
        isVideoFile
          ? "Video tour uploaded to Tafawok CDN successfully!"
          : "Image uploaded to Tafawok CDN successfully!"
      )
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to upload media."
      toast.error(message)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleApplyUrl = () => {
    if (!urlDraft.trim()) return
    onChange(urlDraft.trim())
    setUrlDraft("")
    setShowUrlInput(false)
    toast.success("Media URL applied.")
  }

  const handleRemove = () => {
    onChange("")
  }

  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    auto: "min-h-48",
  }[aspectRatio]

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-medium text-foreground">
            {acceptType === "video" ? (
              <Video className="size-3.5 text-primary" />
            ) : null}
            {label}
          </span>
          {value && (
            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground transition-colors hover:text-primary"
            >
              <LinkIcon className="size-3" />
              <span>{showUrlInput ? "Hide URL" : "Edit URL"}</span>
            </button>
          )}
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedMime}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0])
          }
        }}
      />

      {/* URL Input Bar (Collapsible) */}
      {showUrlInput && (
        <div className="flex gap-2">
          <Input
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            placeholder="https://... or /assets/..."
            className="h-8 text-xs"
          />
          <Button
            type="button"
            size="sm"
            onClick={handleApplyUrl}
            className="h-8 bg-primary px-3 text-xs text-primary-foreground"
          >
            Apply
          </Button>
        </div>
      )}

      {/* Media Preview or Drop Zone */}
      {value ? (
        <div
          className={cn(
            "group relative overflow-hidden rounded-lg border border-border/80 bg-neutral-950 transition-all",
            aspectClasses
          )}
        >
          {/* Render Video or Image */}
          {isCurrentVideo ? (
            <div className="relative flex size-full items-center justify-center bg-black">
              <video
                src={value}
                controls
                playsInline
                preload="metadata"
                className="size-full object-contain"
              />
            </div>
          ) : value.startsWith("http") || value.startsWith("/") ? (
            <Image
              src={value}
              alt="Media Preview"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
              unoptimized={!value.startsWith("http")}
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-muted text-xs text-muted-foreground">
              Preview not available
            </div>
          )}

          {/* Badges / Overlay */}
          <div className="pointer-events-none absolute inset-s-2 top-2 z-10 flex items-center gap-1.5">
            {isCurrentVideo && (
              <span className="inline-flex items-center gap-1 rounded border border-sky-400/30 bg-black/85 px-1.5 py-0.5 text-[10px] font-bold text-sky-400 backdrop-blur-md">
                <Film className="size-3" />
                Video Stream
              </span>
            )}
            {isSupabaseUrl ? (
              <span className="inline-flex items-center gap-1 rounded border border-amber-400/30 bg-black/85 px-1.5 py-0.5 text-[10px] font-bold text-amber-400 backdrop-blur-md">
                <CheckCircle2 className="size-3" />
                Supabase CDN
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded bg-black/85 px-1.5 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-md">
                <ExternalLink className="size-2.5" />
                Direct Link
              </span>
            )}
          </div>

          {/* Action Overlay controls (visible on top-right) */}
          <div className="absolute inset-e-2 top-2 z-20 flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="h-7 border-white/20 bg-black/80 px-2 text-[11px] text-white backdrop-blur-md hover:bg-black"
            >
              {isUploading ? (
                <Loader2 className="me-1 size-3 animate-spin" />
              ) : (
                <UploadCloud className="me-1 size-3" />
              )}
              Replace
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={isUploading}
              onClick={handleRemove}
              className="h-7 bg-destructive/90 px-2 text-[11px] hover:bg-destructive"
            >
              <X className="size-3" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all",
            dragActive
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50 hover:bg-muted/40",
            aspectClasses
          )}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-center">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-xs font-semibold text-foreground">
                Uploading to Supabase CDN...
              </p>
              <p className="text-[11px] text-muted-foreground">
                Optimizing and storing asset on high-speed CDN
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="rounded-full bg-muted p-3 text-muted-foreground">
                {acceptType === "video" ? (
                  <Video className="size-6 text-primary" />
                ) : (
                  <UploadCloud className="size-6 text-primary" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">
                  Click to upload or drag & drop
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {helperText}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowUrlInput(!showUrlInput)
                }}
                className="mt-1 h-7 text-[11px]"
              >
                <LinkIcon className="me-1 size-3" />
                Or paste URL
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
