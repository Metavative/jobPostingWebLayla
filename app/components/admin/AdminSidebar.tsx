"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/app/assets/images/logo.png";

const items = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "▦" },
  { label: "Jobs", href: "/admin/jobs", icon: "💼" },
  { label: "Add Job", href: "/admin/jobs/new", icon: "+" },
  { label: "Applications", href: "/admin/applications", icon: "📄" },
  { label: "Enquiries", href: "/admin/enquiries", icon: "✉" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sep_admin_sidebar">
      <Link href="/admin/dashboard" className="sep_admin_brand">
        <Image src={logo} alt="SEP" width={110} height={70} priority />
        <span>Admin Panel</span>
      </Link>

      <nav className="sep_admin_nav">
        {items.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sep_admin_nav_link ${isActive ? "active" : ""}`}
            >
              <span className="sep_admin_nav_icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sep_admin_sidebar_footer">
        <strong>SEP PROFESSIONAL</strong>
        <span>Recruitment workspace</span>
      </div>
    </aside>
  );
}