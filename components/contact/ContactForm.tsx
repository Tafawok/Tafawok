"use client"

import React, { useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PROPERTIES, OWNER_DETAILS } from "@/content/cre-data"
import { CheckCircle2, AlertCircle, Loader2, Send, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  contactFormSchema,
  type ContactFormData,
} from "@/lib/validations/cre-schemas"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ContactFormProps {
  initialProperty?: string
  className?: string
}

export function ContactForm({
  initialProperty = "",
  className = "",
}: ContactFormProps) {
  const { t, locale } = useLocaleStore()

  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const cleanOwnerPhone = OWNER_DETAILS.phone.replace(/[^+\d]/g, "")

  const inquiryTypes = [
    { id: "leasing", label: t("contactForm.inquiryTypes.leasing") },
    { id: "investment", label: t("contactForm.inquiryTypes.investment") },
    { id: "turnkey", label: t("contactForm.inquiryTypes.turnkey") },
    { id: "general", label: t("contactForm.inquiryTypes.general") },
  ] as const

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      property: initialProperty || "all",
      inquiryType: "leasing",
      message: "",
    },
  })

  const currentInquiryType = useWatch({
    control,
    name: "inquiryType",
    defaultValue: "leasing",
  })

  const currentProperty = useWatch({
    control,
    name: "property",
    defaultValue: initialProperty || "all",
  })

  const onSubmit = async (data: ContactFormData) => {
    setErrorMessage(null)

    // Resolve property label for email
    let propertyLabel = t("contactForm.anyProperty")
    if (data.property !== "all") {
      const matched = PROPERTIES.find((p) => p.slug === data.property)
      if (matched) {
        propertyLabel = `${matched.name[locale]} (${matched.name.en})`
      }
    }

    const matchedType = inquiryTypes.find((it) => it.id === data.inquiryType)
    const typeLabel = matchedType ? matchedType.label : data.inquiryType

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          property: propertyLabel,
          inquiryType: typeLabel,
          message: data.message,
        }),
      })

      const resData = await res.json()

      if (!res.ok || !resData.success) {
        setErrorMessage(resData.message || t("contactForm.errorMessage"))
      } else {
        setSuccess(true)
        reset()
      }
    } catch {
      setErrorMessage(t("contactForm.errorMessage"))
    }
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-card/80 p-6 shadow-xl backdrop-blur-xl transition-all sm:p-8",
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-border/60 pb-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-widest text-primary uppercase">
            {t("contactForm.badge")}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
            {t("contactForm.sla")}
          </span>
        </div>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {t("contactForm.title")}
        </h2>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          {t("contactForm.subtitle")}
        </p>
      </div>

      {success ? (
        <div className="py-12 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 shadow-xs">
            <CheckCircle2 className="size-7" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-foreground">
            {t("contactForm.successTitle")}
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-xs text-muted-foreground sm:text-sm">
            {t("contactForm.successMessage")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setSuccess(false)
                reset()
              }}
              className="cursor-target inline-flex items-center justify-center rounded-xl border border-border/80 bg-muted/60 px-5 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-muted"
            >
              <span>{t("contactForm.sendAnother")}</span>
            </button>

            <a
              href={`tel:${cleanOwnerPhone}`}
              className="cursor-target inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              <Phone className="size-3.5 rtl:-scale-x-100" />
              <span>{t("contactPage.callDirect")}</span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {/* Classification Selector */}
          <div>
            <label className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {t("contactForm.inquiryTypeLabel")}
            </label>
            <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {inquiryTypes.map((type) => (
                <button
                  type="button"
                  key={type.id}
                  onClick={() =>
                    setValue("inquiryType", type.id, { shouldValidate: true })
                  }
                  className={cn(
                    "cursor-target flex items-center justify-between rounded-xl border px-4 py-3 text-start text-xs font-medium transition-all",
                    currentInquiryType === type.id
                      ? "border-primary/80 bg-primary/10 font-bold text-foreground shadow-xs"
                      : "border-border/70 bg-background/60 text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  <span>{type.label}</span>
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      currentInquiryType === type.id
                        ? "bg-primary"
                        : "bg-border"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name & Corporate Email Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-foreground"
              >
                {t("contactForm.nameLabel")}{" "}
                <span className="text-primary">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name")}
                placeholder={t("contactForm.namePlaceholder")}
                className={cn(
                  "mt-2 w-full rounded-xl border bg-background px-4 py-2.5 text-xs text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none sm:text-sm",
                  errors.name ? "border-destructive" : "border-border/80"
                )}
              />
              {errors.name && (
                <p className="mt-1.5 text-[11px] font-medium text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Corporate Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-foreground"
              >
                {t("contactForm.emailLabel")}{" "}
                <span className="text-primary">*</span>
              </label>
              <input
                id="email"
                type="email"
                dir="ltr"
                {...register("email")}
                placeholder={t("contactForm.emailPlaceholder")}
                className={cn(
                  "mt-2 w-full rounded-xl border bg-background px-4 py-2.5 text-xs text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none sm:text-sm",
                  errors.email ? "border-destructive" : "border-border/80"
                )}
              />
              {errors.email && (
                <p className="mt-1.5 text-[11px] font-medium text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone & Property Selection */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold text-foreground"
              >
                {t("contactForm.phoneLabel")}{" "}
                <span className="text-primary">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                dir="ltr"
                {...register("phone")}
                placeholder={t("contactForm.phonePlaceholder")}
                className={cn(
                  "mt-2 w-full rounded-xl border bg-background px-4 py-2.5 text-xs text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none sm:text-sm",
                  errors.phone ? "border-destructive" : "border-border/80"
                )}
              />
              {errors.phone && (
                <p className="mt-1.5 text-[11px] font-medium text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Target Property */}
            <div>
              <label
                htmlFor="property"
                className="block text-xs font-semibold text-foreground"
              >
                {t("contactForm.propertyLabel")}
              </label>
              <Select
                value={currentProperty}
                onValueChange={(val) => {
                  if (val) {
                    setValue("property", val, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                }}
              >
                <SelectTrigger
                  id="property"
                  className="mt-2 h-11 w-full rounded-xl border-border/80 bg-background px-4 text-xs text-foreground sm:text-sm"
                >
                  <SelectValue placeholder={t("contactForm.anyProperty")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">{t("contactForm.anyProperty")}</SelectItem>
                    {PROPERTIES.map((prop) => (
                      <SelectItem key={prop.slug} value={prop.slug}>
                        {prop.name[locale]} ({prop.name.en})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Requirements & Specifications */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold text-foreground"
            >
              {t("contactForm.messageLabel")}{" "}
              <span className="text-primary">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message")}
              placeholder={t("contactForm.messagePlaceholder")}
              className={cn(
                "mt-2 w-full rounded-xl border bg-background px-4 py-3 text-xs leading-relaxed text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none sm:text-sm",
                errors.message ? "border-destructive" : "border-border/80"
              )}
            />
            {errors.message && (
              <p className="mt-1.5 text-[11px] font-medium text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="cursor-target group relative flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold tracking-wider text-primary-foreground uppercase shadow-sm transition-all hover:bg-primary/90 active:scale-[0.99] disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>{t("contactForm.sending")}</span>
              </>
            ) : (
              <>
                <span>{t("contactForm.submitButton")}</span>
                <Send className="size-3.5 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
