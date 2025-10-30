import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "LinkOpticians API is running!",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    services: ["Eye", "Care", "Company", "Marketing"],
  });
}
