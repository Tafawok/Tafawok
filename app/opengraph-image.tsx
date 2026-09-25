import { ImageResponse } from "next/og"

export const alt =
  "TAFAWOK Real Estate Investment & Contracting — Commercial Real Estate Developments in Egypt"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#08090a",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(200, 106, 39, 0.25) 0%, transparent 60%), radial-gradient(circle at 15% 85%, rgba(200, 106, 39, 0.15) 0%, transparent 50%)",
          padding: "56px 64px",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          border: "10px solid #17191d",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Geometric Bronze Icon */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #e07a2c, #9d4817)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 24px rgba(200, 106, 39, 0.4)",
              }}
            >
              <div
                style={{
                  width: "22px",
                  height: "22px",
                  border: "3px solid #ffffff",
                  transform: "rotate(45deg)",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 900,
                  letterSpacing: "3px",
                  color: "#ffffff",
                }}
              >
                TAFAWOK
              </span>
              <span
                style={{
                  fontSize: "12px",
                  letterSpacing: "2px",
                  color: "#e07a2c",
                  fontWeight: 700,
                }}
              >
                REAL ESTATE INVESTMENT & CONTRACTING
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(200, 106, 39, 0.15)",
              border: "1px solid rgba(200, 106, 39, 0.4)",
              color: "#e07a2c",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "1px",
            }}
          >
            25+ YEARS TRACK RECORD • 5 DECADES HERITAGE
          </div>
        </div>

        {/* Center Main Titles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            margin: "20px 0",
          }}
        >
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 900,
              lineHeight: 1.15,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-1px",
            }}
          >
            Commercial Real Estate Developments
            <br />
            <span style={{ color: "#e07a2c" }}>& Turnkey EPC Execution</span>
          </h1>

          <p
            style={{
              fontSize: "22px",
              color: "#9da3af",
              margin: 0,
              lineHeight: 1.45,
              maxWidth: "960px",
            }}
          >
            Developing prime corporate office parks, destination retail centers,
            wholesale trading hubs, and industrial assets in Egypt and the MENA
            region.
          </p>
        </div>

        {/* Bottom Bar: Flagship Developments */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
            paddingTop: "20px",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "14px",
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              🏢 Fagala Plaza • Nasr City
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "14px",
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              🛍️ Mall ChillOut • El Shorouk
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                fontSize: "14px",
                fontWeight: 600,
                color: "#e2e8f0",
              }}
            >
              🌟 October Festival Mall • 6th Oct
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#e07a2c",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            <span>tafawok.co</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
