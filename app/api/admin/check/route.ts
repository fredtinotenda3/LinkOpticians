// ===== FILE: app/api/admin/check/route.ts =====
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get("admin-auth");
    const isAuthenticated = authCookie?.value === "verified";
    
    return NextResponse.json({ 
      authenticated: isAuthenticated,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ 
      authenticated: false,
      error: "Auth check failed"
    }, { status: 500 });
  }
}