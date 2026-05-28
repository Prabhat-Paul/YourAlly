import { useEffect, useRef, useState } from "react";
import { CHEFS, CUISINE_OPTIONS, C } from "./shared/constants";
import { Badge, Btn, SectionHeading, Stars, Toast, ShowcaseBanner } from "./shared/components";

function ChefCard({ chef, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const modeMap = {
    virtual: { label: "Virtual", color: C.info, bg: C.infoBg },
    physical: { label: "Physical", color: C.success, bg: C.successBg },
    both: { label: "Physical & Virtual", color: C.brand, bg: C.brandLight },
  };
  const mode = modeMap[chef.mode];

  return (
    <article
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surface,
        border: `1.5px solid ${hovered ? C.brand : C.border}`,
        borderRadius: 16,
        padding: "22px",
        cursor: "pointer",
        transition: "all 0.15s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered
          ? "0 8px 28px rgba(0,0,0,0.09)"
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: chef.avatarBg,
            color: chef.avatarColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 17,
            flexShrink: 0,
          }}
        >
          {chef.initials}
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                fontSize: 17,
                color: C.text,
              }}
            >
              {chef.name}
            </span>
            {chef.verified && (
              <span style={{ color: C.info, fontSize: 13 }} title="Verified">
                ✓
              </span>
            )}
          </div>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: C.textMuted,
              marginTop: 2,
            }}
          >
            {chef.experience} experience
          </p>
          {chef.empowered && (
            <div style={{ marginTop: 5 }}>
              <Badge color="#7C3AED" bg="#F5F0FF" small>
                Empowered
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "14px 0" }}
      >
        {chef.cuisines.map((c) => (
          <Badge key={c} color={C.brandDark} bg={C.brandLight} small>
            {c}
          </Badge>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <Stars rating={chef.rating} />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 16,
            color: C.text,
          }}
        >
          ₹{chef.price}/hr
        </span>
      </div>

      <Badge color={mode.color} bg={mode.bg}>
        {mode.label}
      </Badge>
    </article>
  );
}

function BookingDrawer({ chef, onClose, onConfirm }) {
  const [booking, setBooking] = useState({
    date: "",
    time: "",
    address: "",
    sessionMode: "physical",
  });
  const dateRef = useRef(null);

  useEffect(() => {
    if (dateRef.current) dateRef.current.focus();
  }, []);

  const isVirtual =
    chef.mode === "virtual" ||
    (chef.mode === "both" && booking.sessionMode === "virtual");

  const canConfirm =
    booking.date && booking.time && (isVirtual || booking.address.trim());

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 998,
          background: "rgba(0,0,0,0.32)",
        }}
      />
      <div
        role="dialog"
        aria-label={`Book ${chef.name}`}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: C.surface,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          boxShadow: "0 -4px 32px rgba(0,0,0,0.12)",
          animation: "slideUp 0.25s ease",
        }}
      >
        <div
          style={{ maxWidth: 560, margin: "0 auto", padding: "28px 28px 40px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 22,
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 21,
                  color: C.text,
                }}
              >
                Book {chef.name}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: C.textMuted,
                  marginTop: 2,
                }}
              >
                ₹{chef.price}/hr
              </p>
            </div>
            <button
              onClick={onClose}
              aria-label="Close booking"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 24,
                color: C.textMuted,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {chef.mode === "both" && (
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.textMuted,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Session Type
              </label>
              <div style={{ display: "flex", gap: 8 }}>
                {["physical", "virtual"].map((m) => (
                  <button
                    key={m}
                    onClick={() =>
                      setBooking((b) => ({ ...b, sessionMode: m }))
                    }
                    style={{
                      flex: 1,
                      padding: "9px 0",
                      borderRadius: 10,
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 14,
                      border: `1.5px solid ${booking.sessionMode === m ? C.brand : C.border}`,
                      background:
                        booking.sessionMode === m ? C.brandLight : C.surface,
                      color: booking.sessionMode === m ? C.brand : C.textMuted,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      textTransform: "capitalize",
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 14,
            }}
          >
            <div>
              <label
                htmlFor="booking-date"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.textMuted,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Date
              </label>
              <input
                id="booking-date"
                ref={dateRef}
                type="date"
                value={booking.date}
                onChange={(e) =>
                  setBooking((b) => ({ ...b, date: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 10,
                  background: C.surface,
                  color: C.text,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
              />
            </div>
            <div>
              <label
                htmlFor="booking-time"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.textMuted,
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Time
              </label>
              <input
                id="booking-time"
                type="time"
                value={booking.time}
                onChange={(e) =>
                  setBooking((b) => ({ ...b, time: e.target.value }))
                }
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  border: `1.5px solid ${C.border}`,
                  borderRadius: 10,
                  background: C.surface,
                  color: C.text,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 22 }}>
            <label
              htmlFor="booking-address"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: C.textMuted,
                display: "block",
                marginBottom: 6,
              }}
            >
              Address
              {isVirtual && (
                <span
                  style={{ fontWeight: 400, color: C.textFaint, marginLeft: 6 }}
                >
                  (not required for virtual)
                </span>
              )}
            </label>
            <input
              id="booking-address"
              type="text"
              placeholder={
                isVirtual
                  ? "Not required for virtual booking"
                  : "Enter your full address"
              }
              value={booking.address}
              onChange={(e) =>
                setBooking((b) => ({ ...b, address: e.target.value }))
              }
              disabled={isVirtual}
              style={{
                width: "100%",
                padding: "10px 14px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                border: `1.5px solid ${C.border}`,
                borderRadius: 10,
                background: C.surface,
                color: C.text,
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.15s",
                opacity: isVirtual ? 0.45 : 1,
                cursor: isVirtual ? "not-allowed" : "text",
              }}
            />
          </div>

          <Btn
            variant="primary"
            onClick={() => onConfirm(isVirtual)}
            disabled={!canConfirm}
            style={{ width: "100%", padding: "14px 24px", fontSize: 16 }}
          >
            Confirm Booking · ₹{chef.price}
          </Btn>
        </div>
      </div>
    </>
  );
}

export default function ChefPage() {
  const [modeFilter, setModeFilter] = useState("All");
  const [cuisineFilter, setCuisineFilter] = useState("All Cuisines");
  const [selectedChef, setSelectedChef] = useState(null);
  const [toast, setToast] = useState(null);

  const filtered = CHEFS.filter((c) => {
    const modeMatch =
      modeFilter === "All" ||
      c.mode === modeFilter.toLowerCase() ||
      c.mode === "both";
    const cuisineMatch =
      cuisineFilter === "All Cuisines" || c.cuisines.includes(cuisineFilter);
    return modeMatch && cuisineMatch;
  });

  const handleConfirm = (isVirtual) => {
    const msg = isVirtual
      ? "Booking confirmed! Chef will send video link within 15 min."
      : "Booking confirmed! Chef will visit at your requested time.";
    setToast(msg);
    setSelectedChef(null);
  };

  return (
    <div
      style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}
    >
      <SectionHeading>Find a Chef</SectionHeading>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: C.textMuted,
          marginTop: 8,
          marginBottom: 28,
        }}
      >
        Book a verified local chef for your home or a virtual cooking session.
      </p>

      <ShowcaseBanner
        title="Product Thinking Insight: Two-Sided Marketplace MVP"
        description="This interface validates a two-sided hyperlocal chef marketplace hypothesis. Scoped as an MVP to test domestic culinary services demand, it showcases product creation skills by balancing scalability (Virtual Sessions at low price) with high-touch offerings (Physical visits). Emphasizes social impact by spotlighting certified local women home-chefs to drive organic platform trust."
        highlights={["Two-Sided Marketplace MVP", "Physical vs. Virtual Scoping", "Empowerment-Led Trust", "High-Fidelity Transaction UI"]}
        themeColor={C.brand}
      />

      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 28,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {["All", "Physical", "Virtual"].map((m) => (
          <button
            key={m}
            onClick={() => setModeFilter(m)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              padding: "8px 18px",
              borderRadius: 50,
              border: `1.5px solid ${modeFilter === m ? C.brand : C.border}`,
              background: modeFilter === m ? C.brand : C.surface,
              color: modeFilter === m ? "#fff" : C.textMuted,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {m}
          </button>
        ))}
        <select
          value={cuisineFilter}
          onChange={(e) => setCuisineFilter(e.target.value)}
          aria-label="Filter by cuisine"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            padding: "8px 14px",
            border: `1.5px solid ${C.border}`,
            borderRadius: 10,
            background: C.surface,
            color: C.text,
            cursor: "pointer",
          }}
        >
          {CUISINE_OPTIONS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {filtered.map((chef) => (
          <ChefCard
            key={chef.id}
            chef={chef}
            onSelect={() => setSelectedChef(chef)}
          />
        ))}

        {filtered.length === 0 && (
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: C.textMuted,
              gridColumn: "1/-1",
              padding: "40px 0",
            }}
          >
            No chefs match this filter. Try a different combination.
          </p>
        )}
      </div>

      {selectedChef && (
        <BookingDrawer
          chef={selectedChef}
          onClose={() => setSelectedChef(null)}
          onConfirm={handleConfirm}
        />
      )}

      {toast && (
        <Toast message={toast} type="success" onClose={() => setToast(null)} />
      )}
    </div>
  );
}
