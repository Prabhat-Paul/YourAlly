import { useState } from "react";
import { C, EVENT_MANAGERS, OCCASIONS } from "./shared/constants";
import { Badge, Btn, SectionHeading, Stars, ShowcaseBanner } from "./shared/components";

function EventCard({ manager }) {
  const [hovered, setHovered] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surface,
        border: `1.5px solid ${hovered ? C.brand : C.border}`,
        borderRadius: 16,
        padding: "24px",
        transition: "all 0.15s",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered
          ? "0 8px 28px rgba(232,135,26,0.12)"
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18,
          fontWeight: 600,
          color: C.text,
          marginBottom: 6,
        }}
      >
        {manager.name}
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: C.textMuted,
          marginBottom: 14,
        }}
      >
        📍 {manager.location}
      </p>

      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}
      >
        {manager.occasions.map((occ) => (
          <Badge key={occ} color={C.brand} bg={C.brandLight} small>
            {occ}
          </Badge>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <Stars rating={manager.rating} />
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: C.textMuted,
          }}
        >
          {manager.eventsCompleted}+ events
        </span>
      </div>

      {showContact ? (
        <div
          style={{
            background: C.successBg,
            borderRadius: 10,
            padding: "10px 16px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: C.success,
          }}
        >
          📞 {manager.contact}
        </div>
      ) : (
        <Btn
          variant="secondary"
          onClick={() => setShowContact(true)}
          style={{ width: "100%", fontSize: 14 }}
        >
          View Contact Details
        </Btn>
      )}
    </article>
  );
}

export default function EventsPage() {
  const [occasion, setOccasion] = useState("All");
  const filtered = EVENT_MANAGERS.filter(
    (e) => occasion === "All" || e.occasions.includes(occasion),
  );

  return (
    <div
      className="ya-appear"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 60px" }}
    >
      <ShowcaseBanner
        title="Product Thinking Insight: Phase 1 Discovery Directory MVP"
        description="This module represents a low-friction Phase 1 directory. By prioritizing supplier discovery and quick contact reveal over complex transactional booking, it minimizes upfront development costs while validating regional vendor engagement and category demand (e.g., Weddings, Pujas) before investing in full transactional infrastructure."
        highlights={["Phase 1 Directory MVP", "Demand & Engagement Testing", "Frictionless Supplier Discovery", "Strategic Roadmap Planning"]}
        themeColor={C.info}
      />

      <SectionHeading>Event Managers</SectionHeading>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          color: C.textMuted,
          marginTop: 8,
          marginBottom: 28,
        }}
      >
        Find trusted local planners for your special occasion.
      </p>

      <div
        style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}
      >
        {OCCASIONS.map((occ) => (
          <button
            key={occ}
            onClick={() => setOccasion(occ)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              padding: "7px 16px",
              borderRadius: 50,
              border: `1.5px solid ${occasion === occ ? C.brand : C.border}`,
              background: occasion === occ ? C.brand : C.surface,
              color: occasion === occ ? "#fff" : C.textMuted,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {occ}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {filtered.map((em) => (
          <EventCard key={em.id} manager={em} />
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
            No event managers match this occasion yet.
          </p>
        )}
      </div>
    </div>
  );
}
