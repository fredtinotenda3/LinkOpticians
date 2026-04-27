// ===== FILE: lib/env-validation.ts (STANDALONE for use in other files) =====

/**
 * Environment Variables Validation
 * Run this at build time to ensure all required env vars are present
 */

export interface EnvConfig {
  required: string[];
  optional?: string[];
}

export const envConfig: EnvConfig = {
  required: [
    // Appwrite
    "NEXT_PUBLIC_ENDPOINT",
    "PROJECT_ID",
    "API_KEY",
    "DATABASE_ID",
    "PATIENT_COLLECTION_ID",
    "APPOINTMENT_COLLECTION_ID",
    "BRANCHES_COLLECTION_ID",
    "NEXT_PUBLIC_BUCKET_ID",
    
    // Admin
    "NEXT_PUBLIC_ADMIN_PASSKEY",
  ],
  optional: [
    // Twilio (SMS)
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_PHONE_NUMBER",
    
    // Sentry
    "SENTRY_DSN",
    
    // Cron
    "CRON_SECRET",
    
    // Analytics
    "NEXT_PUBLIC_GA_MEASUREMENT_ID",
  ],
};

export interface EnvValidationResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

export function validateEnv(): EnvValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];
  
  // Check required vars
  for (const key of envConfig.required) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }
  
  // Check optional vars (warning only)
  for (const key of envConfig.optional || []) {
    if (!process.env[key]) {
      warnings.push(key);
    }
  }
  
  // Special validation for Twilio (only warn if missing, don't break build)
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    warnings.push("SMS notifications will be disabled - Twilio credentials incomplete");
  }
  
  // Special validation for Sentry
  if (!process.env.SENTRY_DSN && process.env.NODE_ENV === "production") {
    warnings.push("Sentry error tracking will be disabled - SENTRY_DSN missing");
  }
  
  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:", missing.join(", "));
  }
  
  if (warnings.length > 0) {
    console.warn("⚠️ Optional/variable environment issues:", warnings.join(", "));
  }
  
  return {
    valid: missing.length === 0,
    missing,
    warnings,
  };
}

// Auto-run validation in production (non-browser environment)
if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
  const { valid, missing, warnings } = validateEnv();
  if (!valid) {
    console.error(`Build failed: Missing required env vars: ${missing.join(", ")}`);
    // Don't throw in production to allow build to complete, but log heavily
    if (process.env.CI) {
      throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }
  }
  if (warnings.length > 0) {
    console.warn("Build warning(s):", warnings.join(", "));
  }
}

export default validateEnv;