import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

// Check if Twilio credentials are valid (not placeholders)
const hasValidTwilioConfig =
  accountSid &&
  authToken &&
  twilioPhone &&
  accountSid.startsWith("AC") &&
  authToken !== "your_auth_token_here" &&
  twilioPhone !== "+1234567890";

// Only initialize Twilio client if valid credentials are provided
const client = hasValidTwilioConfig ? twilio(accountSid, authToken) : null;

export async function sendSMS(to: string, message: string) {
  // If Twilio is not configured or using placeholder credentials, log and return
  if (!hasValidTwilioConfig) {
    console.log(
      "📱 SMS would be sent (Twilio not configured or using placeholder credentials):"
    );
    console.log(`To: ${to}`);
    console.log(`Message: ${message}`);
    return { success: true, messageId: "simulated" };
  }

  try {
    // Format Zimbabwe numbers properly
    let formattedTo = to.trim();

    // Remove any spaces, dashes, etc.
    formattedTo = formattedTo.replace(/[\s\-\(\)]/g, "");

    // Ensure it starts with +263 for Zimbabwe numbers
    if (formattedTo.startsWith("0")) {
      // Convert 078... to +26378...
      formattedTo = "+263" + formattedTo.slice(1);
    } else if (!formattedTo.startsWith("+")) {
      // Add + if missing
      formattedTo = "+" + formattedTo;
    }

    // Ensure it's a valid Zimbabwe number format
    if (!formattedTo.startsWith("+263")) {
      console.warn("⚠️  Number may not be Zimbabwe format:", formattedTo);
    }

    console.log(`📱 Attempting to send SMS to: ${formattedTo}`);
    console.log(`💬 Message: ${message}`);

    const result = await client!.messages.create({
      body: message,
      from: twilioPhone!,
      to: formattedTo,
    });

    console.log("✅ SMS sent successfully:", result.sid);
    return { success: true, messageId: result.sid };
  } catch (error: unknown) {
    console.error("❌ SMS error:", error);

    // Provide more specific error messages
    let errorMessage = "Failed to send SMS";
    if (error instanceof Error) {
      if ("code" in error) {
        const errorCode = (error as { code?: number }).code;
        if (errorCode === 21211) {
          errorMessage = "Invalid phone number format";
        } else if (errorCode === 21408) {
          errorMessage = "Twilio account not authorized to send to this region";
        } else if (errorCode === 21610) {
          errorMessage = "Phone number is not SMS capable";
        }
      }
    }

    return {
      success: false,
      error: errorMessage,
      details: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
