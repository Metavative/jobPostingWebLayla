import Link from "next/link";

const savedJobs = [
  {
    title: "Senior Product Designer",
    company: "Pixel Forge Studio",
    companyHref: "/company-details",
    href: "/job-details",
    location: "London, UK",
    type: "Full Time",
    salary: "$4k to $6k",
  },
  {
    title: "Frontend Developer",
    company: "Nova Stack",
    companyHref: "/company-details",
    href: "/job-details",
    location: "Remote",
    type: "Remote",
    salary: "$3.5k to $5k",
  },
  {
    title: "Marketing Manager",
    company: "Brand Circle",
    companyHref: "/company-details",
    href: "/job-details",
    location: "Toronto, CA",
    type: "Hybrid",
    salary: "$4k to $5.5k",
  },
];

export default function SavedJobsPage() {
  return (
    <section className="saved_jobs_section">
      <div className="container">
        <div className="page_heading_block">
          <span className="section_eyebrow">Saved Jobs</span>
          <h1>Your bookmarked opportunities</h1>
          <p>Keep track of jobs you want to revisit and apply to later.</p>
        </div>

        <div className="saved_jobs_list">
          {savedJobs.map((job) => (
            <div className="jobs_result_card polished_card" key={`${job.title}${job.company}`}>
              <div className="jobs_result_header">
                <Link href={job.companyHref} className="job_company_icon large">
                  {job.company.charAt(0)}
                </Link>
                <div className="jobs_result_header_text">
                  <h3>
                    <Link href={job.href}>{job.title}</Link>
                  </h3>
                  <p>
                    <Link href={job.companyHref}>{job.company}</Link>
                  </p>
                </div>
              </div>

              <div className="jobs_result_meta">
                <span>{job.location}</span>
                <span>{job.type}</span>
                <span>{job.salary}</span>
              </div>

              <div className="jobs_result_footer">
                <Link href={job.href} className="job_apply_btn">
                  Apply Now
                </Link>
                <button type="button" className="job_save_btn">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}