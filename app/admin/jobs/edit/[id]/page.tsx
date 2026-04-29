"use client";

import Link from "next/link";
import AdminRouteGuard from "@/app/components/admin/AdminRouteGuard";
import { useEffect, useState } from "react";

type JobData = {
  id: string;
  title: string;
  category: string | null;
  location: string;
  employmentType: string;
  salary: string | null;
  shortDescription: string | null;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  status: string;
  companyName: string | null;
};

export default function AdminEditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [jobId, setJobId] = useState("");
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadParams = async () => {
      const resolved = await params;
      setJobId(resolved.id);
    };

    loadParams();
  }, [params]);

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) return;

      setLoading(true);
      setMessage("");

      try {
        const response = await fetch(`/api/admin/jobs/${jobId}`, {
          credentials: "include",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          setMessage(result.message || "Failed to load job");
          return;
        }

        const job: JobData = result.data;

        setTitle(job.title || "");
        setCompanyName(job.companyName || "");
        setCategory(job.category || "");
        setLocation(job.location || "");
        setEmploymentType(job.employmentType || "Full Time");
        setSalary(job.salary || "");
        setStatus(job.status || "ACTIVE");
        setShortDescription(job.shortDescription || "");
        setDescription(job.description || "");
        setResponsibilities(job.responsibilities || "");
        setRequirements(job.requirements || "");
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong while loading this job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/jobs/${jobId}`, {
        method: "PATCH",
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
          status,
          shortDescription,
          description,
          responsibilities,
          requirements,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Failed to update job");
        return;
      }

      setMessage("Job updated successfully");
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while updating this job");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminRouteGuard>
      <main className="admin_job_form_page">
        <div className="admin_job_form_head">
          <div>
            <span>Edit Job</span>
            <h1>Update job listing</h1>
            <p>Edit job details, company information, status, and requirements.</p>
          </div>

          <Link href="/admin/jobs">Back to Jobs</Link>
        </div>

        {loading ? (
          <div className="admin_jobs_state">
            <h3>Loading job...</h3>
            <p>Please wait while we load this job listing.</p>
          </div>
        ) : (
          <form className="admin_job_form_card" onSubmit={handleSubmit}>
            <div className="admin_job_form_section">
              <div className="admin_job_form_section_head">
                <h2>Basic Information</h2>
                <p>Main details shown on the public job listing.</p>
              </div>

              <div className="admin_job_form_grid">
                <div className="admin_job_field">
                  <label>Job Title</label>
                  <input
                    type="text"
                    placeholder="Example: Senior UI/UX Designer"
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
                    placeholder="Example: London"
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
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
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
                <p>Write clear information for candidates before they apply.</p>
              </div>

              <div className="admin_job_form_grid">
                <div className="admin_job_field full">
                  <label>Short Description</label>
                  <textarea
                    rows={4}
                    placeholder="Short summary shown on cards"
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
              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Update Job"}
              </button>

              <Link href="/admin/jobs">Cancel</Link>
            </div>
          </form>
        )}
      </main>
    </AdminRouteGuard>
  );
}