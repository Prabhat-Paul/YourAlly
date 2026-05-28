// Shared utilities extracted from the original YourAllyApp.jsx

import { FC, LOYALTY_TIERS } from "./constants";

export function formatQty(qty) {
  if (qty === 0) return "0";
  const rounded = Math.round(qty * 4) / 4;
  if (Number.isInteger(rounded)) return String(rounded);
  return parseFloat(rounded.toFixed(2)).toString();
}

export function scaleIngredient(ing, baseServings, currentServings) {
  const scale = currentServings / baseServings;
  let scaledQty = ing.qty * scale;
  let unit = ing.unit;

  // Convert tsp → tbsp when qty ≥ 3 tsp
  if (unit === "tsp" && scaledQty >= 3) {
    scaledQty = scaledQty / 3;
    unit = "tbsp";
  }

  return { ...ing, qty: scaledQty, unit };
}

export function getTier(bookings) {
  return (
    LOYALTY_TIERS.find((t) => bookings >= t.min && bookings <= t.max) ||
    LOYALTY_TIERS[0]
  );
}

export function generateCaseId() {
  return "#YA-" + Math.floor(10000 + Math.random() * 90000);
}

export { FC };
