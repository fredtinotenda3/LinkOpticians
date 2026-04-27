// ===== FILE: app/api/admin/check/route.ts 
import { NextResponse } from "next/server";
import { checkAdminAuth } from "@/app/admin/actions";

export async function GET() {
  const isAuthenticated = await checkAdminAuth();
  return NextResponse.json({ authenticated: isAuthenticated });
}