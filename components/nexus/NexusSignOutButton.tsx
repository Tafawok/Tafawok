"use client"

import * as React from "react"
import { LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOutAction } from "@/lib/content/actions"
import { toast } from "sonner"

export function NexusSignOutButton() {
  const [loading, setLoading] = React.useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOutAction()
    } catch {
      toast.error("Failed to sign out.")
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSignOut}
      disabled={loading}
      className="gap-1.5 border-border/80 text-xs font-medium hover:border-destructive/40 hover:bg-destructive/10 hover:text-destructive"
    >
      {loading ? (
        <Loader2 className="size-3.5 animate-spin" />
      ) : (
        <LogOut className="size-3.5" />
      )}
      <span className="hidden sm:inline">Sign Out</span>
    </Button>
  )
}
