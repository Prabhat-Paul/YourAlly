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

export default function SignUpPage({ onSignIn, setSection }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [mode, setMode] = useState("physical");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const preEmail = url.searchParams.get("email");
    if (!preEmail) return;
    queueMicrotask(() => setEmail(preEmail));
  }, []);

  function validate() {
    const n = name.trim();
    const e = email.trim();
    if (!n) return "Name is required.";
    if (!e) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
      return "Enter a valid email address.";
    if (!password || password.length < 6)
      return "Password must be at least 6 characters.";

    // Role/mode validation (frontend-only)
    if (!role) return "Please choose a signup role.";
    const needsMode = role !== "user";
    if (needsMode && !mode) return "Please choose Virtual/Physical/Both.";

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
    await new Promise((r) => setTimeout(r, 800));

    const user = {
      id: "u_" + Math.random().toString(16).slice(2),
      name: name.trim(),
      email: email.trim(),
      role,
      mode: role === "user" ? undefined : mode,
      createdAt: Date.now(),
    };

    localStorage.setItem("ya_auth_user", JSON.stringify(user));

    setToast({
      message: "Account created. You are now signed in.",
      type: "success",
    });
    onSignIn?.(user);

    await new Promise((r) => setTimeout(r, 250));
    setBusy(false);
  }

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "42px 24px 70px" }}>
      <div className="ya-auth-grid">
        <div className="ya-auth-card">
          <SectionHeading>Create account</SectionHeading>
          <p
            style={{
              marginTop: 8,
              color: C.textMuted,
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            Get started in seconds. This is frontend-only until you connect your
            DB/auth provider.
          </p>

          <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
            <Field label="Full name">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
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
                autoComplete="new-password"
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
              label="Sign up as"
              hint="Choose the role you want to use on YourAlly."
            >
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: `1.5px solid ${C.borderMed}`,
                  background: "#fff",
                  outline: "none",
                }}
              >
                <option value="user">User</option>
                <option value="cook">Cook / Chef</option>
                <option value="eventManager">Event Manager</option>
              </select>
            </Field>

            {role === "cook" ? (
              <Field
                label="Mode"
                hint="Select if you prefer virtual or physical service."
              >
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 12,
                    border: `1.5px solid ${C.borderMed}`,
                    background: "#fff",
                    outline: "none",
                  }}
                >
                  <option value="virtual">Virtual</option>
                  <option value="physical">Physical</option>
                  <option value="both">Both (Physical & Virtual)</option>
                </select>
              </Field>
            ) : null}

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
                {busy ? "Creating..." : "Create account"}
              </Btn>
              <Btn
                variant="secondary"
                type="button"
                onClick={() => setSection?.("sign-in")}
                disabled={busy}
                style={{ padding: "12px 22px" }}
              >
                I have an account
              </Btn>
            </div>
          </form>
        </div>

        <div
          className="ya-auth-card"
          style={{ background: C.infoBg }}
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
            Ready for backend
          </h3>
          <p
            style={{
              marginTop: 0,
              color: C.textMuted,
              fontSize: 14,
              lineHeight: 1.65,
            }}
          >
            Replace the fake sign-in handler with your preferred auth connector
            later (Firebase/Auth0/custom JWT).
          </p>

          <div
            style={{
              marginTop: 16,
              padding: 14,
              borderRadius: 14,
              background: "rgba(255,255,255,0.8)",
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 6 }}>
              What the UI already handles
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                color: C.textMuted,
                fontSize: 13,
                lineHeight: 1.75,
              }}
            >
              <li>Validation</li>
              <li>Loading states</li>
              <li>Client-side persistence</li>
            </ul>
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
