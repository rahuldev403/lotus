import { ENV } from "./env.js";
import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

let cachedAj = null;

export function getArcjet() {
  // Only initialize Arcjet if a real key is provided
  if (!ENV.ARCJET_KEY || ENV.ARCJET_KEY === "your_arcjet_key") {
    return null;
  }

  if (cachedAj) return cachedAj;

  cachedAj = arcjet({
    key: ENV.ARCJET_KEY,
    rules: [
      shield({ mode: ENV.ARCJET_ENV === "production" ? "LIVE" : "DRY_RUN" }),
      detectBot({
        mode: ENV.ARCJET_ENV === "production" ? "LIVE" : "DRY_RUN",
        allow: ["CATEGORY:SEARCH_ENGINE"],
      }),
      slidingWindow({
        mode: ENV.ARCJET_ENV === "production" ? "LIVE" : "DRY_RUN",
        max: 100,
        interval: 60,
      }),
    ],
  });

  return cachedAj;
}

export default getArcjet;
