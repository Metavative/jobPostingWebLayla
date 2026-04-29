"use client";

import AdminRouteGuard from "@/app/components/admin/AdminRouteGuard";
import { useEffect, useMemo, useState } from "react";

type ApplicationItem = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  portfolioUrl: string | null;
  message: string | null;
  cvFileUrl: string | null;
  cvOriginalName: string | null;
  status: string;
  createdAt: string;
  job: {
    id: string;
    title: string;
    location: string;
    employmentType: string;
  };
};

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationItem | null>(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchApplications = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/applications", {
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Failed to fetch applications");
        return;
      }

      setApplications(result.data || []);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while loading applications");
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = useMemo(() => {
    return applications.filter((item) => {
      const value = search.toLowerCase();

      const matchesSearch =
        item.fullName.toLowerCase().includes(value) ||
        item.email.toLowerCase().includes(value) ||
        (item.phone || "").toLowerCase().includes(value) ||
        (item.job?.title || "").toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "ALL" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const handleStatusUpdate = async (
    id: string,
    status: "REVIEWED" | "SHORTLISTED" | "APPROVED" | "REJECTED"
  ) => {
    try {
      const response = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to update status");
        return;
      }

      setApplications((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status } : item))
      );

      setSelectedApplication((prev) =>
        prev && prev.id === id ? { ...prev, status } : prev
      );
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const handleDeleteApplication = async (id: string) => {
    const confirmed = window.confirm("Delete this application permanently?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/applications/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to delete application");
        return;
      }

      setApplications((prev) => prev.filter((item) => item.id !== id));

      setSelectedApplication((prev) => {
        if (prev && prev.id === id) return null;
        return prev;
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const getStatusClass = (status: string) => {
    if (status === "APPROVED") return "approved";
    if (status === "REJECTED") return "rejected";
    if (status === "SHORTLISTED") return "shortlisted";
    if (status === "REVIEWED") return "reviewed";
    return "pending";
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <AdminRouteGuard>
      <main className="admin_apps_page">
        <div className="admin_apps_head">
          <div>
            <span>Applications</span>
            <h1>Candidate submissions</h1>
            <p>Review applicants, open CVs, update status, and manage records.</p>
          </div>

          <button type="button" onClick={fetchApplications}>
            Refresh
          </button>
        </div>

        <div className="admin_apps_filters">
          <input
            type="text"
            placeholder="Search by name, email, phone, or job"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="REVIEWED">Reviewed</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>

        {loading ? (
          <div className="admin_apps_state">
            <h3>Loading applications...</h3>
            <p>Please wait while we load candidate submissions.</p>
          </div>
        ) : message ? (
          <div className="admin_apps_state">
            <h3>Unable to load applications</h3>
            <p>{message}</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="admin_apps_state">
            <h3>No applications found</h3>
            <p>Try changing your search or filter values.</p>
          </div>
        ) : (
          <div className="admin_apps_grid">
            {filteredApplications.map((item) => (
              <div className="admin_app_card" key={item.id}>
                <div className="admin_app_card_top">
                  <div className="admin_app_avatar">
                    {item.fullName.charAt(0)}
                  </div>

                  <span
                    className={`admin_app_status ${getStatusClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3>{item.fullName}</h3>
                <p className="admin_app_email">{item.email}</p>

                <div className="admin_app_job_box">
                  <strong>{item.job?.title || "Job removed"}</strong>
                  <span>{item.job?.location || "No location"}</span>
                  <span>{item.job?.employmentType || "No type"}</span>
                </div>

                <div className="admin_app_meta">
                  <div>
                    <span>Phone</span>
                    <strong>{item.phone || "Not provided"}</strong>
                  </div>

                  <div>
                    <span>Applied</span>
                    <strong>
                      {new Date(item.createdAt).toLocaleDateString()}
                    </strong>
                  </div>
                </div>

                <div className="admin_app_actions">
                  <button
                    type="button"
                    onClick={() => setSelectedApplication(item)}
                  >
                    View Details
                  </button>

                  {item.cvFileUrl ? (
                    <a href={item.cvFileUrl} target="_blank" rel="noreferrer">
                      View CV
                    </a>
                  ) : (
                    <button type="button" disabled>
                      No CV
                    </button>
                  )}

                  <button
                    type="button"
                    className="danger"
                    onClick={() => handleDeleteApplication(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedApplication ? (
          <div
            className="admin_app_modal_overlay"
            onClick={() => setSelectedApplication(null)}
          >
            <div
              className="admin_app_modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin_app_modal_head">
                <div>
                  <span>Application Details</span>
                  <h2>{selectedApplication.fullName}</h2>
                  <p>{selectedApplication.email}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedApplication(null)}
                >
                  ×
                </button>
              </div>

              <div className="admin_app_modal_grid">
                <div>
                  <span>Phone</span>
                  <strong>{selectedApplication.phone || "Not provided"}</strong>
                </div>

                <div>
                  <span>Job</span>
                  <strong>
                    {selectedApplication.job?.title || "Job removed"}
                  </strong>
                </div>

                <div>
                  <span>Status</span>
                  <strong>{selectedApplication.status}</strong>
                </div>

                <div>
                  <span>Location</span>
                  <strong>
                    {selectedApplication.job?.location || "No location"}
                  </strong>
                </div>

                <div>
                  <span>Type</span>
                  <strong>
                    {selectedApplication.job?.employmentType || "No type"}
                  </strong>
                </div>

                <div>
                  <span>Applied On</span>
                  <strong>
                    {new Date(selectedApplication.createdAt).toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="admin_app_message">
                <h3>Candidate Message</h3>
                <p>{selectedApplication.message || "No message provided."}</p>
              </div>

              <div className="admin_app_modal_actions">
                {selectedApplication.cvFileUrl ? (
                  <a
                    href={selectedApplication.cvFileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="primary"
                  >
                    View CV
                  </a>
                ) : null}

                {selectedApplication.portfolioUrl &&
                selectedApplication.portfolioUrl.trim() !== "" ? (
                  <a
                    href={selectedApplication.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Portfolio
                  </a>
                ) : null}

                <button
                  type="button"
                  onClick={() =>
                    handleStatusUpdate(selectedApplication.id, "REVIEWED")
                  }
                >
                  Reviewed
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleStatusUpdate(selectedApplication.id, "SHORTLISTED")
                  }
                >
                  Shortlist
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleStatusUpdate(selectedApplication.id, "APPROVED")
                  }
                >
                  Approve
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleStatusUpdate(selectedApplication.id, "REJECTED")
                  }
                >
                  Reject
                </button>

                <button
                  type="button"
                  className="danger"
                  onClick={() =>
                    handleDeleteApplication(selectedApplication.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </AdminRouteGuard>
  );
}