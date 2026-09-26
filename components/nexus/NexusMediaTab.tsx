"use client"

import * as React from "react"
import Image from "next/image"
import { toast } from "sonner"
import {
  UploadCloud,
  Trash2,
  Copy,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Film,
  Search,
  Check,
  Loader2,
  RefreshCw,
  HardDrive,
  FolderArchive,
  Download,
  AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export interface StorageAsset {
  id: string
  name: string
  path: string
  folder: string
  size: number
  mimeType: string
  mediaType: "image" | "video" | "document"
  createdAt: string
  url: string
}

function formatBytes(bytes: number, decimals: number = 1): string {
  if (!bytes || bytes === 0) return "0 B"
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function NexusMediaTab() {
  const [assets, setAssets] = React.useState<StorageAsset[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState<"all" | "image" | "document" | "video">("all")
  const [folderFilter, setFolderFilter] = React.useState<string>("all")
  const [copiedUrl, setCopiedUrl] = React.useState<string | null>(null)

  // Upload state
  const [uploadFolder, setUploadFolder] = React.useState<string>("general")
  const [isUploading, setIsUploading] = React.useState(false)
  const [dragActive, setDragActive] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  // Delete dialog state
  const [assetToDelete, setAssetToDelete] = React.useState<StorageAsset | null>(null)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const loadAssets = React.useCallback(async (setSpinner: boolean = true) => {
    if (setSpinner) {
      setIsLoading(true)
    }
    try {
      const res = await fetch("/api/nexus/upload?folder=all")
      const json = await res.json()
      if (res.ok && json.success) {
        setAssets(json.data.files || [])
      } else {
        toast.error(json.error || "Failed to load media assets.")
      }
    } catch {
      toast.error("Failed to connect to media storage.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    let ignore = false
    async function init() {
      try {
        const res = await fetch("/api/nexus/upload?folder=all")
        const json = await res.json()
        if (!ignore && res.ok && json.success) {
          setAssets(json.data.files || [])
        }
      } catch {
        if (!ignore) toast.error("Failed to connect to media storage.")
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }
    init()
    return () => {
      ignore = true
    }
  }, [])

  // Handle single file upload with strict folder type enforcement
  const handleFileUpload = async (file: File) => {
    const isImageFile =
      file.type.startsWith("image/") ||
      /\.(jpe?g|png|webp|gif|svg|avif)$/i.test(file.name)
    const isVideoFile =
      file.type.startsWith("video/") ||
      /\.(mp4|webm|ogg|mov|mkv)$/i.test(file.name)
    const isDocFile =
      file.type === "application/pdf" ||
      file.type.includes("document") ||
      file.type.includes("presentation") ||
      file.type.includes("msword") ||
      /\.(pdf|docx?|pptx?)$/i.test(file.name)

    // Strict validation based on target folder
    if (uploadFolder === "documents" && !isDocFile) {
      toast.error(
        "The 'documents' folder is reserved for PDF documents (Company Profile, Brochures). Images and videos are not allowed."
      )
      return
    }

    if (uploadFolder === "properties" && isDocFile) {
      toast.error(
        "The 'properties' folder only accepts image renders and video tours. PDF documents are not allowed here."
      )
      return
    }

    if (uploadFolder === "stores" && !isImageFile) {
      toast.error(
        "The 'stores' folder only accepts image files for retail logos. Video tours and documents are not allowed here."
      )
      return
    }

    if (!isImageFile && !isVideoFile && !isDocFile) {
      toast.error("Invalid file format. Only images, videos, and PDF documents are supported.")
      return
    }

    setIsUploading(true)
    const acceptTypeForFolder =
      uploadFolder === "documents"
        ? "document"
        : uploadFolder === "stores"
          ? "image"
          : uploadFolder === "properties"
            ? "media"
            : "all"

    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", uploadFolder)
    formData.append("acceptType", acceptTypeForFolder)

    try {
      const res = await fetch("/api/nexus/upload", {
        method: "POST",
        body: formData,
      })
      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Upload failed.")
      }

      toast.success(`Asset '${file.name}' uploaded successfully to CDN!`)
      await loadAssets(false)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to upload file."
      toast.error(message)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  // Handle Drag & Drop
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

  // Handle Copy URL
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    toast.success("CDN URL copied to clipboard!")
    setTimeout(() => setCopiedUrl(null), 2500)
  }

  // Handle Delete Confirmation
  const confirmDeleteAsset = async () => {
    if (!assetToDelete) return
    setIsDeleting(true)

    try {
      const res = await fetch(
        `/api/nexus/upload?path=${encodeURIComponent(assetToDelete.path)}`,
        { method: "DELETE" }
      )
      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to delete file.")
      }

      toast.success(`File '${assetToDelete.name}' permanently deleted from bucket.`)
      setAssets((prev) => prev.filter((a) => a.path !== assetToDelete.path))
      setAssetToDelete(null)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to delete asset."
      toast.error(message)
    } finally {
      setIsDeleting(false)
    }
  }

  // Filtered Assets
  const filteredAssets = React.useMemo(() => {
    return assets.filter((asset) => {
      const matchesSearch =
        searchQuery === "" ||
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.path.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType =
        typeFilter === "all" || asset.mediaType === typeFilter

      const matchesFolder =
        folderFilter === "all" || asset.folder === folderFilter

      return matchesSearch && matchesType && matchesFolder
    })
  }, [assets, searchQuery, typeFilter, folderFilter])

  // Aggregate Metrics
  const metrics = React.useMemo(() => {
    let images = 0
    let documents = 0
    let videos = 0
    let totalBytes = 0

    for (const a of assets) {
      if (a.mediaType === "image") images++
      else if (a.mediaType === "document") documents++
      else if (a.mediaType === "video") videos++
      totalBytes += a.size || 0
    }

    return {
      total: assets.length,
      images,
      documents,
      videos,
      totalBytes,
    }
  }, [assets])

  const folders = React.useMemo(() => {
    const set = new Set<string>()
    for (const a of assets) {
      if (a.folder) set.add(a.folder)
    }
    return Array.from(set)
  }, [assets])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Media Library & CDN Assets
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Upload new corporate media, inspect live CDN assets, and permanently delete images, videos, and PDF documents from the Supabase bucket.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => loadAssets(true)}
            disabled={isLoading}
            className="text-xs"
          >
            <RefreshCw
              className={cn("me-1.5 size-3.5", isLoading && "animate-spin")}
            />
            Refresh
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="bg-primary text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {isUploading ? (
              <Loader2 className="me-1.5 size-3.5 animate-spin" />
            ) : (
              <UploadCloud className="me-1.5 size-3.5" />
            )}
            Upload Media
          </Button>
        </div>
      </div>

      {/* Metric Tiles Row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <Card className="border-border/80 bg-card/80 p-3 sm:p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FolderArchive className="size-4 text-primary" />
            <span className="text-xs font-semibold">Total Assets</span>
          </div>
          <p className="mt-2 text-xl font-bold text-foreground">
            {metrics.total}
          </p>
        </Card>

        <Card className="border-border/80 bg-card/80 p-3 sm:p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ImageIcon className="size-4 text-sky-500" />
            <span className="text-xs font-semibold">Images</span>
          </div>
          <p className="mt-2 text-xl font-bold text-foreground">
            {metrics.images}
          </p>
        </Card>

        <Card className="border-border/80 bg-card/80 p-3 sm:p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileText className="size-4 text-rose-500" />
            <span className="text-xs font-semibold">Documents (PDF)</span>
          </div>
          <p className="mt-2 text-xl font-bold text-foreground">
            {metrics.documents}
          </p>
        </Card>

        <Card className="border-border/80 bg-card/80 p-3 sm:p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Film className="size-4 text-amber-500" />
            <span className="text-xs font-semibold">Video Tours</span>
          </div>
          <p className="mt-2 text-xl font-bold text-foreground">
            {metrics.videos}
          </p>
        </Card>

        <Card className="col-span-2 border-border/80 bg-card/80 p-3 sm:col-span-1 sm:p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <HardDrive className="size-4 text-emerald-500" />
            <span className="text-xs font-semibold">Storage Used</span>
          </div>
          <p className="mt-2 text-xl font-bold text-foreground">
            {formatBytes(metrics.totalBytes)}
          </p>
        </Card>
      </div>

      {/* Quick Upload Dropzone */}
      <Card className="border-border/80 bg-card/80">
        <CardContent className="space-y-4 p-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <UploadCloud className="size-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground">
                Upload New Media File
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Target Folder:</span>
              <select
                value={uploadFolder}
                onChange={(e) => setUploadFolder(e.target.value)}
                className="h-8 rounded-md border border-border/80 bg-background px-2.5 text-xs text-foreground focus:border-primary focus:outline-hidden"
              >
                <option value="general">general (Miscellaneous)</option>
                <option value="documents">documents (Company Profiles & Portfolios)</option>
                <option value="properties">properties (Towers & Asset Renders)</option>
                <option value="stores">stores (Retail Tenant Logos)</option>
              </select>
            </div>
          </div>

          {/* Dynamic Hidden File Input based on Target Folder */}
          <input
            ref={fileInputRef}
            type="file"
            accept={
              uploadFolder === "documents"
                ? "application/pdf,.pdf,.doc,.docx"
                : uploadFolder === "stores"
                  ? "image/*,.jpg,.jpeg,.png,.webp,.svg,.avif"
                  : uploadFolder === "properties"
                    ? "image/*,video/*,.jpg,.jpeg,.png,.webp,.svg,.mp4,.webm,.mov"
                    : "image/*,video/*,application/pdf,.pdf"
            }
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0])
              }
            }}
          />

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200",
              dragActive
                ? "border-primary bg-primary/10 scale-[0.99]"
                : "border-border/80 hover:border-primary/50 hover:bg-muted/40"
            )}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="size-8 animate-spin text-primary" />
                <p className="text-xs font-bold text-foreground">
                  Uploading to Supabase CDN bucket...
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Storing file in &apos;tafawok-media/{uploadFolder}/&apos;
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <UploadCloud className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    Click to select file or drag & drop anywhere in this area
                  </p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {uploadFolder === "documents"
                      ? "PDF documents up to 50MB (No images or videos allowed in documents folder)"
                      : uploadFolder === "stores"
                        ? "Retail tenant logo images up to 20MB (No videos or PDFs allowed in stores folder)"
                        : uploadFolder === "properties"
                          ? "Architectural images up to 20MB or Video tours up to 100MB (No PDFs in properties folder)"
                          : "Images (up to 20MB), Videos (up to 100MB), or PDF (up to 50MB)"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-border/80 bg-card/80 p-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute inset-s-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by filename or path..."
            className="h-8 ps-8 text-xs"
          />
        </div>

        {/* Type and Folder Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Media Type Tabs */}
          <div className="flex rounded-lg border border-border/80 bg-background/80 p-0.5">
            <button
              type="button"
              onClick={() => setTypeFilter("all")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                typeFilter === "all"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              All ({assets.length})
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("image")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                typeFilter === "image"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Images ({metrics.images})
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("document")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                typeFilter === "document"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              PDFs ({metrics.documents})
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("video")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                typeFilter === "video"
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Videos ({metrics.videos})
            </button>
          </div>

          {/* Folder filter dropdown */}
          {folders.length > 0 && (
            <select
              value={folderFilter}
              onChange={(e) => setFolderFilter(e.target.value)}
              className="h-8 rounded-lg border border-border/80 bg-background px-2 text-xs text-foreground focus:border-primary focus:outline-hidden"
            >
              <option value="all">All Folders</option>
              {folders.map((f) => (
                <option key={f} value={f}>
                  folder: {f}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Asset Grid */}
      {isLoading ? (
        <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-xl border border-border/80 bg-card/40 text-center">
          <Loader2 className="size-7 animate-spin text-primary" />
          <p className="text-xs font-semibold text-foreground">
            Loading storage assets from Supabase bucket...
          </p>
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border/80 bg-card/30 p-8 text-center">
          <FolderArchive className="size-10 text-muted-foreground/60" />
          <p className="text-sm font-bold text-foreground">No media assets found</p>
          <p className="text-xs text-muted-foreground">
            {searchQuery || typeFilter !== "all" || folderFilter !== "all"
              ? "Try adjusting your search terms or filter selection."
              : "Upload your first corporate image or PDF document using the dropzone above."}
          </p>
          {(searchQuery || typeFilter !== "all" || folderFilter !== "all") && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("")
                setTypeFilter("all")
                setFolderFilter("all")
              }}
              className="mt-2 text-xs"
            >
              Reset Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredAssets.map((asset) => {
            const isProfileDoc = asset.path === "documents/tafawok-company-profile.pdf"
            const isVideo = asset.mediaType === "video"
            const isDoc = asset.mediaType === "document"

            return (
              <Card
                key={asset.path}
                className="group relative flex flex-col overflow-hidden border-border/80 bg-card transition-all duration-200 hover:border-primary/50 hover:shadow-md"
              >
                {/* Visual Preview */}
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                  {isVideo ? (
                    <div className="flex size-full items-center justify-center bg-black">
                      <Film className="size-8 text-amber-400/80" />
                    </div>
                  ) : isDoc ? (
                    <div className="flex size-full flex-col items-center justify-center gap-2 bg-neutral-900 p-4 text-center">
                      <div className="flex size-10 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
                        <FileText className="size-5" />
                      </div>
                      <span className="font-mono text-[10px] font-bold text-rose-400 uppercase">
                        PDF Document
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={asset.url}
                      alt={asset.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 300px"
                    />
                  )}

                  {/* Top Badges */}
                  <div className="absolute inset-s-2 top-2 z-10 flex flex-wrap items-center gap-1">
                    {isProfileDoc ? (
                      <Badge className="border-amber-400/40 bg-amber-500/90 text-[10px] font-bold text-black backdrop-blur-md">
                        ⭐ Active Profile
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-black/80 font-mono text-[10px] text-white/90 backdrop-blur-md"
                      >
                        {asset.folder}
                      </Badge>
                    )}
                  </div>

                  {/* Quick Action Overlay on Hover */}
                  <div className="absolute inset-e-2 top-2 z-10 flex items-center gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => setAssetToDelete(asset)}
                            className="size-7 p-0 shadow-md"
                            aria-label="Delete from bucket"
                          />
                        }
                      >
                        <Trash2 className="size-3.5" />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Permanently delete from bucket
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                {/* Card Details */}
                <CardContent className="flex flex-1 flex-col justify-between p-3.5">
                  <div className="space-y-1">
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <p className="truncate text-xs font-bold text-foreground" />
                        }
                      >
                        {asset.name}
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs text-xs">
                        {asset.name}
                      </TooltipContent>
                    </Tooltip>

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-mono">{formatBytes(asset.size)}</span>
                      <span>
                        {new Date(asset.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-3 flex items-center gap-1.5 border-t border-border/60 pt-2.5">
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyUrl(asset.url)}
                            className="h-7 flex-1 text-[11px]"
                          />
                        }
                      >
                        {copiedUrl === asset.url ? (
                          <>
                            <Check className="me-1 size-3 text-emerald-500" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="me-1 size-3 text-muted-foreground" />
                            Copy CDN URL
                          </>
                        )}
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        Copy public Supabase CDN link
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <a
                            href={asset.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex size-7 items-center justify-center rounded-md border border-border/80 bg-background text-muted-foreground hover:bg-secondary hover:text-foreground"
                            aria-label="Open asset in new tab"
                          />
                        }
                      >
                        {isDoc ? (
                          <Download className="size-3.5" />
                        ) : (
                          <ExternalLink className="size-3.5" />
                        )}
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        Open in new tab
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setAssetToDelete(asset)}
                            className="size-7 p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Delete asset"
                          />
                        }
                      >
                        <Trash2 className="size-3.5" />
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">
                        Delete from bucket
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Permanent Deletion Confirm Dialog */}
      <Dialog
        open={Boolean(assetToDelete)}
        onOpenChange={(open) => !open && setAssetToDelete(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="size-5" />
              <DialogTitle className="text-base font-bold text-foreground">
                Delete Asset from Storage Bucket?
              </DialogTitle>
            </div>
            <DialogDescription className="space-y-2 pt-2 text-xs leading-relaxed text-muted-foreground">
              <span>
                You are about to permanently delete{" "}
                <strong className="font-mono text-foreground">
                  {assetToDelete?.name}
                </strong>{" "}
                from the <code className="text-primary">tafawok-media</code> Supabase Storage bucket.
              </span>
              <span className="block text-destructive font-semibold">
                ⚠️ Warning: Any pages or cards currently linking to this CDN URL will lose access to this file immediately.
              </span>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isDeleting}
              onClick={() => setAssetToDelete(null)}
              className="text-xs"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={isDeleting}
              onClick={confirmDeleteAsset}
              className="text-xs font-semibold"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="me-1.5 size-3 animate-spin" />
                  Deleting from Bucket...
                </>
              ) : (
                <>
                  <Trash2 className="me-1.5 size-3" />
                  Permanently Delete File
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
