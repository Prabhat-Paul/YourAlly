export function Icon({ name, size = 20, color = "currentColor", style = {} }) {
  const baseStyle = {
    display: "inline-block",
    verticalAlign: "middle",
    flexShrink: 0,
    ...style,
  };

  switch (name) {
    case "chef":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          {/* Chef toque outline */}
          <path d="M6 18V11a5 5 0 0 1 10 0v7M5 18h14a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1Z" />
          <path d="M9 11V7a3 3 0 0 1 6 0v4" />
          {/* Sleek culinary symbols */}
          <path d="M12 18v3" />
        </svg>
      );

    case "recipe":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          {/* Open cookbook / book */}
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
          {/* Utensil emblem on the cover */}
          <path d="M10 6h4M12 6v6" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      );

    case "event":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          {/* Calendar with modern layout */}
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          {/* Celebration tick indicators */}
          <circle cx="8" cy="14" r="1" />
          <circle cx="12" cy="14" r="1" />
          <circle cx="16" cy="14" r="1" />
          <circle cx="8" cy="18" r="1" />
          <circle cx="12" cy="18" r="1" />
        </svg>
      );

    case "funeral":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          {/* Solemn lotus flower of peace */}
          <path d="M12 22c5.523 0 10-4.477 10-10 0-4.5-5.5-9-10-11.5C7.5 3 2 7.5 2 12c0 5.523 4.477 10 10 10Z" />
          <path d="M12 7.5c1.5 2.5 3.5 3.5 3.5 6.5s-2 5-3.5 5-3.5-2-3.5-5 2-4 3.5-6.5Z" />
          <path d="M2 12c3.5 1 7.5.5 10 0s6.5-1 10 0" />
        </svg>
      );

    case "women":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          {/* Silhouette profile representing female mentorship & academic mastery */}
          <path d="M12 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
          <path d="M18 21a6 6 0 0 0-12 0" />
          {/* Sparkling mentorship indicator */}
          <path d="M19 8h2M20 7v2" />
        </svg>
      );

    case "location":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );

    case "phone":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
      );

    case "lock":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );

    case "globe":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
        </svg>
      );

    case "check":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );

    case "sparkles":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          {/* High-class 4-point vector sparkles */}
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
          <path d="M5 3h2M6 2v2M18 19h2M19 18v2" />
        </svg>
      );

    case "lightning":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );

    case "trophy":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          {/* Geometric professional trophy cup */}
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
          <path d="M12 2a6 6 0 0 1 6 6v3a6 6 0 0 1-12 0V8a6 6 0 0 1 6-6Z" />
        </svg>
      );

    case "medal-new":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          {/* Level 1 basic ribbon medal */}
          <circle cx="12" cy="9" r="6" />
          <path d="M9 14.5 7.5 22l4.5-2 4.5 2L15 14.5" />
        </svg>
      );

    case "medal-bronze":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          {/* Classic bronze achievement medal */}
          <circle cx="12" cy="8" r="5" />
          <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
          <circle cx="12" cy="8" r="2" />
        </svg>
      );

    case "medal-silver":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={baseStyle}
          aria-hidden="true"
        >
          {/* Highly detailed silver medal */}
          <circle cx="12" cy="8" r="6" />
          <path d="m9.5 13 1 9 1.5-2 1.5 2 1-9" />
          <circle cx="12" cy="8" r="3" fill={color} fillOpacity="0.1" />
        </svg>
      );

    default:
      return null;
  }
}
