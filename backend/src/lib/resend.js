import { Resend } from "resend";
import { ENV } from "./env.js";

// Validate required environment variables
if (!ENV.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is required");
}

export const resendClient = new Resend(ENV.RESEND_API_KEY);

export const sender = {
  email: ENV.EMAIL_FROM,
  name: ENV.EMAIL_FROM_NAME,
};
