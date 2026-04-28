// ===== FILE: app/admin/layout.tsx =====
import { redirect } from "next/navigation";
import { checkAdminAuth } from "./actions";

export const dynamic = "force-dynamic";

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