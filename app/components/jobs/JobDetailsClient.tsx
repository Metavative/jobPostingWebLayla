"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type JobData = {
  id: string;
  title: string;
  slug: string;
  companyName: string | null;
  category: string | null;
  location: string;
  employmentType: string;
  salary: string | null;
  shortDescription: string | null;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  status?: string;
  createdAt?: string | Date;
};

function toList(value: string | null) {
  if (!value) return [];

  return value
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function JobDetailsClient({ job }: { job: JobData }) {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("No file selected");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");

  const responsibilities = toList(job.responsibilities);
  const requirements = toList(job.requirements);

  const checkAppliedStatus = async () => {
    try {
      const response = await fetch(`/api/user/applications/job/${job.id}`, {
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();
      setAlreadyApplied(Boolean(result.applied));
    } catch {
      setAlreadyApplied(false);
    }
  };

  const checkSavedStatus = async () => {
    try {
      const response = await fetch("/api/user/saved-jobs", {
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (response.ok) {
        const exists = (result.data || []).some(
          (item: { job: { id: string } }) => item.job.id === job.id
        );

        setSaved(exists);
      }
    } catch {
      setSaved(false);
    }
  };

  useEffect(() => {
    checkAppliedStatus();
    checkSavedStatus();
  }, [job.id]);

  const toggleSave = async () => {
    try {
      const response = await fetch("/api/user/saved-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ jobId: job.id }),
      });

      const result = await response.json();

      if (!response.ok) {
        setNotice(result.message || "Please login before saving a job");
        return;
      }

      setSaved(Boolean(result.saved));
      setNotice(result.message || "Saved status updated");
    } catch {
      setNotice("Something went wrong");
    }

    setTimeout(() => setNotice(""), 1800);
  };

  const closeApplyModal = () => {
    setIsApplyOpen(false);
    setSubmitted(false);
    setIsSubmitting(false);
    setApiMessage("");
    setSelectedFileName("No file selected");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFileName(file ? file.name : "No file selected");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiMessage("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      formData.append("jobId", job.id);

      const response = await fetch("/api/applications", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setApiMessage(result.message || "Failed to submit application");
        return;
      }

      setAlreadyApplied(true);
      setSubmitted(true);
      setApiMessage(result.message || "Application submitted successfully");
      form.reset();
      setSelectedFileName("No file selected");
    } catch (error) {
      console.error("Application submit error:", error);
      setApiMessage("Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="jd_page">
        {notice ? <div className="find_jobs_toast">{notice}</div> : null}

        <section className="jd_hero">
          <div className="jd_container">
            <div className="jd_breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/jobs">Jobs</Link>
              <span>/</span>
              <strong>Details</strong>
            </div>

            <div className="jd_hero_card">
              <div className="jd_company_logo">
                {(job.companyName || job.title).charAt(0)}
              </div>

              <div className="jd_hero_content">
                <span className="jd_job_type">{job.employmentType}</span>

                <h1>{job.title}</h1>

                <div className="jd_meta_row">
                  <span>{job.companyName || "Company"}</span>
                  <span>{job.location}</span>
                  <span>{job.salary || "Salary not specified"}</span>
                </div>
              </div>

              <div className="jd_hero_actions">
                <button
                  type="button"
                  className={`jd_save_btn ${saved ? "is_saved" : ""}`}
                  onClick={toggleSave}
                >
                  {saved ? "Saved" : "Save Job"}
                </button>

                <button
                  type="button"
                  className={`jd_apply_btn ${
                    alreadyApplied ? "applied_btn" : ""
                  }`}
                  disabled={alreadyApplied}
                  onClick={() => {
                    if (!alreadyApplied) setIsApplyOpen(true);
                  }}
                >
                  {alreadyApplied ? "Applied" : "Apply Now"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="jd_body_section">
          <div className="jd_container jd_layout">
            <div className="jd_main">
              <div className="jd_content_card">
                <h2>Job Description</h2>
                <p>{job.description}</p>
              </div>

              {responsibilities.length > 0 ? (
                <div className="jd_content_card">
                  <h2>Responsibilities</h2>
                  <ul>
                    {responsibilities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {requirements.length > 0 ? (
                <div className="jd_content_card">
                  <h2>Requirements</h2>
                  <ul>
                    {requirements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <aside className="jd_sidebar">
              <div className="jd_side_card">
                <h3>Job Overview</h3>

                <div className="jd_overview_item">
                  <span>Company</span>
                  <strong>{job.companyName || "Company"}</strong>
                </div>

                <div className="jd_overview_item">
                  <span>Category</span>
                  <strong>{job.category || "General"}</strong>
                </div>

                <div className="jd_overview_item">
                  <span>Location</span>
                  <strong>{job.location}</strong>
                </div>

                <div className="jd_overview_item">
                  <span>Job Type</span>
                  <strong>{job.employmentType}</strong>
                </div>

                <div className="jd_overview_item">
                  <span>Salary</span>
                  <strong>{job.salary || "Not specified"}</strong>
                </div>

                <button
                  type="button"
                  className={`jd_apply_btn full ${
                    alreadyApplied ? "applied_btn" : ""
                  }`}
                  disabled={alreadyApplied}
                  onClick={() => {
                    if (!alreadyApplied) setIsApplyOpen(true);
                  }}
                >
                  {alreadyApplied ? "Applied" : "Apply Now"}
                </button>

                <Link href="/jobs" className="jd_back_btn">
                  Back to Jobs
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {isApplyOpen ? (
        <div className="apply_modal_overlay" onClick={closeApplyModal}>
          <div
            className="apply_modal_box polished_card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="apply_modal_head">
              <div>
                <span className="section_eyebrow">Job Application</span>
                <h2>Apply for {job.title}</h2>
              </div>

              <button
                type="button"
                className="apply_modal_close"
                onClick={closeApplyModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {!submitted ? (
              <form className="apply_form" onSubmit={handleSubmit}>
                <div className="apply_form_grid">
                  <div className="apply_form_field">
                    <label>Full Name</label>
                    <input
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="apply_form_field">
                    <label>Email Address</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="apply_form_field">
                    <label>Phone Number</label>
                    <input
                      name="phone"
                      type="text"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="apply_form_field">
                    <label>Portfolio or LinkedIn</label>
                    <input
                      name="portfolioUrl"
                      type="text"
                      placeholder="Paste profile link"
                    />
                  </div>

                  <div className="apply_form_field apply_form_field_full">
                    <label>Message</label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Write a short message"
                    />
                  </div>

                  <div className="apply_form_field apply_form_field_full">
                    <label>Upload CV</label>

                    <label className="cv_upload_box">
                      <input
                        name="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />

                      <span className="cv_upload_btn">Choose CV</span>
                      <span className="cv_upload_name">{selectedFileName}</span>
                    </label>
                  </div>
                </div>

                {apiMessage ? (
                  <p className="admin_form_message">{apiMessage}</p>
                ) : null}

                <div className="apply_form_actions">
                  <button
                    type="submit"
                    className="job_apply_btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </button>

                  <button
                    type="button"
                    className="job_save_btn"
                    onClick={closeApplyModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="apply_success_box">
                <div className="apply_success_icon">✓</div>
                <h3>Application submitted</h3>
                <p>{apiMessage || "Your application was submitted."}</p>

                <button
                  type="button"
                  className="job_apply_btn"
                  onClick={closeApplyModal}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}