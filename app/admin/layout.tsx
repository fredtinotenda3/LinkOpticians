// ===== FILE: app/admin/layout.tsx (CREATE NEW or UPDATE) =====
import { redirect } from "next/navigation";
import { checkAdminAuth } from "./actions";

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