import { useState } from "react";
import { C, FEATURES, STATS } from "./shared/constants";
import { Btn, SectionHeading } from "./shared/components";

function FeatureCard({ feature, setSection }) {
  const [hovered, setHovered] = useState(false);

  const getTheme = () => {
    switch (feature.icon) {
      case "👨‍🍳":
        return {
          start: "#FFA742",
          end: "#E86F00",
          shadow: "rgba(232,111,0,0.22)",
        };
      case "🐉":
      case "🥖":
        return {
          start: "#60A5FA",
          end: "#2563EB",
          shadow: "rgba(37,99,235,0.22)",
        };
      case "🎉":
        return {
          start: "#34D399",
          end: "#059669",
          shadow: "rgba(5,150,105,0.22)",
        };
      case "🙏":
        return {
          start: "#A8A29E",
          end: "#57534E",
          shadow: "rgba(87,83,78,0.22)",
        };
      case "🧑":
        return {
          start: "#C084FC",
          end: "#7C3AED",
          shadow: "rgba(124,58,237,0.22)",
        };
      default:
        return {
          start: C.brand,
          end: C.brandDark,
          shadow: "rgba(232,135,26,0.22)",
        };
    }
  };

  const theme = getTheme();

  return (
    <article
      onClick={() => setSection(feature.section)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,1)" : C.surface,
        border: `1.5px solid ${hovered ? C.brand + "70" : "rgba(0,0,0,0.06)"}`,
        borderRadius: 20,
        padding: "32px 28px",
        cursor: "pointer",
        transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered
          ? "0 12px 36px rgba(232,135,26,0.12), 0 4px 12px rgba(0,0,0,0.02)"
          : "0 2px 8px rgba(0,0,0,0.03)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${theme.start} 0%, ${theme.end} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          color: "#fff",
          marginBottom: 20,
          boxShadow: `0 8px 20px ${theme.shadow}`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: hovered ? "scale(1.1) rotate(6deg)" : "none",
        }}
      >
        {feature.icon}
      </div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 19,
          fontWeight: 700,
          color: C.text,
          marginBottom: 10,
          transition: "color 0.2s",
        }}
      >
        {feature.title}
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: C.textMuted,
          lineHeight: 1.6,
        }}
      >
        {feature.desc}
      </p>
    </article>
  );
}

export default function HomePage({ setSection }) {
  return (
    <div>
      {/* Hero */}
      <section
        className="ya-glow"
        style={{
          background: `linear-gradient(150deg, ${C.brandPale} 0%, ${C.bg} 60%)`,
          padding: "90px 24px 78px",
          textAlign: "center",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: C.brand,
              textTransform: "uppercase",
              letterSpacing: "0.14em",
              marginBottom: 18,
            }}
          >
            Companion for Every Occasion
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(34px, 6vw, 54px)",
              fontWeight: 700,
              color: C.text,
              lineHeight: 1.18,
              marginBottom: 20,
            }}
          >
            Everything you need,
            <br />
            <span style={{ color: C.brand }}>right where you are.</span>
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17,
              color: C.textMuted,
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 540,
              margin: "0 auto 36px",
            }}
          >
            From a personal chef for tonight's dinner to compassionate support
            when it matters most — YourAlly is your hyperlocal companion for
            every moment of life.
          </p>
          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Btn
              variant="primary"
              onClick={() => setSection("recipes")}
              style={{
                padding: "13px 32px",
                fontSize: 16,
                borderRadius: 24,
                boxShadow: "0 10px 25px rgba(232,135,26,0.25)",
              }}
            >
              🥖 Explore Recipes (Live Demo)
            </Btn>
            <Btn
              variant="secondary"
              onClick={() => setSection("chef")}
              style={{ padding: "13px 32px", fontSize: 16, borderRadius: 24 }}
            >
              👨‍🍳 Find a Chef
            </Btn>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px" }}
      >
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <SectionHeading>What can YourAlly do for you?</SectionHeading>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: C.textMuted,
              fontSize: 16,
              marginTop: 8,
            }}
          >
            Five pillars of support, delivered to your door.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 20,
          }}
        >
          {FEATURES.map((f, i) => (
            <FeatureCard key={i} feature={f} setSection={setSection} />
          ))}
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{ background: C.brand, padding: "48px 24px" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 24,
            textAlign: "center",
          }}
        >
          {STATS.map((s, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 44,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.82)",
                  marginTop: 6,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
