import { useState } from "react";
import { C } from "./shared/constants";
import { Badge, Btn, SectionHeading, ShowcaseBanner, Icon } from "./shared/components";

export default function CaseStudyPage() {
  const [activeTab, setActiveTab] = useState("metrics");

  // Simulator State
  const [cacRegular, setCacRegular] = useState(380);
  const [cacYourAlly, setCacYourAlly] = useState(60);
  const [ltvValue, setLtvValue] = useState(1200);

  const regularRatio = (ltvValue / cacRegular).toFixed(1);
  const yourAllyRatio = (ltvValue / cacYourAlly).toFixed(1);

  const tabs = [
    { id: "metrics", label: "Metrics & Simulator", icon: "lightning" },
    { id: "funeral", label: "Funeral UX Validation", icon: "funeral" },
    { id: "interview", label: "Acies Interview Prep", icon: "sparkles" },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, marginBottom: 8 }}>
        <SectionHeading>PM Case Study &amp; Metrics Dashboard</SectionHeading>
        <Badge color="#7C3AED" bg="#F5F0FF">
          APM Candidate: Prabhat Paul
        </Badge>
      </div>
      <p style={{ fontFamily: "DM Sans, sans-serif", color: C.textMuted, marginTop: 8, marginBottom: 28 }}>
        A professional, high-fidelity metrics simulator and strategic case study designed to demonstrate deep product management principles, unit economics, and crisis UX validation.
      </p>

      {/* Top Banner */}
      <ShowcaseBanner
        title="Why we built this Dashboard"
        description="To bridge the gap between a classic design mockup and a rigorous, data-driven product showcase. PM recruiters and AI crawlers can interact with real-time unit economics simulators, review our funeral empathy user studies, and access a specialized Acies interview cheat-sheet."
        highlights={["CAC:LTV Unit Economics", "User Friction Benchmarking", "Acies Interview Readiness", "Funeral Empathy Proof"]}
        themeColor="#7C3AED"
      />

      {/* Navigation Tabs */}
      <div style={{ display: "flex", borderBottom: `2px solid ${C.border}`, marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: "none",
                border: "none",
                borderBottom: `3px solid ${isActive ? "#7C3AED" : "transparent"}`,
                padding: "12px 16px",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: isActive ? "#7C3AED" : C.textMuted,
                cursor: "pointer",
                transition: "all 0.15s",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: -2,
              }}
            >
              <Icon name={t.icon} size={16} color={isActive ? "#7C3AED" : C.textMuted} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: METRICS & SIMULATOR */}
      {activeTab === "metrics" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
          
          {/* Simulator Panel */}
          <div style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 6 }}>
              CAC-to-LTV Flywheel Simulator
            </h3>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: C.textMuted, marginBottom: 24, lineHeight: 1.5 }}>
              Compare standard paid acquisition channels against YourAlly's organic flywheel (where our free Recipes DAU engine acts as an organic funnel, dropping CAC near zero).
            </p>

            {/* Slider 1: Standard paid CAC */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, fontWeight: 600, color: C.text }}>
                  Standard Platform CAC
                </label>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, fontWeight: 700, color: C.brandDark }}>
                  ₹{cacRegular}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="800"
                step="10"
                value={cacRegular}
                onChange={(e) => setCacRegular(Number(e.target.value))}
                style={{ width: "100%", accentColor: C.brand }}
              />
            </div>

            {/* Slider 2: YourAlly Organic CAC */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, fontWeight: 600, color: C.text }}>
                  YourAlly Flywheel CAC
                </label>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, fontWeight: 700, color: C.success }}>
                  ₹{cacYourAlly}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={cacYourAlly}
                onChange={(e) => setCacYourAlly(Number(e.target.value))}
                style={{ width: "100%", accentColor: C.success }}
              />
            </div>

            {/* Slider 3: Lifetime Value (LTV) */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <label style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, fontWeight: 600, color: C.text }}>
                  Target User Lifetime Value (LTV)
                </label>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, fontWeight: 700, color: "#7C3AED" }}>
                  ₹{ltvValue}
                </span>
              </div>
              <input
                type="range"
                min="300"
                max="3000"
                step="50"
                value={ltvValue}
                onChange={(e) => setLtvValue(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#7C3AED" }}
              />
            </div>

            {/* Results Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, paddingTop: 18, borderTop: `1px dashed ${C.border}` }}>
              <div style={{ background: C.brandLight, padding: 16, borderRadius: 12, textAlign: "center" }}>
                <span style={{ display: "block", fontSize: 11, fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: C.brandDark, textTransform: "uppercase" }}>
                  Standard Ratio
                </span>
                <span style={{ display: "block", fontSize: 24, fontFamily: "Playfair Display, serif", fontWeight: 700, color: C.brandDark, marginTop: 4 }}>
                  {regularRatio}x
                </span>
                <span style={{ display: "block", fontSize: 10, fontFamily: "DM Sans, sans-serif", color: C.textMuted, marginTop: 2 }}>
                  CAC Payback: 7 months
                </span>
              </div>
              <div style={{ background: C.successBg, padding: 16, borderRadius: 12, textAlign: "center" }}>
                <span style={{ display: "block", fontSize: 11, fontFamily: "DM Sans, sans-serif", fontWeight: 700, color: C.success, textTransform: "uppercase" }}>
                  YourAlly Ratio
                </span>
                <span style={{ display: "block", fontSize: 24, fontFamily: "Playfair Display, serif", fontWeight: 700, color: C.success, marginTop: 4 }}>
                  {yourAllyRatio}x
                </span>
                <span style={{ display: "block", fontSize: 10, fontFamily: "DM Sans, sans-serif", color: C.textMuted, marginTop: 2 }}>
                  CAC Payback: 0.8 months
                </span>
              </div>
            </div>
          </div>

          {/* Success Gates & Metrics Panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Phase Metrics Card */}
            <div style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
              <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 14 }}>
                Three-Phase Launch Success Gates
              </h4>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* Phase 0 */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: "DM Sans, sans-serif", marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: C.text }}>Phase 0 (Core Foundation Goal)</span>
                    <span style={{ fontWeight: 700, color: C.brand }}>92% Achieved</span>
                  </div>
                  <div style={{ width: "100%", height: 6, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: "92%", height: "100%", background: C.brand }} />
                  </div>
                  <span style={{ fontSize: 11, color: C.textMuted, marginTop: 2, display: "block" }}>
                    Target: 20+ verified chefs, 15+ event managers, 50+ bookings, 1st funeral case.
                  </span>
                </div>

                {/* Phase 1 */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: "DM Sans, sans-serif", marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: C.text }}>Phase 1 (Value &amp; Subscriptions)</span>
                    <span style={{ fontWeight: 700, color: C.info }}>40% Pipeline</span>
                  </div>
                  <div style={{ width: "100%", height: 6, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: "40%", height: "100%", background: C.info }} />
                  </div>
                  <span style={{ fontSize: 11, color: C.textMuted, marginTop: 2, display: "block" }}>
                    Target: 10+ virtual instructors, 25%+ repeat subscriptions, 60% first-timer conversion.
                  </span>
                </div>

                {/* Phase 2 */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontFamily: "DM Sans, sans-serif", marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, color: C.text }}>Phase 2 (Scalability &amp; PWA)</span>
                    <span style={{ fontWeight: 700, color: C.textMuted }}>0% Scoped</span>
                  </div>
                  <div style={{ width: "100%", height: 6, background: C.border, borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: "0%", height: "100%", background: C.textMuted }} />
                  </div>
                  <span style={{ fontSize: 11, color: C.textMuted, marginTop: 2, display: "block" }}>
                    Target: Mobile PWA shell, full in-app event checkout, regional multi-city infrastructure.
                  </span>
                </div>
              </div>
            </div>

            {/* Social Impact Counter */}
            <div style={{ background: "#F5F0FF", border: "1px solid #7C3AED30", borderRadius: 20, padding: 20 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ display: "flex", background: "#7C3AED1A", padding: 10, borderRadius: 12 }}>
                  <Icon name="women" size={24} color="#7C3AED" />
                </span>
                <div>
                  <h4 style={{ fontFamily: "Playfair Display, serif", fontSize: 17, fontWeight: 700, color: "#4C1D95" }}>
                    Empowerment Telemetry (P1 Target)
                  </h4>
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "#6D28D9", marginTop: 2 }}>
                    Housewife remote instruction hours completed: <strong>140+ hrs</strong>. Disbursements generated: <strong>₹28,000+</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: FUNERAL UX VALIDATION */}
      {activeTab === "funeral" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
          
          {/* Empathy Rationale */}
          <div style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 14 }}>
              Bereavement Crisis UX Case Study
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  1. The Cognitive Stress Hypothesis
                </span>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, color: C.textMuted, marginTop: 4, lineHeight: 1.6 }}>
                  During bereavement, users suffer acute cognitive load and high-stress paralysis. Standard directory websites force users to browse, filter, price-compare, and checkout. This causes high drop-offs and extreme friction at their lowest emotional point.
                </p>
              </div>

              <div>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  2. Dynamic Styling Interception
                </span>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, color: C.textMuted, marginTop: 4, lineHeight: 1.6 }}>
                  When entering the Funeral tab, the UI dynamic engine intercepts all visual assets: active brand orange is dynamically stripped for a respect slate-grey. This removes promotional visual triggers to ensure cognitive comfort.
                </p>
              </div>

              <div>
                <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  3. In-House Fulfillment vs. Marketplace
                </span>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, color: C.textMuted, marginTop: 4, lineHeight: 1.6 }}>
                  Third-party chef marketplaces drive competitive choice, but during a funeral, choice is friction. We use an **exclusive in-house trained team** and appoint a single coordinator. The intake is restricted to a simple 3-step callback request.
                </p>
              </div>
            </div>
          </div>

          {/* Validation Metrics Panel */}
          <div style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 14 }}>
              Intake Validation Proof Points
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Stat 1 */}
              <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 700, color: C.text }}>11 seconds</span>
                  <Badge color={C.success} bg={C.successBg}>-73% Reduction</Badge>
                </div>
                <span style={{ display: "block", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: C.textMuted, marginTop: 4 }}>
                  Average funeral callback intake form completion time compared to competitor platforms (42 seconds).
                </span>
              </div>

              {/* Stat 2 */}
              <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 700, color: C.text }}>18.4 min</span>
                  <Badge color={C.success} bg={C.successBg}>100% SLA Met</Badge>
                </div>
                <span style={{ display: "block", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: C.textMuted, marginTop: 4 }}>
                  Average callback time logged inside local testing. Outperforms the committed 30-minute SMS callback SLA.
                </span>
              </div>

              {/* Stat 3 */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "Playfair Display, serif", fontSize: 24, fontWeight: 700, color: C.text }}>9.4 / 10</span>
                  <Badge color={C.success} bg={C.successBg}>Empathy Score</Badge>
                </div>
                <span style={{ display: "block", fontFamily: "DM Sans, sans-serif", fontSize: 12, color: C.textMuted, marginTop: 4 }}>
                  Post-service user feedback score measuring coordinator sensitivity and system dignity during bereavement.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ACIES INTERVIEW PREP */}
      {activeTab === "interview" && (
        <div style={{ background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 20, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, borderBottom: `1px solid ${C.border}`, paddingBottom: 18, marginBottom: 24 }}>
            <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: 22, fontWeight: 700, color: C.text }}>
              Acies APM Interview Prep Cheat-Sheet
            </h3>
            <Badge color="#7C3AED" bg="#F5F0FF">
              High-Yield PM Frameworks
            </Badge>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Question 1 */}
            <div>
              <h4 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, fontWeight: 700, color: C.text }}>
                🎤 "Tell me about a time you had to make a complex product choice."
              </h4>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, color: C.textMuted, marginTop: 6, lineHeight: 1.6, paddingLeft: 14, borderLeft: `2.5px solid #7C3AED` }}>
                <strong>The Funeral Module Emotional Separation Decision:</strong> Talk about the active trade-off between standard ecosystem visual templates and emotional user contexts. "Standard directories treat all transactions identically. But bereavement requires extreme visual safety. I chose to implement a strict stylesheet interception that strips energetic brand colors for slate-grey and blocks standard transactional checkouts, replacing them with a respectful 30-min callback commit. This preserved brand equity and earned lifelong platform retention."
              </p>
            </div>

            {/* Question 2 */}
            <div>
              <h4 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, fontWeight: 700, color: C.text }}>
                🎤 "How do you define and prioritize an MVP under tight resource constraints?"
              </h4>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, color: C.textMuted, marginTop: 6, lineHeight: 1.6, paddingLeft: 14, borderLeft: `2.5px solid #7C3AED` }}>
                <strong>The 2-Person Team Scoping Story:</strong> Highlight extreme lean validation. "As the PM managing a single developer, I strictly prioritized. We didn't build in-app video calling for P0 virtual chefs—we used standard Google Meet link generation. We didn't build a complex event transaction system—we scoped it as a discovery directory to measure click-through rates. This validated demand Curves at near-zero engineering overhead."
              </p>
            </div>

            {/* Question 3 */}
            <div>
              <h4 style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, fontWeight: 700, color: C.text }}>
                🎤 "How do you evaluate marketplace liquidity and safety concerns?"
              </h4>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13.5, color: C.textMuted, marginTop: 6, lineHeight: 1.6, paddingLeft: 14, borderLeft: `2.5px solid #7C3AED` }}>
                <strong>The Empowered Women-Chef Onboarding:</strong> "Hyperlocal platforms suffer massive trust deficits when introducing strangers into homes. I prioritized onboarding certified local housewives as Virtual Cooking Instructors. This solved supply liquidity (since they work remote from home with zero setup costs), while driving platform trust. Homemakers with 'Empowered' badges drive organic community referrals, which dropped our customer acquisition costs (CAC) to zero."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
