import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientUrl) => {
  // Validate environment variables
  if (!sender.name || !sender.email) {
    throw new Error("Email sender configuration is missing. Please check EMAIL_FROM and EMAIL_FROM_NAME environment variables.");
  }

  if (!email || !name || !clientUrl) {
    throw new Error("Missing required parameters for sending welcome email.");
  }

  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "👋 welcome to lotus",
    html: createWelcomeEmailTemplate(name, clientUrl),
  });
  
  if (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Failed to send welcome email: ${error.message || error}`);
  }
  
  console.log("Welcome email sent successfully to:", email);
  return { success: true, data };
};
