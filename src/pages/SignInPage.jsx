import { useEffect, useState } from "react";

import { C } from "./shared/constants";
import { Btn, SectionHeading, Toast } from "./shared/components";

function Field({ label, children, hint }) {
  return (
    <label style={{ display: "block", marginBottom: 14 }}>
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          color: C.text,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {children}
      {hint ? (
        <div
          style={{
            marginTop: 8,
            fontSize: 12,
            color: C.textMuted,
            lineHeight: 1.4,
          }}
        >
          {hint}
        </div>
      ) : null}
    </label>
  );
}

export default function SignInPage({ onSignIn, setSection }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    // Optional: prefill email from ?email=
    const preEmail = url.searchParams.get("email");
    if (!preEmail) return;
    queueMicrotask(() => setEmail(preEmail));
  }, []);

  function validate() {
    const e = email.trim();
    if (!e) return "Email is required.";
    // lightweight email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
      return "Enter a valid email address.";
    if (!password || password.length < 6)
      return "Password must be at least 6 characters.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const err = validate();
    if (err) {
      setToast({ message: err, type: "info" });
      return;
    }

    setBusy(true);
    // Frontend-only fake auth handshake
    await new Promise((r) => setTimeout(r, 700));

    const user = {
      id: "u_" + Math.random().toString(16).slice(2),
      email: email.trim(),
      createdAt: Date.now(),
    };

    if (remember) {
      localStorage.setItem("ya_auth_user", JSON.stringify(user));
    } else {
      sessionStorage.setItem("ya_auth_user", JSON.stringify(user));
    }

    setToast({ message: "Signed in successfully.", type: "success" });
    onSignIn?.(user);

    // small delay so toast shows
    await new Promise((r) => setTimeout(r, 300));
    setBusy(false);
  }

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "42px 24px 70px" }}>
      <div className="ya-auth-grid">
        <div className="ya-auth-card">
          <SectionHeading>Sign In</SectionHeading>
          <p
            style={{
              marginTop: 8,
              color: C.textMuted,
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Access your saved chefs, recipes, and loyalty perks.
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
            <Field label="Email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                inputMode="email"
                autoComplete="email"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: `1.5px solid ${C.borderMed}`,
                  background: "#fff",
                  outline: "none",
                }}
              />
            </Field>

            <Field
              label="Password"
              hint="Use any password (min 6 chars) for this frontend demo."
            >
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type="password"
                autoComplete="current-password"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: `1.5px solid ${C.borderMed}`,
                  background: "#fff",
                  outline: "none",
                }}
              />
            </Field>

            <label
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                style={{ width: 18, height: 18 }}
              />
              <span
                style={{
                  fontSize: 13,
                  color: C.textMuted,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Remember me
              </span>
            </label>

            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <Btn
                variant="primary"
                disabled={busy}
                type="submit"
                style={{ padding: "12px 22px" }}
              >
                {busy ? "Signing in..." : "Sign In"}
              </Btn>
              <Btn
                variant="secondary"
                type="button"
                onClick={() => setSection?.("sign-up")}
                disabled={busy}
                style={{ padding: "12px 22px" }}
              >
                Create account
              </Btn>
            </div>
          </form>
        </div>

        <div
          className="ya-auth-card"
          style={{ background: C.brandPale }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontWeight: 800,
              marginBottom: 10,
              color: C.text,
            }}
          >
            Why sign in?
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: 18,
              color: C.textMuted,
              fontSize: 14,
              lineHeight: 1.8,
            }}
          >
            <li>Save recipes and follow cooking guides.</li>
            <li>Unlock loyalty tiers & discounts.</li>
            <li>Keep your bookings history in one place.</li>
          </ul>
          <div
            style={{
              marginTop: 16,
              padding: 14,
              borderRadius: 14,
              background: "rgba(255,255,255,0.75)",
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 6 }}>
              Frontend auth demo
            </div>
            <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>
              This implementation is ready for you to connect later to your
              backend (Firebase/Auth0/custom DB).
            </div>
          </div>
        </div>
      </div>

      {toast ? (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      ) : null}
    </div>
  );
}
