"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminHeader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sep_admin_header">
      <div className="sep_admin_header_left">
        <span>Admin Workspace</span>
        <h1>Manage recruitment platform</h1>
      </div>

      <div className="sep_admin_header_right">
        <div className="sep_admin_profile">
          <div className="sep_admin_avatar">A</div>

          <div>
            <strong>Admin</strong>
            <small>Secure Session</small>
          </div>
        </div>

        <button type="button" onClick={handleLogout} disabled={loading}>
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </header>
  );
}