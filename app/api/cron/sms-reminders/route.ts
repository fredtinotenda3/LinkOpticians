// ===== FILE: app/api/cron/sms-reminders/route.ts (CREATE NEW) =====
import { NextResponse } from "next/server";
import { process24HourReminders } from "@/lib/scheduler/sms-scheduler";

// This endpoint should be protected with a secret key
const CRON_SECRET = process.env.CRON_SECRET || "your-secret-key-here";

export async function GET(request: Request) {
  // Verify cron job secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const results = await process24HourReminders();
    
    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}