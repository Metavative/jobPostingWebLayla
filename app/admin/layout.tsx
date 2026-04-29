"use client";

import { usePathname } from "next/navigation";
import AdminHeader from "@/app/components/admin/AdminHeader";
import AdminSidebar from "@/app/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="admin_shell">
      <AdminSidebar />

      <div className="admin_main_area">
        <AdminHeader />
        <div className="admin_page_content">{children}</div>
      </div>
    </div>
  );
}