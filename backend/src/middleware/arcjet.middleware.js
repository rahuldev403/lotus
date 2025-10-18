import getArcjet from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";
import { ENV } from "../lib/env.js";

export const arcjetProtection = async (req, res, next) => {
  // Skip Arcjet if key is not configured
  if (!ENV.ARCJET_KEY || ENV.ARCJET_KEY === "your_arcjet_key") {
    return next();
  }

  try {
    const aj = getArcjet();
    if (!aj) return next();

    const decision = await aj.protect(req);

    // Check for spoofed bots first
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected",
      });
    }

    // Check if request is denied
    if (decision.isDenied()) {
      // Check the specific reason for denial
      if (decision.reason.isRateLimit()) {
        return res
          .status(429)
          .json({ message: "Rate limit exceeded. Please try again later" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied" });
      } else {
        return res.status(403).json({
          message: "Access denied by security policy",
        });
      }
    }

    // Request is allowed, continue to next middleware
    next();
  } catch (error) {
    console.log("Arcjet protection error:", error.message);
    // On error, allow the request to continue (fail open)
    next();
  }
};
