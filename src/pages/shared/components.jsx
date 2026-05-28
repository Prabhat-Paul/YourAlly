import { useEffect, useState } from "react";

import AllyLogo from "../../assets/AllyLOGO.png";

import { C, NAV_ITEMS } from "./constants";

export function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === "success" ? C.successBg : C.infoBg;
  const accent = type === "success" ? C.success : C.info;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 24,
        zIndex: 9999,
        background: bg,
        border: `1px solid ${accent}30`,
        borderLeft: `4px solid ${accent}`,
        borderRadius: 12,
        padding: "14px 18px",
        maxWidth: 360,
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        animation: "toastIn 0.3s ease",
      }}
    >
      <span
        style={{ color: accent, fontWeight: 700, fontSize: 16, marginTop: 1 }}
      >
        ✓
      </span>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: C.text,
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        {message}
      </p>
      <button
        onClick={onClose}
        aria-label="Dismiss"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: C.textMuted,
          fontSize: 18,
          lineHeight: 1,
          padding: 0,
          marginLeft: 4,
        }}
      >
        ×
      </button>
    </div>
  );
}

export function ShowcaseBanner({ title, description, highlights = [], themeColor = C.brand }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${themeColor}0A 0%, ${themeColor}15 100%)`,
        border: `1.5px dashed ${themeColor}40`,
        borderRadius: 16,
        padding: "20px 24px",
        marginBottom: 28,
        position: "relative",
        boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
        animation: "fadeIn 0.3s ease",
      }}
    >
      <button
        onClick={() => setIsOpen(false)}
        aria-label="Dismiss banner"
        style={{
          position: "absolute",
          top: 16,
          right: 18,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: C.textMuted,
          fontSize: 12,
          fontWeight: 600,
          opacity: 0.6,
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = 1)}
        onMouseLeave={(e) => (e.target.style.opacity = 0.6)}
      >
        Dismiss ×
      </button>

      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <span style={{ fontSize: 24, lineHeight: 1 }}>✨</span>
        <div style={{ flex: 1, paddingRight: 48 }}>
          <h4
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 16,
              fontWeight: 700,
              color: C.text,
              marginBottom: 4,
            }}
          >
            {title || "Portfolio Showcase Concept"}
          </h4>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13.5,
              color: C.textMuted,
              lineHeight: 1.5,
              marginBottom: highlights.length > 0 ? 12 : 0,
            }}
          >
            {description}
          </p>

          {highlights.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {highlights.map((h, idx) => (
                <span
                  key={idx}
                  style={{
                    background: `${themeColor}1A`,
                    color: themeColor === "#6B6A68" || themeColor === "#4A4845" ? "#4A4845" : themeColor,
                    border: `1px solid ${themeColor}2A`,
                    borderRadius: 8,
                    padding: "4px 8px",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  ⚡ {h}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Badge({
  children,
  color = C.textMuted,
  bg = "#F3F4F6",
  small,
}) {
  return (
    <span
      style={{
        background: bg,
        color,
        borderRadius: 20,
        padding: small ? "2px 8px" : "4px 10px",
        fontSize: small ? 11 : 12,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: "nowrap",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}

export function Stars({ rating }) {
  return (
    <span>
      <span style={{ color: "#F59E0B", fontSize: 13 }}>
        {"★".repeat(Math.floor(rating))}
      </span>
      <span
        style={{
          color: C.textMuted,
          marginLeft: 4,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
        }}
      >
        {rating}
      </span>
    </span>
  );
}

export function SectionHeading({ children, style: extra }) {
  return (
    <h2
      style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 30,
        fontWeight: 700,
        color: C.text,
        ...extra,
      }}
    >
      {children}
    </h2>
  );
}

export function Btn({
  children,
  variant = "primary",
  onClick,
  disabled,
  style: extra = {},
  type = "button",
}) {
  const [hovered, setHovered] = useState(false);
  const active = hovered && !disabled;

  const base = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: 15,
    border: "none",
    borderRadius: 10,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.15s",
    padding: "10px 22px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  };

  const variants = {
    primary: {
      background: active ? C.brandDark : C.brand,
      color: "#fff",
      transform: active ? "translateY(-2px)" : "none",
      boxShadow: active ? "0 4px 16px rgba(232,135,26,0.35)" : "none",
      opacity: disabled ? 0.55 : 1,
    },
    secondary: {
      background: active ? C.brandLight : "#fff",
      color: C.brand,
      border: `1.5px solid ${C.brand}`,
      transform: active ? "translateY(-2px)" : "none",
      opacity: disabled ? 0.55 : 1,
    },
    ghost: {
      background: active ? C.bg : "transparent",
      color: C.textMuted,
      transform: active ? "translateY(-1px)" : "none",
    },
  };

  return (
    <button
      type={type}
      style={{ ...base, ...variants[variant], ...extra }}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function Nav({
  active,
  setSection,
  language,
  setLanguage,
  languages = [],
}) {
  // setLanguage is intentionally unused in this build.
  void setLanguage;
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 960);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        background: scrolled ? "rgba(250,250,248,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        boxShadow: scrolled ? "0 8px 30px rgba(0,0,0,0.04)" : "none",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        className={scrolled ? "ya-card ya-card-glass ya-appear" : "ya-appear"}
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: isMobile ? "0 14px" : "0 24px",
          display: "flex",
          alignItems: "center",
          height: isMobile ? 64 : 76,
          justifyContent: "space-between",
          gap: isMobile ? 8 : 12,
        }}
      >
        <button
          onClick={() => setSection("home")}
          aria-label="YourAlly home"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px 0",
            flexShrink: 0,
            marginRight: isMobile ? 0 : 16,
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <span aria-hidden="true" style={{ display: "flex", marginRight: -8 }}>
              <img
                src={AllyLogo}
                alt="Ally logo"
                style={{
                  width: isMobile ? 42 : 52,
                  height: isMobile ? 34 : 42,
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </span>

            <span
              style={{
                display: "inline-flex",
                flexDirection: "column",
                lineHeight: 1.05,
                alignItems: "flex-start",
                marginLeft: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? 18 : 21,
                  fontWeight: 700,
                  color: C.text,
                }}
              >
                Your<span style={{ color: C.brand }}>Ally</span>
              </span>
              {!isMobile && (
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.textMuted,
                    marginTop: 2,
                    letterSpacing: "0.01em",
                    whiteSpace: "nowrap",
                  }}
                >
                  Companion for Every Occasion
                </span>
              )}
            </span>
          </span>
        </button>

        {!isMobile ? (
          <>
            <div
              style={{
                display: "flex",
                gap: 6,
                flex: 1,
                justifyContent: "center",
                minWidth: 0,
                padding: "4px 0",
              }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                const isHovered = hoveredItem === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSection(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{
                      background: isActive
                        ? `${C.brand}12`
                        : isHovered
                          ? "rgba(0,0,0,0.03)"
                          : "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13.5,
                      fontWeight: 600,
                      color: isActive ? C.brand : isHovered ? C.text : C.textMuted,
                      padding: "8px 16px",
                      borderRadius: 20,
                      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      whiteSpace: "nowrap",
                      transform: isHovered ? "translateY(-1px)" : "none",
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginLeft: 14,
                flexShrink: 0,
              }}
            >
              {/* Premium styled select dropdown */}
              <select
                aria-label="Select language"
                value={language}
                onChange={() => {}}
                disabled
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: C.textMuted,
                  background: "rgba(255,255,255,0.8)",
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 10,
                  padding: "7px 12px",
                  outline: "none",
                  cursor: "not-allowed",
                  maxWidth: 160,
                  minWidth: 100,
                  flexShrink: 0,
                  opacity: 0.7,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                {(languages || []).map((l) => (
                  <option key={l.code} value={l.code}>
                    🌐 {l.label}
                  </option>
                ))}
              </select>

              <Btn
                variant="primary"
                style={{ padding: "8px 20px", fontSize: 13.5, borderRadius: 20 }}
                onClick={() => setSection?.("sign-in")}
              >
                Sign In
              </Btn>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: C.text,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Sliding Drawer */}
      {isMobile && mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
              animation: "fadeIn 0.2s ease",
            }}
          />
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(280px, 80vw)",
              zIndex: 9999,
              background: "rgba(250,250,248,0.98)",
              backdropFilter: "blur(20px)",
              boxShadow: "-10px 0 40px rgba(0,0,0,0.12)",
              padding: "76px 20px 40px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              animation: "slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 6,
                position: "absolute",
                top: 20,
                right: 20,
                color: C.text,
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12 }}>
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSection(item.id);
                      setMobileMenuOpen(false);
                    }}
                    style={{
                      background: isActive ? `${C.brand}12` : "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15.5,
                      fontWeight: 700,
                      color: isActive ? C.brand : C.text,
                      padding: "12px 18px",
                      borderRadius: 12,
                      textAlign: "left",
                      width: "100%",
                      transition: "all 0.15s",
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ height: 1, background: C.border }} />

              <select
                aria-label="Select language"
                value={language}
                onChange={() => {}}
                disabled
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.textMuted,
                  background: "rgba(255,255,255,0.8)",
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 10,
                  padding: "10px 14px",
                  outline: "none",
                  cursor: "not-allowed",
                  width: "100%",
                  opacity: 0.7,
                }}
              >
                {(languages || []).map((l) => (
                  <option key={l.code} value={l.code}>
                    🌐 {l.label}
                  </option>
                ))}
              </select>

              <Btn
                variant="primary"
                style={{ padding: "12px 20px", fontSize: 14, borderRadius: 12, width: "100%" }}
                onClick={() => {
                  setSection?.("sign-in");
                  setMobileMenuOpen(false);
                }}
              >
                Sign In
              </Btn>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export function Footer({ activeSection }) {
  const isFuneral = activeSection === "funeral";
  const brandColor = isFuneral ? "#8A8784" : C.brand;

  return (
    <footer
      style={{
        background: "#121211",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 24px",
        textAlign: "center",
        marginTop: "auto",
        width: "100%",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 6,
            letterSpacing: "0.01em",
          }}
        >
          Your<span style={{ color: brandColor, transition: "color 0.3s" }}>Ally</span>
        </div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "rgba(255,255,255,0.45)",
            marginBottom: 20,
            letterSpacing: "0.02em",
          }}
        >
          Companion for Every Occasion
        </p>

        <div
          style={{
            width: "100%",
            height: 1,
            background: "rgba(255,255,255,0.08)",
            margin: "0 auto 20px",
          }}
        />

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12.5,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6,
            maxWidth: 600,
            margin: "0 auto 12px",
          }}
        >
          🔒 <strong>Proprietary Product Concept &amp; PM Portfolio Showcase</strong>
          <br />
          This interactive prototype is conceptualized and designed by{" "}
          <a
            href="https://www.linkedin.com/in/prabhat-paul-8b7169372"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#fff",
              textDecoration: "none",
              borderBottom: `1px dashed ${brandColor}`,
              paddingBottom: 1,
              transition: "all 0.2s ease",
              fontWeight: 700,
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = brandColor;
              e.target.style.borderBottomStyle = "solid";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#fff";
              e.target.style.borderBottomStyle = "dashed";
            }}
          >
            Prabhat Paul
          </a>.
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11.5,
            color: "rgba(255,255,255,0.35)",
            lineHeight: 1.5,
          }}
        >
          Engineered as a high-fidelity Product Case Study demonstrating core Product Manager (PM) competencies: Hyperlocal MVP Scoping, Empathy-Driven Crisis UX (Funeral support), and Growth-Hacking Gamification (Loyalty Simulator). Designed for university recruitment and placement evaluation. Unauthorized cloning or replication of these unique feature architectures is prohibited.
          <br />
          <span style={{ display: "inline-block", marginTop: 6 }}>
            © {new Date().getFullYear()}{" "}
            <a
              href="https://www.linkedin.com/in/prabhat-paul-8b7169372"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "rgba(255,255,255,0.45)",
                textDecoration: "none",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = brandColor)}
              onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.45)")}
            >
              Prabhat Paul
            </a>
            . All rights reserved.
          </span>
        </p>
      </div>
    </footer>
  );
}
