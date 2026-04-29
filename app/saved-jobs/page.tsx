"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SavedItem = {
  id: string;
  createdAt: string;
  job: {
    id: string;
    title: string;
    slug: string;
    category: string | null;
    location: string;
    employmentType: string;
    salary: string | null;
    shortDescription: string | null;
  };
};

export default function SavedJobsPage() {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchSavedJobs = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/user/saved-jobs", {
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage("Please login to view your saved jobs.");
        return;
      }

      setItems(result.data || []);
    } catch {
      setMessage("Something went wrong while loading saved jobs.");
    } finally {
      setLoading(false);
    }
  };

  const removeSavedJob = async (jobId: string) => {
    try {
      const response = await fetch("/api/user/saved-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ jobId }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to remove saved job");
        return;
      }

      setItems((prev) => prev.filter((item) => item.job.id !== jobId));
    } catch {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  return (
    <main className="applied_page">
      <section className="applied_hero">
        <div className="applied_container">
          <h1>Saved Jobs</h1>
          <p>Manage and review jobs you have saved.</p>
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
              <div className="applied_empty_icon">★</div>
              <h3>No saved jobs yet</h3>
              <p>Browse jobs and save roles you want to review later.</p>
              <Link href="/jobs">Browse Jobs</Link>
            </div>
          ) : (
            <div className="applied_grid">
              {items.map((item) => (
                <div className="applied_card" key={item.id}>
                  <div className="applied_card_head">
                    <Link
                      href={`/jobs/${item.job.slug}`}
                      className="applied_logo"
                    >
                      {item.job.title.charAt(0)}
                    </Link>

                    <span className="admin_status_badge">
                      Saved
                    </span>
                  </div>

                  <h3>
                    <Link href={`/jobs/${item.job.slug}`}>
                      {item.job.title}
                    </Link>
                  </h3>

                  <p className="applied_company">
                    {item.job.shortDescription ||
                      "Open role available now"}
                  </p>

                  <div className="applied_tags">
                    <span>{item.job.employmentType}</span>
                    <span>{item.job.location}</span>
                    <span>
                      {item.job.salary || "Salary not specified"}
                    </span>
                  </div>

                  <div className="applied_actions">
                    <Link href={`/jobs/${item.job.slug}`}>
                      View Job
                    </Link>

                    <button
                      type="button"
                      className="saved_remove_btn"
                      onClick={() => removeSavedJob(item.job.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}