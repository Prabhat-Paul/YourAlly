import { useEffect, useState } from "react";
import {
  C,
  RECIPE_CATEGORIES,
  RECIPES,
  translate,
  TRANSLATIONS,
} from "./shared/constants";
import { Badge, Btn, SectionHeading, ShowcaseBanner, Icon } from "./shared/components";
import { scaleIngredient, formatQty } from "./shared/utils";

function VirtualChefModal({ recipe, servings, onClose, language }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1001,
          background: "rgba(0,0,0,0.38)",
        }}
      />
      <div
        role="dialog"
        aria-label="Book a Virtual Chef"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1002,
          background: C.surface,
          borderRadius: 20,
          padding: "32px",
          width: "min(460px, 90vw)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
          animation: "fadeIn 0.2s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 22,
          }}
        >
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: 22,
              color: C.text,
            }}
          >
            Book a Virtual Chef
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 24,
              color: C.textMuted,
              lineHeight: 1,
            }}
          >
            x
          </button>
        </div>
        <div
          style={{
            background: C.bg,
            borderRadius: 10,
            padding: "14px 18px",
            marginBottom: 20,
          }}
        >
          {[
            { label: "Recipe", value: recipe.name },
            {
              label: translate("servings", language) || "Servings",
              value: servings + " people",
            },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "5px 0",
              }}
            >
              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 14,
                  color: C.textMuted,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: C.text,
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: 14,
            color: C.textMuted,
            marginBottom: 24,
            lineHeight: 1.65,
          }}
        >
          A verified virtual chef will guide you through every step live.
          Sessions start from Rs.200/hr.
        </p>
        <Btn
          variant="primary"
          onClick={onClose}
          style={{ width: "100%", padding: "13px 24px", fontSize: 15 }}
        >
          Find a Virtual Chef
        </Btn>
      </div>
    </>
  );
}

function RecipeDetail({
  recipe,
  servings,
  setServings,
  onOpenModal,
  language,
}) {
  const [speaking, setSpeaking] = useState(false);
  const [speechError, setSpeechError] = useState(null);
  const [voices, setVoices] = useState([]);
  const [checkedIngs, setCheckedIngs] = useState({});
  const [completedSteps, setCompletedSteps] = useState({});

  const scaled = recipe.ingredients.map((ing) =>
    scaleIngredient(ing, recipe.servings, servings),
  );
  const pref = language?.split("-")[0] || "en";
  const localizedSteps = TRANSLATIONS[pref]?.recipeSteps;
  // Prefer translated steps if available; otherwise fall back to default steps.
  const stepsText = (localizedSteps || recipe.steps).join(" ");
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const synth = window.speechSynthesis;
    const update = () => {
      try {
        const v = synth.getVoices?.() || [];
        setVoices(v);
        // setTtsDebug((prev) => ({"}}
        //   ...prev,
        //   language,
        //   voiceCount: Array.isArray(v) ? v.length : 0,
        // }));
      } catch {
        setVoices([]);
        // setTtsDebug((prev) => ({ ...prev, language, voiceCount: 0 }));
      }
    };
    update();
    synth.onvoiceschanged = update;
    return () => {
      synth.onvoiceschanged = null;
    };
  }, [language]);
  function stopSpeech() {
    setSpeechError(null);
    setSpeaking(false);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
  function pickBestVoice(voices, langCode) {
    if (!Array.isArray(voices) || voices.length === 0) return null;
    const lc = String(langCode).toLowerCase();
    const prefix = lc.split("-")[0];
    const langVariants = {
      hi: ["hi", "hi-in", "hi_IN", "hindi"],
      bn: ["bn", "bn-bd", "bn-in", "bn_IN", "bengali"],
      ta: ["ta", "ta-in", "ta-lk", "ta_IN", "tamil"],
      te: ["te", "te-in", "te_IN", "telugu"],
      mr: ["mr", "mr-in", "mr_IN", "marathi"],
    };
    const variants = langVariants[prefix] || [prefix];
    const exact = voices.find(
      (v) => v.lang && variants.some((vv) => v.lang.toLowerCase() === vv),
    );
    if (exact) return exact;
    const startsWithVariant = voices.find(
      (v) =>
        v.lang && variants.some((vv) => v.lang.toLowerCase().startsWith(vv)),
    );
    if (startsWithVariant) return startsWithVariant;
    const startsWithPrefix = voices.find(
      (v) => v.lang && v.lang.toLowerCase().startsWith(prefix),
    );
    if (startsWithPrefix) return startsWithPrefix;
    return voices[0] || null;
  }
  function speakSteps() {
    setSpeechError(null);
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSpeechError("Speech not supported.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(stepsText);
    // Some browsers only reliably map voices using the base locale (e.g. "hi" not "hi-IN").
    utterance.lang = language;
    const prefix = String(language || "").split("-")[0];
    try {
      const selectedVoices =
        Array.isArray(voices) && voices.length > 0
          ? voices
          : window.speechSynthesis.getVoices?.() || [];

      const voice = pickBestVoice(selectedVoices, language);
      void selectedVoices;
      // setTtsDebug({
      //   language,
      //   voiceCount: selectedVoices.length,
      //   matchedVoiceLang: voice?.lang ?? null,
      //   matchedVoiceName: voice?.name ?? null,
      // });

      if (voice) {
        utterance.voice = voice;
        // Safety: also set utterance.lang to match the chosen voice.
        if (voice.lang) utterance.lang = voice.lang;
      } else {
        // Fallback: ensure at least the base locale is used.
        utterance.lang = prefix || language;
      }
    } catch {
      // setTtsDebug((prev) => ({
      //   ...prev,
      //   language,
      //   voiceCount: Array.isArray(voices) ? voices.length : 0,
      // }));
    }
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => {
      setSpeaking(false);
      setSpeechError("Could not read aloud.");
    };
    window.speechSynthesis.speak(utterance);
  }
  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <h2
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: 28,
          color: C.text,
          marginBottom: 16,
        }}
      >
        {recipe.name}
      </h2>
      <div
        style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}
      >
        <Badge color={C.brand} bg={C.brandLight}>
          {translate(recipe.cuisine, language)}
        </Badge>
        <Badge color={C.textMuted} bg="#F3F4F6">
          {recipe.time}
        </Badge>
        <Badge
          color={recipe.difficulty === "Easy" ? C.success : C.textMuted}
          bg={recipe.difficulty === "Easy" ? C.successBg : "#F3F4F6"}
        >
          {translate(recipe.difficulty, language)}
        </Badge>
        <Badge color={C.textMuted} bg="#F3F4F6">
          {translate(recipe.category, language)}
        </Badge>
      </div>
      <div
        style={{
          background: C.brandPale,
          border: "1px solid " + C.brand + "25",
          borderRadius: 14,
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 28,
        }}
      >
        <span
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: 14,
            color: C.text,
          }}
        >
          {translate("servings", language) || "Servings"}:
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              type="button"
              aria-label="Decrease head count"
              onClick={() =>
                setServings((s) => Math.max(1, (Number(s) || 1) - 1))
              }
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 18,
                fontWeight: 800,
                width: 36,
                height: 34,
                borderRadius: 10,
                border: "1.5px solid " + C.border,
                background: C.surface,
                color: C.text,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              −
            </button>
            <input
              inputMode="numeric"
              type="number"
              min={1}
              step={1}
              value={servings}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (Number.isNaN(v)) return;
                setServings(Math.max(1, Math.min(50, v)));
              }}
              aria-label="Head count"
              style={{
                width: 86,
                height: 34,
                borderRadius: 10,
                border: "1.5px solid " + (servings ? C.brand + "55" : C.border),
                background: C.surface,
                color: C.text,
                textAlign: "center",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 800,
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              type="button"
              aria-label="Increase head count"
              onClick={() =>
                setServings((s) => Math.min(50, (Number(s) || 1) + 1))
              }
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 18,
                fontWeight: 800,
                width: 36,
                height: 34,
                borderRadius: 10,
                border: "1.5px solid " + C.border,
                background: C.surface,
                color: C.text,
                cursor: "pointer",
                lineHeight: 1,
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <h3
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 20,
            color: C.text,
            marginBottom: 0,
          }}
        >
          {translate("ingredients", language) || "Ingredients"}
        </h3>
        <span
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: 11.5,
            color: C.brand,
            fontWeight: 700,
            background: `${C.brand}12`,
            padding: "4px 10px",
            borderRadius: 20,
            border: `1px solid ${C.brand}25`,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            whiteSpace: "nowrap",
          }}
        >
          <Icon name="sparkles" size={11} color={C.brand} /> Interactive checklist (click to prep)
        </span>
      </div>
      <ul
        style={{
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 36,
        }}
      >
        {scaled.map((ing, i) => {
          const isChecked = !!checkedIngs[i];
          return (
            <li
              key={i}
              onClick={() => setCheckedIngs((prev) => ({ ...prev, [i]: !prev[i] }))}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 14px",
                background: isChecked ? `${C.brand}08` : (i % 2 === 0 ? C.bg : C.surface),
                border: `1.5px solid ${isChecked ? C.brand + "25" : "transparent"}`,
                borderRadius: 10,
                fontFamily: "DM Sans, sans-serif",
                fontSize: 14,
                color: isChecked ? C.textMuted : C.text,
                cursor: "pointer",
                userSelect: "none",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                textDecoration: isChecked ? "line-through" : "none",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    border: `1.5px solid ${isChecked ? C.brand : C.textMuted}`,
                    background: isChecked ? C.brand : "transparent",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    transition: "all 0.15s",
                  }}
                >
                  {isChecked && <Icon name="check" size={11} color="#fff" />}
                </span>
                {ing.name}
              </span>
              <span
                style={{
                  color: isChecked ? C.textFaint : C.textMuted,
                  fontWeight: 600,
                }}
              >
                {formatQty(ing.qty)} {ing.unit}
              </span>
            </li>
          );
        })}
      </ul>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: 20,
              color: C.text,
              marginBottom: 0,
            }}
          >
            {translate("method", language) || "Method"}
          </h3>
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: 11.5,
              color: C.success,
              fontWeight: 700,
              background: `${C.success}12`,
              padding: "4px 10px",
              borderRadius: 20,
              border: `1px solid ${C.success}25`,
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              whiteSpace: "nowrap",
            }}
          >
            <Icon name="lightning" size={11} color={C.success} /> Track progress (click steps)
          </span>
        </div>
        <button
          type="button"
          onClick={speaking ? stopSpeech : speakSteps}
          style={{
            border: "1.5px solid " + (speaking ? C.success : C.brand),
            background: speaking ? C.successBg : C.brandLight,
            color: speaking ? C.success : C.brand,
            borderRadius: 12,
            padding: "10px 14px",
            fontFamily: "DM Sans, sans-serif",
            fontWeight: 800,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          {speaking ? "Stop" : "Read aloud"}
        </button>
      </div>
      {speechError && (
        <div
          style={{
            marginBottom: 14,
            color: C.textMuted,
            fontFamily: "DM Sans, sans-serif",
            fontSize: 13,
          }}
        >
          {speechError}
        </div>
      )}
      <ol
        style={{
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginBottom: 40,
        }}
      >
        {recipe.steps.map((step, i) => {
          const isDone = !!completedSteps[i];
          const isPlayable = i === 0 || !!completedSteps[i - 1];
          const isLocked = !isDone && !isPlayable;

          const handleStepClick = () => {
            if (isLocked) return;

            if (isDone) {
              // Uncomplete 'i' and all subsequent steps
              setCompletedSteps((prev) => {
                const nextState = { ...prev };
                for (let j = i; j < recipe.steps.length; j++) {
                  delete nextState[j];
                }
                return nextState;
              });
            } else {
              // Complete 'i'
              setCompletedSteps((prev) => ({ ...prev, [i]: true }));
            }
          };

          return (
            <li
              key={i}
              onClick={handleStepClick}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                padding: "12px 16px",
                borderRadius: 12,
                background: isDone
                  ? "rgba(45,138,91,0.04)"
                  : isPlayable
                    ? `${C.brand}05`
                    : "transparent",
                border: `1.5px solid ${
                  isDone
                    ? C.success + "25"
                    : isPlayable
                      ? C.brand + "30"
                      : "transparent"
                }`,
                cursor: isLocked ? "not-allowed" : "pointer",
                userSelect: "none",
                opacity: isLocked ? 0.45 : 1,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: isDone
                    ? C.success
                    : isPlayable
                      ? C.brand
                      : "rgba(0,0,0,0.06)",
                  color: isDone || isPlayable ? "#fff" : C.textMuted,
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.25s",
                  boxShadow: isPlayable && !isDone
                    ? `0 4px 10px ${C.brand}30`
                    : "none",
                }}
              >
                {isDone ? <Icon name="check" size={12} color="#fff" /> : i + 1}
              </span>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 14,
                  color: isDone ? C.textMuted : C.text,
                  fontWeight: isPlayable && !isDone ? 600 : 400,
                  lineHeight: 1.65,
                  textDecoration: isDone ? "line-through" : "none",
                  margin: 0,
                  flex: 1,
                  transition: "all 0.2s",
                }}
              >
                {step}
              </p>
            </li>
          );
        })}
      </ol>
      <div
        style={{
          border: "1.5px solid " + C.brand,
          borderRadius: 12,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
          marginBottom: 40,
        }}
      >
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: 14,
            color: C.text,
            flex: 1,
          }}
        >
          Having trouble? Book a 30-minute virtual cooking session.
        </p>
        <Btn variant="secondary" onClick={onOpenModal}>
          Book Session
        </Btn>
      </div>
    </div>
  );
}

export default function RecipesPage({ language }) {
  const [category, setCategory] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(RECIPES[0]);
  const [servings, setServings] = useState(4);
  const [showModal, setShowModal] = useState(false);
  const filtered = RECIPES.filter(
    (r) => category === "All" || r.category === category,
  );
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "40px 24px 60px",
        minHeight: "80vh",
      }}
    >
      <ShowcaseBanner
        title="Product Thinking Insight: Contextual Monetization & Engagement Features"
        description="This recipe module serves as a high-engagement, daily-active-use (DAU) gateway that solves a key user friction point. Instead of static recipe listings, it leverages interactive portion-scaling and voice assistant options to build habit loops, while contextually upselling a high-margin 'Virtual Chef' consulting session at the precise moment of cooking complexity."
        highlights={["Contextual Upselling", "Daily Active Utility (DAU)", "Friction Point Monetization", "In-Context Upgrades"]}
        themeColor={C.brand}
      />
      <div
        className="ya-page-grid"
        style={{ alignItems: "flex-start" }}
      >
        <aside style={{ width: "100%" }}>
        <SectionHeading style={{ fontSize: 26 }}>
          {translate("RecipeLabel", language) || "Recipes"}
        </SectionHeading>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            marginTop: 18,
            marginBottom: 20,
          }}
        >
          {RECIPE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 14,
                fontWeight: category === cat ? 600 : 400,
                padding: "8px 12px",
                borderRadius: 8,
                textAlign: "left",
                border: "none",
                cursor: "pointer",
                background: category === cat ? C.brandLight : "transparent",
                color: category === cat ? C.brand : C.textMuted,
              }}
            >
              {translate(cat, language)}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.length === 0 && (
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: 13,
                color: C.textFaint,
              }}
            >
              No recipes in this category yet.
            </p>
          )}
          {filtered.map((r) => {
            const active = selectedRecipe?.id === r.id;
            return (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRecipe(r);
                  setServings(r.servings);
                }}
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 14,
                  padding: "12px 14px",
                  borderRadius: 10,
                  border: "1px solid " + (active ? C.brand : C.border),
                  background: active ? C.brandLight : C.surface,
                  color: active ? C.brand : C.text,
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: active ? 600 : 400,
                }}
              >
                <div>{r.name}</div>
                <div style={{ fontSize: 12, color: C.textFaint, marginTop: 2 }}>
                  {translate(r.cuisine, language)} ? {r.time}
                </div>
              </button>
            );
          })}
        </div>
      </aside>
      {selectedRecipe && (
        <RecipeDetail
          key={selectedRecipe.id}
          recipe={selectedRecipe}
          servings={servings}
          setServings={setServings}
          onOpenModal={() => setShowModal(true)}
          language={language}
        />
      )}
      {showModal && (
        <VirtualChefModal
          recipe={selectedRecipe}
          servings={servings}
          onClose={() => setShowModal(false)}
          language={language}
        />
      )}
      </div>
    </div>
  );
}
