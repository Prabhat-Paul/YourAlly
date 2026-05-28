import { useState } from "react";
import { FC } from "./shared/constants";
import { generateCaseId } from "./shared/utils";
import { ShowcaseBanner, Icon } from "./shared/components";

function FuneralStep1({ data, onChange, onNext }) {
  const canNext =
    data.name.trim() && data.contact.trim() && data.location.trim();
  const fields = [
    { label: "Your Name", key: "name", placeholder: "Full name", type: "text" },
    {
      label: "Contact Number",
      key: "contact",
      placeholder: "+91 XXXXX XXXXX",
      type: "tel",
    },
    {
      label: "Location",
      key: "location",
      placeholder: "City or area",
      type: "text",
    },
  ];

  return (
    <div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 20,
          fontWeight: 600,
          color: FC.text,
          marginBottom: 6,
        }}
      >
        Your Details
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: FC.muted,
          marginBottom: 24,
          lineHeight: 1.6,
        }}
      >
        Please share your contact information so we can reach you promptly.
      </p>
      {fields.map((f) => (
        <div key={f.key} style={{ marginBottom: 16 }}>
          <label
            htmlFor={`funeral-${f.key}`}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: FC.muted,
              display: "block",
              marginBottom: 6,
            }}
          >
            {f.label}
          </label>
          <input
            id={`funeral-${f.key}`}
            type={f.type}
            placeholder={f.placeholder}
            value={data[f.key]}
            onChange={(e) => onChange({ [f.key]: e.target.value })}
            style={{
              width: "100%",
              padding: "10px 14px",
              boxSizing: "border-box",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              border: `1px solid ${FC.border}`,
              borderRadius: 10,
              background: FC.bg,
              color: FC.text,
              outline: "none",
            }}
          />
        </div>
      ))}
      <button
        onClick={onNext}
        disabled={!canNext}
        style={{
          width: "100%",
          padding: "12px 20px",
          marginTop: 8,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: 15,
          background: canNext ? FC.accent : FC.step,
          color: canNext ? "#fff" : FC.muted,
          border: "none",
          borderRadius: 10,
          cursor: canNext ? "pointer" : "not-allowed",
          transition: "all 0.15s",
        }}
      >
        Continue →
      </button>
    </div>
  );
}

function FuneralStep2({ data, onChange, onBack, onNext }) {
  const traditions = [
    "Hindu",
    "Muslim",
    "Christian",
    "Sikh",
    "Buddhist",
    "Other",
  ];

  const needsByTradition = {
    Hindu: [
      "Last rites support",
      "Puja/ritual coordination",
      "Pandit/priests assistance",
      "Cremation/burial logistics",
      "Vegetarian meal arrangements",
      "Family accommodation support",
      "Flowers/prasad items",
      "Clothing & essentials",
    ],
    Muslim: [
      "Janazah support",
      "Imam assistance",
      "Cemetery/burial coordination",
      "Washing/kafan arrangements",
      "Prayer room guidance",
      "Halal food support",
      "Family transport help",
      "Documentation help",
      "Family accommodation support",
    ],
    Christian: [
      "Prayer/ceremony assistance",
      "Pastor/chaplain coordination",
      "Church/chapel booking help",
      "Cemetery/burial logistics",
      "Floral arrangements",
      "Memorial service support",
      "Meal planning support",
      "Family accommodation support",
      "Transportation help",
    ],
    Sikh: [
      "Religious ceremony support",
      "Gurdwara coordination",
      "Granthi assistance",
      "Langar/meal arrangements",
      "Cremation/burial logistics",
      "Sikh essentials & clothing",
      "Flowers/karah parshad",
      "Family transport help",
      "Family accommodation support",
    ],
    Buddhist: [
      "Temple/ritual support",
      "Monk/bodhisattva coordination",
      "Prayer/chanting guidance",
      "Cremation/burial logistics",
      "Offerings & incense",
      "Meal/vegetarian support",
      "Family accommodation support",
      "Translation/cultural help",
      "Transportation help",
    ],
    Other: [
      "General funeral coordination",
      "Religious leader assistance",
      "Cremation/burial logistics",
      "Family accommodation support",
      "Meal arrangements",
      "Transportation help",
      "Documentation help",
      "Floral/essential items",
      "Other non-listed support",
    ],
  };

  const selectedNeeds = Array.isArray(data.needsSelections)
    ? data.needsSelections
    : [];

  const traditionNeeds = data.tradition
    ? needsByTradition[data.tradition] || []
    : [];

  const canNext = !!data.tradition;

  const btnBase = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: 15,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.15s",
    padding: "12px 20px",
  };

  return (
    <div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 20,
          fontWeight: 600,
          color: FC.text,
          marginBottom: 6,
        }}
      >
        Your Needs
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: FC.muted,
          marginBottom: 24,
          lineHeight: 1.6,
        }}
      >
        Help us understand how we can support you best.
      </p>

      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="funeral-tradition"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: FC.muted,
            display: "block",
            marginBottom: 6,
          }}
        >
          Religious Tradition
        </label>
        <select
          id="funeral-tradition"
          value={data.tradition}
          onChange={(e) => onChange({ tradition: e.target.value })}
          style={{
            width: "100%",
            padding: "10px 14px",
            boxSizing: "border-box",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            border: `1px solid ${FC.border}`,
            borderRadius: 10,
            background: FC.bg,
            color: FC.text,
            outline: "none",
          }}
        >
          <option value="">Select tradition…</option>
          {traditions.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 24 }}>
        <label
          htmlFor="funeral-needs"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: FC.muted,
            display: "block",
            marginBottom: 6,
          }}
        >
          Immediate Needs (tick what you need){" "}
          <span style={{ fontWeight: 400, color: FC.step }}>(optional)</span>
        </label>

        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          <button
            type="button"
            onClick={() => {
              const all = traditionNeeds.slice();
              onChange({ needsSelections: all });
            }}
            disabled={!data.tradition || traditionNeeds.length === 0}
            style={{
              ...btnBase,
              padding: "8px 14px",
              background: "transparent",
              color: FC.muted,
              border: `1px solid ${FC.border}`,
              flex: "0 0 auto",
              opacity: !data.tradition || traditionNeeds.length === 0 ? 0.6 : 1,
            }}
          >
            Select common for {data.tradition || "—"}
          </button>

          <button
            type="button"
            onClick={() => onChange({ needsSelections: [] })}
            style={{
              ...btnBase,
              padding: "8px 14px",
              background: "transparent",
              color: FC.muted,
              border: `1px solid ${FC.border}`,
              flex: "0 0 auto",
            }}
          >
            Clear
          </button>
        </div>

        <div
          id="funeral-needs"
          style={{
            background: FC.bg,
            border: `1px solid ${FC.border}`,
            borderRadius: 12,
            padding: 12,
            marginBottom: 14,
          }}
        >
          {traditionNeeds.length === 0 ? (
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: FC.muted,

                margin: 0,
              }}
            >
              Select a tradition to see quick needs options.
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: 10,
              }}
            >
              {traditionNeeds.map((opt) => {
                const checked = selectedNeeds.includes(opt);
                return (
                  <label
                    key={opt}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                      cursor: "pointer",
                      userSelect: "none",
                      padding: "8px 10px",
                      borderRadius: 10,
                      border: checked
                        ? `1px solid rgba(0,0,0,0.14)`
                        : `1px solid transparent`,
                      background: checked
                        ? "rgba(107,106,104,0.08)"
                        : "transparent",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onChange({
                            needsSelections: Array.from(
                              new Set([...selectedNeeds, opt]),
                            ),
                          });
                        } else {
                          onChange({
                            needsSelections: selectedNeeds.filter(
                              (x) => x !== opt,
                            ),
                          });
                        }
                      }}
                      style={{ marginTop: 2 }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        color: FC.text,
                        lineHeight: 1.25,
                      }}
                    >
                      {opt}
                    </span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        <label
          htmlFor="funeral-needs-details"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: FC.muted,
            display: "block",
            marginBottom: 6,
          }}
        >
          Other details (optional)
        </label>
        <textarea
          id="funeral-needs-details"
          rows={3}
          placeholder="Add any extra context (names, timing, special instructions)…"
          value={data.needs}
          onChange={(e) => onChange({ needs: e.target.value })}
          style={{
            width: "100%",
            padding: "10px 14px",
            boxSizing: "border-box",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            border: `1px solid ${FC.border}`,
            borderRadius: 10,
            background: FC.bg,
            color: FC.text,
            outline: "none",
            resize: "vertical",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={onBack}
          style={{
            ...btnBase,
            background: "transparent",
            color: FC.muted,
            border: `1px solid ${FC.border}`,
            flex: "0 0 auto",
          }}
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          disabled={!canNext}
          style={{
            ...btnBase,
            flex: 1,
            background: canNext ? FC.accent : FC.step,
            color: canNext ? "#fff" : FC.muted,
            cursor: canNext ? "pointer" : "not-allowed",
          }}
        >
          Review →
        </button>
      </div>
    </div>
  );
}

function FuneralStep3({ data, onBack, onSubmit }) {
  const rows = [
    { label: "Name", value: data.name },
    { label: "Contact", value: data.contact },
    { label: "Location", value: data.location },
    { label: "Tradition", value: data.tradition },
    data.needs && { label: "Needs", value: data.needs },
  ].filter(Boolean);

  const btnBase = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 600,
    fontSize: 15,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.15s",
    padding: "12px 20px",
  };

  return (
    <div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 20,
          fontWeight: 600,
          color: FC.text,
          marginBottom: 6,
        }}
      >
        Review & Confirm
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
          color: FC.muted,
          marginBottom: 22,
          lineHeight: 1.6,
        }}
      >
        Please review your information before submitting.
      </p>

      <div
        style={{
          background: FC.bg,
          borderRadius: 10,
          padding: "8px 16px",
          marginBottom: 20,
        }}
      >
        {rows.map((row, i) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "9px 0",
              borderBottom:
                i < rows.length - 1 ? `1px solid ${FC.border}` : "none",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: FC.muted,
                flexShrink: 0,
                marginRight: 12,
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: FC.text,
                fontWeight: 500,
                textAlign: "right",
              }}
            >
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: FC.muted,
          marginBottom: 22,
          lineHeight: 1.65,
        }}
      >
        By confirming, a coordinator will be assigned and will call you within
        30 minutes.
      </p>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={onBack}
          style={{
            ...btnBase,
            background: "transparent",
            color: FC.muted,
            border: `1px solid ${FC.border}`,
            flex: "0 0 auto",
          }}
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          style={{ ...btnBase, flex: 1, background: FC.accent, color: "#fff" }}
        >
          Confirm &amp; Submit
        </button>
      </div>
    </div>
  );
}

export default function FuneralPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    location: "",
    tradition: "",
    // Checkbox selections (fast selection)
    needsSelections: [],
    // Optional free-text for extra context
    needs: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [caseId] = useState(generateCaseId());

  const update = (patch) => setFormData((f) => ({ ...f, ...patch }));

  if (submitted) {
    return (
      <div
        style={{
          background: FC.bg,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 64, marginBottom: 20 }}>🕯️</div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28,
            fontWeight: 600,
            color: FC.text,
            marginBottom: 14,
          }}
        >
          We are with you
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: FC.muted,
            maxWidth: 380,
            lineHeight: 1.7,
            marginBottom: 10,
          }}
        >
          A coordinator will call within 30 minutes to offer support and
          assistance.
        </p>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: FC.accent,
            marginBottom: 28,
          }}
        >
          Case Reference: <strong>{caseId}</strong>
        </p>
        <div
          style={{
            background: FC.surface,
            border: `1px solid ${FC.border}`,
            borderRadius: 12,
            padding: "14px 24px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: FC.muted,
          }}
        >
          🧡 24/7 Helpline: +91 1800-YOUR-ALLY
        </div>
      </div>
    );
  }

  return (
    <div
      className="ya-appear ya-app-bg"
      style={{
        background: FC.bg,
        minHeight: "100vh",
        padding: "48px 24px 60px",
      }}
    >
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28,
              fontWeight: 600,
              color: FC.text,
              marginBottom: 10,
            }}
          >
            Funeral Support
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              color: FC.muted,
              lineHeight: 1.7,
            }}
          >
            Compassionate, respectful assistance during difficult times. We are
            here with you.
          </p>
        </div>

        <ShowcaseBanner
          title="Product Thinking Insight: Empathy-Driven Crisis UX Design"
          description="A masterclass in empathy-driven crisis product design. To support users during intense grief, the product entirely strips out vibrant brand colors in favor of a calming, respectful neutral palette (FC). The 3-step funnel minimizes cognitive load by using culture-specific smart presets to automate immediate logistical needs, backed by a high-touch 30-minute callback commitment."
          highlights={["Crisis UX & User Empathy", "Solemn Theme Psychology", "Frictionless 3-Step Funnel", "High-Touch Operation Coordination"]}
          themeColor={FC.accent}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 36,
          }}
        >
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div
                aria-current={step === s ? "step" : undefined}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: step >= s ? FC.accent : FC.surface,
                  border: `2px solid ${step >= s ? FC.accent : FC.step}`,
                  color: step >= s ? "#fff" : FC.muted,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                {s}
              </div>
              {i < 2 && (
                <div
                  style={{
                    width: 56,
                    height: 2,
                    background: step > s ? FC.accent : FC.step,
                    transition: "all 0.2s",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            background: FC.surface,
            border: `1px solid ${FC.border}`,
            borderRadius: 16,
            padding: "30px 28px",
          }}
        >
          {step === 1 && (
            <FuneralStep1
              data={formData}
              onChange={update}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <FuneralStep2
              data={formData}
              onChange={update}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <FuneralStep3
              data={formData}
              onBack={() => setStep(2)}
              onSubmit={() => setSubmitted(true)}
            />
          )}
        </div>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: FC.muted,
            }}
          >
            Need immediate help? Call us directly:
          </p>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              color: FC.text,
              marginTop: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <Icon name="phone" size={14} color={FC.text} /> +91 1800-YOUR-ALLY (24/7)
          </p>
        </div>
      </div>
    </div>
  );
}
