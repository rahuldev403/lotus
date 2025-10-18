import { ENV } from "./env.js";
import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";

const aj = arcjet({
  // Get your site key from https://app.arcjet.com and set it as an environment
  // variable rather than hard coding.
  key: ENV.ARCJET_KEY || "test-key",
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: ENV.ARCJET_ENV === "production" ? "LIVE" : "DRY_RUN" }),
    // Create a bot detection rule
    detectBot({
      mode: ENV.ARCJET_ENV === "production" ? "LIVE" : "DRY_RUN",
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    slidingWindow({
      mode: ENV.ARCJET_ENV === "production" ? "LIVE" : "DRY_RUN",
      max: 100,
      interval: 60,
    }),
  ],
});

export default aj;
