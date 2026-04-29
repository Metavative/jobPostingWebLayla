"use client";

import Link from "next/link";
import AdminRouteGuard from "@/app/components/admin/AdminRouteGuard";
import { useEffect, useState } from "react";

type ActivityItem = {
  id: string;
  text: string;
  createdAt: string;
};

type DashboardData = {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  approvedApplications: number;
  totalEnquiries: number;
  totalUsers: number;
  totalSavedJobs: number;
  newApplicationsToday: number;
  latestActivity: ActivityItem[];
};

const statCards = [
  {
    key: "activeJobs",
    label: "Active Jobs",
    icon: "💼",
  },
  {
    key: "totalApplications",
    label: "Applications",
    icon: "📄",
  },
  {
    key: "approvedApplications",
    label: "Approved",
    icon: "✓",
  },
  {
    key: "totalUsers",
    label: "Users",
    icon: "👤",
  },
  {
    key: "totalSavedJobs",
    label: "Saved Jobs",
    icon: "★",
  },
  {
    key: "totalEnquiries",
    label: "Enquiries",
    icon: "✉",
  },
  {
    key: "newApplicationsToday",
    label: "New Today",
    icon: "↗",
  },
  {
    key: "totalJobs",
    label: "Total Jobs",
    icon: "▦",
  },
] as const;

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchDashboard = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/dashboard", {
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Failed to fetch dashboard");
        return;
      }

      setData(result.data);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while loading dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <AdminRouteGuard>
      <main className="admin_dash_page">
        <div className="admin_dash_head">
          <div>
            <span>Dashboard</span>
            <h1>Welcome back, Admin</h1>
            <p>Track jobs, applications, users, enquiries, and latest activity.</p>
          </div>

          <button type="button" onClick={fetchDashboard}>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="admin_dash_state">
            <h3>Loading dashboard...</h3>
            <p>Please wait while we load the latest stats.</p>
          </div>
        ) : message ? (
          <div className="admin_dash_state">
            <h3>Dashboard error</h3>
            <p>{message}</p>
          </div>
        ) : data ? (
          <>
            <section className="admin_dash_stats_grid">
              {statCards.map((card) => (
                <div className="admin_dash_stat_card" key={card.key}>
                  <div className="admin_dash_stat_icon">{card.icon}</div>

                  <div>
                    <h3>{data[card.key]}</h3>
                    <p>{card.label}</p>
                  </div>
                </div>
              ))}
            </section>

            <section className="admin_dash_main_grid">
              <div className="admin_dash_panel">
                <div className="admin_dash_panel_head">
                  <div>
                    <h2>Latest Activity</h2>
                    <p>Recent applications and enquiries</p>
                  </div>
                </div>

                <div className="admin_dash_activity_list">
                  {data.latestActivity.length === 0 ? (
                    <div className="admin_dash_empty">
                      <h3>No activity yet</h3>
                      <p>New activity will appear here.</p>
                    </div>
                  ) : (
                    data.latestActivity.map((item) => (
                      <div className="admin_dash_activity_item" key={item.id}>
                        <span></span>

                        <div>
                          <p>{item.text}</p>
                          <small>
                            {new Date(item.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="admin_dash_panel">
                <div className="admin_dash_panel_head">
                  <div>
                    <h2>Quick Actions</h2>
                    <p>Manage the main admin tasks</p>
                  </div>
                </div>

                <div className="admin_dash_actions">
                  <Link href="/admin/jobs/new">Add New Job</Link>
                  <Link href="/admin/jobs">Manage Jobs</Link>
                  <Link href="/admin/applications">View Applications</Link>
                  <Link href="/admin/enquiries">View Enquiries</Link>
                </div>

                <div className="admin_dash_summary">
                  <div>
                    <strong>{data.approvedApplications}</strong>
                    <span>Approved applications</span>
                  </div>

                  <div>
                    <strong>{data.totalSavedJobs}</strong>
                    <span>Total saved jobs</span>
                  </div>

                  <div>
                    <strong>{data.totalUsers}</strong>
                    <span>Registered users</span>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : null}
      </main>
    </AdminRouteGuard>
  );
}