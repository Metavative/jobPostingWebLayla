"use client";

import AdminRouteGuard from "@/app/components/admin/AdminRouteGuard";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type JobItem = {
  id: string;
  title: string;
  companyName?: string | null;
  location: string;
  employmentType: string;
  status: string;
  category: string | null;
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchJobs = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/jobs", {
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Failed to fetch jobs");
        return;
      }

      setJobs(result.data || []);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while loading jobs");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const value = search.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(value) ||
        job.location.toLowerCase().includes(value) ||
        job.employmentType.toLowerCase().includes(value) ||
        (job.companyName || "").toLowerCase().includes(value) ||
        (job.category || "").toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "ALL" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, search, statusFilter]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this job permanently?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/jobs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Delete failed");
        return;
      }

      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleExpire = async (id: string) => {
    const confirmed = window.confirm("Mark this job as expired?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/jobs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          status: "EXPIRED",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Expire failed");
        return;
      }

      setJobs((prev) =>
        prev.map((job) =>
          job.id === id ? { ...job, status: "EXPIRED" } : job
        )
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const getStatusClass = (status: string) => {
    if (status === "EXPIRED") return "expired";
    if (status === "DRAFT") return "draft";
    return "active";
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <AdminRouteGuard>
      <main className="admin_jobs_page">
        <div className="admin_jobs_head">
          <div>
            <span>Jobs</span>
            <h1>Manage job listings</h1>
            <p>Create, edit, expire, and remove job posts from one place.</p>
          </div>

          <Link href="/admin/jobs/new">Add New Job</Link>
        </div>

        <div className="admin_jobs_filters">
          <input
            type="text"
            placeholder="Search by title, company, location, type, or category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="DRAFT">Draft</option>
            <option value="EXPIRED">Expired</option>
          </select>

          <button type="button" onClick={fetchJobs}>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="admin_jobs_state">
            <h3>Loading jobs...</h3>
            <p>Please wait while we load your job listings.</p>
          </div>
        ) : message ? (
          <div className="admin_jobs_state">
            <h3>Unable to load jobs</h3>
            <p>{message}</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="admin_jobs_state">
            <h3>No jobs found</h3>
            <p>Try changing your search or filter values.</p>
          </div>
        ) : (
          <div className="admin_jobs_grid">
            {filteredJobs.map((job) => (
              <div className="admin_job_card" key={job.id}>
                <div className="admin_job_card_top">
                  <div className="admin_job_logo">
                    {(job.companyName || job.title).charAt(0)}
                  </div>

                  <span
                    className={`admin_job_status ${getStatusClass(job.status)}`}
                  >
                    {job.status}
                  </span>
                </div>

                <h3>{job.title}</h3>

                <p className="admin_job_company">
                  {job.companyName || "Company"}{" "}
                  {job.category ? `in ${job.category}` : ""}
                </p>

                <div className="admin_job_meta">
                  <span>{job.location}</span>
                  <span>{job.employmentType}</span>
                </div>

                <div className="admin_job_actions">
                  <Link href={`/admin/jobs/edit/${job.id}`}>Edit</Link>

                  <button type="button" onClick={() => handleExpire(job.id)}>
                    Expire
                  </button>

                  <button
                    type="button"
                    className="danger"
                    onClick={() => handleDelete(job.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </AdminRouteGuard>
  );
}