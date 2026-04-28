// ===== FILE: app/admin/layout.tsx =====
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// These are allowed in Server Components
export const dynamic = "force-dynamic";

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin-auth");
  return authCookie?.value === "verified";
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await checkAdminAuth();
  
  if (!isAuthenticated) {
    redirect("/?admin=true");
  }
  
  return <>{children}</>;
}