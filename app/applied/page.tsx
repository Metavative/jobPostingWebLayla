"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type AppliedItem = {
  id: string;
  status: string;
  createdAt: string;
  job: {
    id: string;
    title: string;
    slug: string;
    companyName?: string | null;
    location: string;
    employmentType: string;
    salary: string | null;
    category?: string | null;
  };
};

function getStatusLabel(status: string) {
  if (status === "APPROVED") return "Approved";
  if (status === "REJECTED") return "Rejected";
  if (status === "SHORTLISTED") return "Shortlisted";
  if (status === "REVIEWED") return "Reviewed";
  return "Pending";
}

function getStatusClass(status: string) {
  if (status === "APPROVED") return "admin_status_badge_approved";
  if (status === "REJECTED") return "admin_status_badge_expired";
  if (status === "SHORTLISTED") return "admin_status_badge_shortlisted";
  if (status === "REVIEWED") return "admin_status_badge_reviewed";
  return "admin_status_badge_draft";
}

export default function AppliedPage() {
  const [items, setItems] = useState<AppliedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchApplied = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/user/applied", {
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage("Please login to view your applied jobs.");
        return;
      }

      setItems(result.data || []);
    } catch {
      setMessage("Something went wrong while loading applied jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplied();
  }, []);

  return (
    <main className="applied_page">
      <section className="applied_hero">
        <div className="applied_container">
          <h1>Applied Jobs</h1>
          <p>Track the jobs you have applied for from your account.</p>
        </div>
      </section>

      <section className="applied_content">
        <div className="applied_container">
          {loading ? (
            <div className="applied_grid">
              <div className="find_job_skeleton"></div>
              <div className="find_job_skeleton"></div>
              <div className="find_job_skeleton"></div>
            </div>
          ) : message ? (
            <div className="applied_empty">
              <h3>Login required</h3>
              <p>{message}</p>
              <Link href="/login?tab=user">Sign In</Link>
            </div>
          ) : items.length === 0 ? (
            <div className="applied_empty">
              <div className="applied_empty_icon">✓</div>
              <h3>No applications yet</h3>
              <p>Apply for a job and it will appear here.</p>
              <Link href="/jobs">Browse Jobs</Link>
            </div>
          ) : (
            <>
              <div className="applied_topbar">
                <p>
                  Showing {items.length} applied{" "}
                  {items.length === 1 ? "job" : "jobs"}
                </p>

                <button type="button" onClick={fetchApplied}>
                  Refresh
                </button>
              </div>

              <div className="applied_grid">
                {items.map((item) => (
                  <div className="applied_card" key={item.id}>
                    <div className="applied_card_head">
                      <Link
                        href={`/jobs/${item.job.slug}`}
                        className="applied_logo"
                      >
                        {(item.job.companyName || item.job.title).charAt(0)}
                      </Link>

                      <span
                        className={`admin_status_badge ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </div>

                    <h3>
                      <Link href={`/jobs/${item.job.slug}`}>
                        {item.job.title}
                      </Link>
                    </h3>

                    <p className="applied_company">
                      by{" "}
                      <strong>{item.job.companyName || "Company"}</strong>
                      {item.job.category ? ` in ${item.job.category}` : ""}
                    </p>

                    <div className="applied_tags">
                      <span>{item.job.employmentType}</span>
                      <span>{item.job.location}</span>
                      <span>{item.job.salary || "Salary not specified"}</span>
                    </div>

                    <p className="applied_date">
                      Applied on{" "}
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>

                    <div className="applied_actions">
                      <Link href={`/jobs/${item.job.slug}`}>View Job</Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}