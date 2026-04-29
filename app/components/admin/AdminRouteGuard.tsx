"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminRouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/admin/me", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          router.replace("/admin/login");
          return;
        }

        setAllowed(true);
      } catch (error) {
        console.error(error);
        router.replace("/admin/login");
      } finally {
        setChecking(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (checking) {
    return (
      <div className="admin_loading_screen">
        <div className="admin_loading_card polished_card">
          <h3>Checking access...</h3>
          <p>Please wait</p>
        </div>
      </div>
    );
  }

  if (!allowed) return null;

  return <>{children}</>;
}