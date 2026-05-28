import { useState } from "react";
import { C, LOYALTY_TIERS } from "./shared/constants";
import { getTier } from "./shared/utils";
import { Badge, SectionHeading, ShowcaseBanner } from "./shared/components";

export default function LoyaltyPage() {
  const [bookings, setBookings] = useState(1);
  const tier = getTier(bookings);
  const credits = Math.round(bookings * 100 * tier.multiplier);

  const discountLabel =
    tier.discount > 0
      ? `${tier.discount}% off`
      : tier.welcome > 0
        ? `₹${tier.welcome} welcome`
        : "—";

  return (
    <div
      className="ya-appear"
      style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 60px" }}
    >
      <SectionHeading>Loyalty Programme</SectionHeading>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: C.textMuted,
          marginTop: 8,
          marginBottom: 36,
        }}
      >
        Every booking brings you closer to exclusive rewards. See your benefits
        grow in real-time.
      </p>

      <ShowcaseBanner
        title="Product Thinking Insight: Gamified Retention & LTV Loops"
        description="This interactive simulator acts as a high-fidelity demonstration of customer lifetime value (LTV) gamification. By providing immediate visual feedback on tiered benefits and credit multipliers, the interface leverages behavioral psychology to drive repeat bookings, reduce acquisition churn, and transparently demonstrate the premium membership value proposition."
        highlights={["Gamification & Retention", "LTV Growth Loop", "Real-Time Value Transparency", "Behavioral Incentives"]}
        themeColor={C.brand}
      />

      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: "28px",
          marginBottom: 32,
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            color: C.text,
            marginBottom: 22,
          }}
        >
          Booking Simulator
        </h3>

        <label
          htmlFor="loyalty-slider"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: C.textMuted,
            display: "block",
            marginBottom: 12,
          }}
        >
          Simulate bookings (1 – 20)
        </label>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: C.textFaint,
            }}
          >
            1
          </span>
          <input
            id="loyalty-slider"
            type="range"
            min={1}
            max={20}
            value={bookings}
            onChange={(e) => setBookings(Number(e.target.value))}
            style={{
              flex: 1,
              accentColor: C.brand,
              cursor: "pointer",
              height: 4,
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: C.textFaint,
            }}
          >
            20
          </span>
        </div>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 52,
              fontWeight: 700,
              color: C.brand,
            }}
          >
            {bookings}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 16,
              color: C.textMuted,
              marginLeft: 8,
            }}
          >
            booking{bookings !== 1 ? "s" : ""}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: 16,
          }}
        >
          {[
            {
              label: "Current Tier",
              value: `${tier.icon ?? ""} ${tier.name}`.trim(),
            },
            { label: "Discount", value: discountLabel },
            { label: "Credits Earned", value: credits.toLocaleString() },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: C.bg,
                borderRadius: 12,
                padding: "18px 14px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  color: C.brand,
                  marginBottom: 6,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: C.textMuted,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          color: C.text,
          marginBottom: 20,
        }}
      >
        Membership Tiers
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {LOYALTY_TIERS.map((t) => {
          const isActive = tier.name === t.name;
          return (
            <div
              key={t.name}
              style={{
                background: isActive ? t.bg : C.surface,
                border: `2px solid ${isActive ? C.brand : C.border}`,
                borderRadius: 16,
                padding: "24px 20px",
                transition: "all 0.15s",
                transform: isActive ? "translateY(-3px)" : "none",
                boxShadow: isActive
                  ? "0 6px 20px rgba(232,135,26,0.18)"
                  : "none",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 10 }}>{t.icon}</div>
              <h4
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 18,
                  fontWeight: 700,
                  color: t.color,
                  marginBottom: 4,
                }}
              >
                {t.name}
              </h4>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: C.textMuted,
                  marginBottom: 14,
                }}
              >
                {t.max === Infinity
                  ? "15+ bookings"
                  : `${t.min}–${t.max} bookings`}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {t.welcome > 0 && (
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: C.text,
                    }}
                  >{`✓ ₹${t.welcome} welcome bonus`}</span>
                )}
                {t.discount > 0 && (
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: C.text,
                    }}
                  >{`✓ ${t.discount}% off all bookings`}</span>
                )}
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: C.text,
                  }}
                >
                  ✓ {t.multiplier}× credit multiplier
                </span>
                {t.bonus && (
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 13,
                      color: C.text,
                    }}
                  >
                    ✓ Exclusive bonus rewards
                  </span>
                )}
              </div>

              {isActive && (
                <div style={{ marginTop: 16 }}>
                  <Badge color={C.brand} bg={C.brandLight}>
                    Current Tier
                  </Badge>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
