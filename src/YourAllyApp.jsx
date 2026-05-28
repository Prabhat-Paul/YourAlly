import { useEffect, useState } from "react";

import "./ui-theme.css";
import "./ya-page-themes.css";

// import { C } from "./pages/shared/constants";

import { Nav, Footer } from "./pages/shared/components.jsx";

import HomePage from "./pages/HomePage";
import ChefPage from "./pages/ChefPage";
import RecipesPage from "./pages/RecipesPage";
import EventsPage from "./pages/EventsPage";
import FuneralPage from "./pages/FuneralPage";
import LoyaltyPage from "./pages/LoyaltyPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

export default function YourAllyApp() {
  const getSectionFromHash = () => {
    if (typeof window === "undefined") return "home";
    const hash = window.location.hash.replace("#", "");
    const validSections = [
      "home",
      "chef",
      "recipes",
      "events",
      "funeral",
      "loyalty",
      "sign-in",
      "sign-up",
    ];
    return validSections.includes(hash) ? hash : "home";
  };

  const [section, setSection] = useState(getSectionFromHash);

  const LANGUAGES = [
    { code: "en-US", label: "English" },
    { code: "hi-IN", label: "Hindi" },
    { code: "bn-IN", label: "Bengali" },
    { code: "ta-IN", label: "Tamil" },
    { code: "te-IN", label: "Telugu" },
    { code: "mr-IN", label: "Marathi" },
  ];

  // Language switching removed (was causing inconsistent font/TTS behavior).
  const language = "en-US";

  // Synchronize browser history and hash pops (swipes, back clicks)
  useEffect(() => {
    const handleHashChange = () => {
      const next = getSectionFromHash();
      setSection(next);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleSetSection = (nextSection) => {
    const currentHash = window.location.hash.replace("#", "");
    if (currentHash !== nextSection) {
      window.location.hash = nextSection;
    } else {
      setSection(nextSection);
    }
  };

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://fonts.googleapis.com";
    document.head.appendChild(link);

    const link2 = document.createElement("link");
    link2.rel = "preconnect";
    link2.href = "https://fonts.gstatic.com";
    link2.crossOrigin = "anonymous";
    document.head.appendChild(link2);

    const fonts = document.createElement("link");
    fonts.rel = "stylesheet";
    fonts.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap";
    document.head.appendChild(fonts);

    // Inject global reset + animation keyframes
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body { font-family: 'DM Sans', sans-serif; background: #FAFAF8; color: #1A1917; -webkit-font-smoothing: antialiased; }
      input, select, textarea, button { font-family: inherit; }
      @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
      }
      @keyframes slideLeft {
        from { transform: translateX(100%); }
        to   { transform: translateX(0);    }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.96); }
        to   { opacity: 1; transform: scale(1);    }
      }
      @keyframes toastIn {
        from { transform: translateX(110%); opacity: 0; }
        to   { transform: translateX(0);    opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [section]);

  const sectionMap = {
    home: <HomePage setSection={handleSetSection} />,
    chef: <ChefPage />,
    recipes: <RecipesPage language={language} />,

    events: <EventsPage />,
    funeral: <FuneralPage />,
    loyalty: <LoyaltyPage />,
    "sign-in": <SignInPage setSection={handleSetSection} />,
    "sign-up": <SignUpPage setSection={handleSetSection} />,
  };

  const themeClass = {
    home: "ya-theme-home",
    chef: "ya-theme-chef",
    recipes: "ya-theme-recipes",
    events: "ya-theme-events",
    funeral: "ya-theme-funeral",
    loyalty: "ya-theme-loyalty",
    "sign-in": "ya-theme-auth",
    "sign-up": "ya-theme-auth",
  }[section];

  return (
    <div className={`ya-app-bg ya-page-bg ${themeClass || "ya-theme-home"}`}>
      <div 
        className="ya-page-content" 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          minHeight: "100vh" 
        }}
      >
        <Nav
          active={section}
          setSection={handleSetSection}
          language={language}
          languages={LANGUAGES}
        />
        <main style={{ flex: 1 }}>
          {sectionMap[section]}
        </main>
        <Footer activeSection={section} />
      </div>
    </div>
  );
}
