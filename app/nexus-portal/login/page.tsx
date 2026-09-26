"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import {
  Shield,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ExternalLink,
} from "lucide-react"
import { Logo } from "@/components/layout/Logo"
import { LanguageToggle } from "@/components/layout/LanguageToggle"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  nexusLoginSchema,
  type NexusLoginFormData,
} from "@/lib/validations/cre-schemas"

export default function NexusLoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NexusLoginFormData>({
    resolver: zodResolver(nexusLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: NexusLoginFormData) => {
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email.trim(),
        password: data.password,
      })

      if (error) {
        toast.error(error.message || "Failed to authenticate.")
        return
      }

      if (authData.user) {
        toast.success("Welcome back, Super Admin!")
        router.refresh()
        router.push("/nexus-portal")
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred."
      toast.error(message)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      {/* Top Header Utility Bar */}
      <header className="absolute inset-x-4 top-4 z-20 flex items-center justify-between sm:inset-x-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground shadow-xs backdrop-blur-md transition-all hover:border-primary/40 hover:bg-muted"
        >
          <span>Live Website</span>
          <ExternalLink className="size-3 text-muted-foreground" />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* Architectural Background Grid & Subtle Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-s-1/2 top-1/3 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Obsidian Glass Card */}
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/90 p-8 shadow-2xl backdrop-blur-xl transition-all">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
              <Shield className="size-3.5" />
              <span>Nexus Portal</span>
            </div>

            <div className="mt-4 flex justify-center">
              <Logo />
            </div>

            <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Super Admin Access
            </h1>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              Authenticate to manage live commercial assets, retail stores,
              metrics, and content.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-medium text-foreground"
              >
                Administrator Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                  placeholder="admin@tafawok.co"
                  className="border-border/80 bg-background/50 ps-10 text-sm focus:bg-background"
                />
              </div>
              {errors.email && (
                <p className="text-[11px] text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs font-medium text-foreground"
                >
                  Security Passphrase
                </Label>
                <span className="text-[11px] text-muted-foreground">
                  Encrypted Token
                </span>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute inset-s-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password")}
                  placeholder="••••••••••••"
                  className="border-border/80 bg-background/50 ps-10 pe-10 text-sm focus:bg-background"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="me-2 size-4 animate-spin" />
                  Verifying Credentials...
                </>
              ) : (
                <>
                  Enter Nexus Portal
                  <ArrowRight className="ms-2 size-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 border-t border-border/60 pt-4 text-center">
            <p className="text-[11px] text-muted-foreground">
              Encrypted enterprise endpoint. Unauthorized access attempts are
              monitored and recorded.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
