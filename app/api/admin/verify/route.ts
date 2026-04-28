// ===== FILE: app/api/admin/verify/route.ts (CREATE NEW) =====
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSKEY = process.env.NEXT_PUBLIC_ADMIN_PASSKEY || process.env.ADMIN_PASSKEY || "default123";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { passkey } = body;
    
    if (!passkey) {
      return NextResponse.json({ 
        success: false, 
        error: "Passkey is required" 
      }, { status: 400 });
    }
    
    if (passkey === ADMIN_PASSKEY) {
      const cookieStore = await cookies();
      cookieStore.set("admin-auth", "verified", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: "Invalid passkey" 
    }, { status: 401 });
    
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Internal server error" 
    }, { status: 500 });
  }
}