"use client";

import Link from "next/link";
import AdminRouteGuard from "@/app/components/admin/AdminRouteGuard";
import { useState } from "react";

export default function AdminNewJobPage() {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("Full Time");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setTitle("");
    setCompanyName("");
    setCategory("");
    setLocation("");
    setEmploymentType("Full Time");
    setSalary("");
    setStatus("ACTIVE");
    setShortDescription("");
    setDescription("");
    setResponsibilities("");
    setRequirements("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    submitStatus?: "ACTIVE" | "DRAFT"
  ) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const finalStatus = submitStatus || status;

      const response = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          companyName,
          category,
          location,
          employmentType,
          salary,
          status: finalStatus,
          shortDescription,
          description,
          responsibilities,
          requirements,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Failed to create job");
        return;
      }

      setMessage(
        finalStatus === "DRAFT"
          ? "Job saved as draft successfully"
          : "Job published successfully"
      );

      resetForm();
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while creating this job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminRouteGuard>
      <main className="admin_job_form_page">
        <div className="admin_job_form_head">
          <div>
            <span>New Job</span>
            <h1>Create job listing</h1>
            <p>Add a new job post with company details, role content, and status.</p>
          </div>

          <Link href="/admin/jobs">Back to Jobs</Link>
        </div>

        <form className="admin_job_form_card" onSubmit={(e) => handleSubmit(e)}>
          <div className="admin_job_form_section">
            <div className="admin_job_form_section_head">
              <h2>Basic Information</h2>
              <p>Main details shown on the public jobs page.</p>
            </div>

            <div className="admin_job_form_grid">
              <div className="admin_job_field">
                <label>Job Title</label>
                <input
                  type="text"
                  placeholder="Example: Senior Product Designer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="admin_job_field">
                <label>Company Name</label>
                <input
                  type="text"
                  placeholder="Example: Metavative"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="admin_job_field">
                <label>Category</label>
                <input
                  type="text"
                  placeholder="Example: Design"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="admin_job_field">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="Example: London, UK"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="admin_job_field">
                <label>Employment Type</label>
                <select
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                >
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>

              <div className="admin_job_field">
                <label>Salary</label>
                <input
                  type="text"
                  placeholder="Example: $4k to $6k"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>

              <div className="admin_job_field">
                <label>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="ACTIVE">Active</option>
                  <option value="DRAFT">Draft</option>
                  <option value="EXPIRED">Expired</option>
                </select>
              </div>
            </div>
          </div>

          <div className="admin_job_form_section">
            <div className="admin_job_form_section_head">
              <h2>Job Content</h2>
              <p>Write clear information candidates will read before applying.</p>
            </div>

            <div className="admin_job_form_grid">
              <div className="admin_job_field full">
                <label>Short Description</label>
                <textarea
                  rows={4}
                  placeholder="Short overview of the role"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="admin_job_field full">
                <label>Full Description</label>
                <textarea
                  rows={7}
                  placeholder="Full job description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="admin_job_field full">
                <label>Responsibilities</label>
                <textarea
                  rows={6}
                  placeholder="Add responsibilities separated by commas or new lines"
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                ></textarea>
              </div>

              <div className="admin_job_field full">
                <label>Requirements</label>
                <textarea
                  rows={6}
                  placeholder="Add requirements separated by commas or new lines"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          {message ? <p className="admin_job_form_message">{message}</p> : null}

          <div className="admin_job_form_actions">
            <button type="submit" disabled={loading}>
              {loading ? "Publishing..." : "Publish Job"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={(e) =>
                handleSubmit(
                  e as unknown as React.FormEvent<HTMLFormElement>,
                  "DRAFT"
                )
              }
            >
              {loading ? "Saving..." : "Save Draft"}
            </button>

            <Link href="/admin/jobs">Cancel</Link>
          </div>
        </form>
      </main>
    </AdminRouteGuard>
  );
}