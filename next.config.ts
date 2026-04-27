// ===== FILE: next.config.ts (UPDATED with env validation) =====

import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Images configuration for remote sources
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    // Add fallback for broken images
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

// Environment validation for production builds
const validateEnv = () => {
  const required = [
    "NEXT_PUBLIC_ENDPOINT",
    "PROJECT_ID",
    "API_KEY",
    "DATABASE_ID",
    "PATIENT_COLLECTION_ID",
    "APPOINTMENT_COLLECTION_ID",
    "BRANCHES_COLLECTION_ID",
    "NEXT_PUBLIC_BUCKET_ID",
    "NEXT_PUBLIC_ADMIN_PASSKEY",
  ];
  
  const optional = [
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_PHONE_NUMBER",
    "SENTRY_DSN",
    "CRON_SECRET",
    "NEXT_PUBLIC_GA_MEASUREMENT_ID",
  ];
  
  const missing = required.filter(key => !process.env[key]);
  const missingOptional = optional.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error("❌ Missing required environment variables:", missing.join(", "));
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Build failed: Missing required env vars: ${missing.join(", ")}`);
    }
  }
  
  if (missingOptional.length > 0) {
    console.warn("⚠️ Optional environment variables missing:", missingOptional.join(", "));
  }
  
  // Special warning for Twilio (SMS will be disabled)
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.warn("⚠️ SMS notifications will be disabled - Twilio credentials missing");
  }
  
  return { missing, missingOptional };
};

// Run validation in production builds
if (process.env.NODE_ENV === "production") {
  validateEnv();
}

// Sentry configuration
export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "stanleyverse",
  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});