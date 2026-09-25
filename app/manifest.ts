import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TAFAWOK Real Estate Investment & Contracting — شركة تفوق للاستثمار العقاري والمقاولات",
    short_name: "TAFAWOK CRE",
    description:
      "Enterprise platform for TAFAWOK CRE — Flagship commercial real estate developments, destination retail malls, and turnkey EPC contracting in Egypt.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0c0e",
    theme_color: "#c86a27",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/Tafawok_Logo_NoWord.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    lang: "ar",
    dir: "rtl",
  }
}
