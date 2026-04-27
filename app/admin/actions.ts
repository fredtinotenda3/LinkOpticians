// ===== FILE: app/admin/actions.ts (CREATE NEW) =====
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_PASSKEY = process.env.NEXT_PUBLIC_ADMIN_PASSKEY || "default123";

export async function verifyAdminPasskey(formData: FormData) {
  const passkey = formData.get("passkey") as string;
  
  if (passkey === ADMIN_PASSKEY) {
    const cookieStore = await cookies();
    cookieStore.set("admin-auth", "verified", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });
    return { success: true };
  }
  
  return { success: false, error: "Invalid passkey" };
}

export async function checkAdminAuth() {
  const cookieStore = await cookies();
  const auth = cookieStore.get("admin-auth");
  return auth?.value === "verified";
  
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-auth");
  redirect("/");
}