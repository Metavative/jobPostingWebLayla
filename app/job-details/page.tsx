"use client";

import Link from "next/link";
import { useState } from "react";

const responsibilities = [
  "Create wireframes, flows, and polished UI screens",
  "Collaborate with product, engineering, and marketing teams",
  "Maintain and improve design systems",
  "Translate research insights into strong user experiences",
  "Support product decisions with clear design reasoning",
];

const requirements = [
  "3+ years of product design experience",
  "Strong portfolio of web or app projects",
  "Proficiency in Figma and prototyping tools",
  "Good understanding of UX principles",
  "Clear communication and teamwork skills",
];

const benefits = [
  "Remote flexibility",
  "Private health support",
  "Annual learning budget",
  "Paid holidays",
  "Performance bonus",
];

const suggestedJobs = [
  {
    title: "UI UX Designer",
    company: "Flow Craft",
    href: "/job-details",
  },
  {
    title: "Frontend Developer",
    company: "Nova Stack",
    href: "/job-details",
  },
  {
    title: "Product Designer",
    company: "Pixel Forge Studio",
    href: "/job-details",
  },
];

export default function JobDetailsPage() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("No file selected");
  const [submitted, setSubmitted] = useState(false);

  const openApplyModal = () => {
    setIsApplyOpen(true);
    setSubmitted(false);
  };

  const closeApplyModal = () => {
    setIsApplyOpen(false);
    setSubmitted(false);
    setSelectedFileName("No file selected");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFileName(file ? file.name : "No file selected");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="job_details_section premium_detail_section">
        <div className="container">
          <div className="page_heading_block">
            <span className="section_eyebrow">Job Details</span>
            <h1>Senior Product Designer</h1>
            <p>Pixel Forge Studio, London, UK, Full Time, $4k to $6k</p>
          </div>

          <div className="job_details_layout premium_details_layout">
            <div className="job_details_main">
              <div className="job_hero_info_card polished_card">
                <div className="job_hero_info_top">
                  <div className="job_company_icon xl">P</div>

                  <div className="job_hero_info_text">
                    <div className="jobs_result_title_row">
                      <h2>Senior Product Designer</h2>
                      <span className="featured_badge">Featured</span>
                      <span className="easy_badge">Easy Apply</span>
                    </div>

                    <p>
                      <Link href="/company-details">Pixel Forge Studio</Link>
                    </p>

                    <div className="job_meta_row">
                      <span>London, UK</span>
                      <span>Full Time</span>
                      <span>$4k to $6k</span>
                      <span>2 days ago</span>
                    </div>
                  </div>
                </div>

                <div className="job_detail_quick_stats">
                  <div className="job_detail_stat_box">
                    <strong>24</strong>
                    <span>Applicants</span>
                  </div>
                  <div className="job_detail_stat_box">
                    <strong>5</strong>
                    <span>Openings</span>
                  </div>
                  <div className="job_detail_stat_box">
                    <strong>Mid to Senior</strong>
                    <span>Level</span>
                  </div>
                </div>
              </div>

              <div className="job_details_card polished_card">
                <h2>Job Overview</h2>
                <p>
                  We are looking for a Senior Product Designer who can lead design
                  thinking across web and mobile experiences. You will work
                  closely with product, engineering, and marketing teams to create
                  user centered interfaces with strong visual clarity.
                </p>
              </div>

              <div className="job_details_card polished_card">
                <h2>Responsibilities</h2>
                <ul className="job_details_list">
                  {responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="job_details_card polished_card">
                <h2>Requirements</h2>
                <ul className="job_details_list">
                  {requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="job_details_card polished_card">
                <h2>Benefits</h2>
                <div className="job_side_tags">
                  {benefits.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>

              <div className="job_details_card polished_card">
                <h2>Why join this team</h2>
                <p>
                  This role gives you the chance to work on meaningful digital
                  products with a design minded team. You will have room to shape
                  flows, improve systems, and contribute to a product culture that
                  values clarity, experimentation, and quality execution.
                </p>
              </div>

              <div className="job_details_card polished_card">
                <h2>Recently viewed jobs</h2>
                <div className="mini_jobs_list">
                  <Link href="/job-details" className="mini_job_item">
                    <strong>Frontend Developer</strong>
                    <span>Nova Stack</span>
                  </Link>
                  <Link href="/job-details" className="mini_job_item">
                    <strong>Marketing Manager</strong>
                    <span>Brand Circle</span>
                  </Link>
                  <Link href="/job-details" className="mini_job_item">
                    <strong>SEO Specialist</strong>
                    <span>RankGrid</span>
                  </Link>
                </div>
              </div>
            </div>

            <aside className="job_details_sidebar sticky_sidebar">
              <div className="job_details_side_card polished_card sticky_apply_card">
                <h3>Apply for this role</h3>

                <div className="job_summary_item">
                  <span>Role</span>
                  <strong>Senior Product Designer</strong>
                </div>
                <div className="job_summary_item">
                  <span>Company</span>
                  <strong>
                    <Link href="/company-details">Pixel Forge Studio</Link>
                  </strong>
                </div>
                <div className="job_summary_item">
                  <span>Salary</span>
                  <strong>$4k to $6k</strong>
                </div>
                <div className="job_summary_item">
                  <span>Type</span>
                  <strong>Full Time</strong>
                </div>

                <button type="button" className="job_apply_btn full_btn" onClick={openApplyModal}>
                  Apply Now
                </button>

                <button type="button" className="job_save_btn full_btn">
                  Save Job
                </button>

                <div className="share_job_box">
                  <span>Share this job</span>
                  <div className="share_job_links">
                    <a href="#">Fb</a>
                    <a href="#">Ln</a>
                    <a href="#">Tw</a>
                    <a href="#">Mail</a>
                  </div>
                </div>
              </div>

              <div className="job_details_side_card polished_card">
                <h3>Suggested jobs</h3>
                <div className="mini_jobs_list">
                  {suggestedJobs.map((job) => (
                    <Link href={job.href} className="mini_job_item" key={job.title}>
                      <strong>{job.title}</strong>
                      <span>{job.company}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {isApplyOpen && (
        <div className="apply_modal_overlay" onClick={closeApplyModal}>
          <div className="apply_modal_box polished_card" onClick={(e) => e.stopPropagation()}>
            <div className="apply_modal_head">
              <div>
                <span className="section_eyebrow">Job Application</span>
                <h2>Apply for Senior Product Designer</h2>
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
                    <input type="text" placeholder="Enter your full name" required />
                  </div>

                  <div className="apply_form_field">
                    <label>Email Address</label>
                    <input type="email" placeholder="Enter your email" required />
                  </div>

                  <div className="apply_form_field">
                    <label>Phone Number</label>
                    <input type="text" placeholder="Enter your phone number" required />
                  </div>

                  <div className="apply_form_field">
                    <label>Portfolio / LinkedIn</label>
                    <input type="text" placeholder="Paste portfolio or profile link" />
                  </div>

                  <div className="apply_form_field apply_form_field_full">
                    <label>Message</label>
                    <textarea rows={5} placeholder="Write a short message" />
                  </div>

                  <div className="apply_form_field apply_form_field_full">
                    <label>Upload CV</label>

                    <label className="cv_upload_box">
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                      <span className="cv_upload_btn">Choose CV</span>
                      <span className="cv_upload_name">{selectedFileName}</span>
                    </label>
                  </div>
                </div>

                <div className="apply_form_actions">
                  <button type="submit" className="job_apply_btn">
                    Submit Application
                  </button>

                  <button type="button" className="job_save_btn" onClick={closeApplyModal}>
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="apply_success_box">
                <div className="apply_success_icon">✓</div>
                <h3>Application submitted</h3>
                <p>
                  Your application has been captured on the UI successfully.
                  Next step is connecting this form to backend or email handling.
                </p>

                <button type="button" className="job_apply_btn" onClick={closeApplyModal}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}