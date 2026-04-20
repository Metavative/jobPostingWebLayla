import Link from "next/link";

const jobs = [
  {
    title: "Senior Product Designer",
    company: "Pixel Forge Studio",
    companyHref: "/company-details",
    href: "/job-details",
    location: "London, UK",
    type: "Full Time",
    salary: "$4k to $6k",
    tags: ["Figma", "Product", "UI UX"],
  },
  {
    title: "Frontend Developer",
    company: "Nova Stack",
    companyHref: "/company-details",
    href: "/job-details",
    location: "Remote",
    type: "Remote",
    salary: "$3.5k to $5k",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "SEO Specialist",
    company: "RankGrid",
    companyHref: "/company-details",
    href: "/job-details",
    location: "New York, US",
    type: "Full Time",
    salary: "$3k to $4.5k",
    tags: ["SEO", "Content", "Analytics"],
  },
  {
    title: "Marketing Manager",
    company: "Brand Circle",
    companyHref: "/company-details",
    href: "/job-details",
    location: "Toronto, CA",
    type: "Hybrid",
    salary: "$4k to $5.5k",
    tags: ["Growth", "Campaigns", "Branding"],
  },
  {
    title: "UI UX Designer",
    company: "Flow Craft",
    companyHref: "/company-details",
    href: "/job-details",
    location: "Berlin, DE",
    type: "Full Time",
    salary: "$3.8k to $5.2k",
    tags: ["Design", "Research", "Wireframes"],
  },
  {
    title: "Content Strategist",
    company: "WordMint",
    companyHref: "/company-details",
    href: "/job-details",
    location: "Remote",
    type: "Remote",
    salary: "$2.5k to $4k",
    tags: ["Content", "Strategy", "SEO"],
  },
];

export default function JobsPage() {
  return (
    <section className="jobs_listing_section">
      <div className="container">
        <div className="jobs_page_heading">
          <span className="section_eyebrow">Job Search</span>
          <h1>Find jobs that match your skills</h1>
          <p>
            Filter opportunities by role, location, work type, and salary range.
          </p>
        </div>

        <div className="jobs_layout">
          <aside className="jobs_filter_sidebar">
            <div className="filter_card polished_card">
              <h3>Search</h3>
              <input type="text" placeholder="Job title" />
              <input type="text" placeholder="Location" />
            </div>

            <div className="filter_card polished_card">
              <h3>Job Type</h3>
              <label><input type="checkbox" /> Full Time</label>
              <label><input type="checkbox" /> Remote</label>
              <label><input type="checkbox" /> Hybrid</label>
              <label><input type="checkbox" /> Part Time</label>
            </div>

            <div className="filter_card polished_card">
              <h3>Salary Range</h3>
              <label><input type="checkbox" /> $2k to $4k</label>
              <label><input type="checkbox" /> $4k to $6k</label>
              <label><input type="checkbox" /> $6k+</label>
            </div>
          </aside>

          <div className="jobs_results_area">
            <div className="jobs_results_top polished_bar">
              <h2>126 Jobs Found</h2>
              <button type="button" className="sort_btn">
                Latest
              </button>
            </div>

            <div className="jobs_results_list">
              {jobs.map((job) => (
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

                  <div className="jobs_result_tags">
                    {job.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="jobs_result_footer">
                    <Link href={job.href} className="job_apply_btn">
                      Apply Now
                    </Link>
                    <button type="button" className="job_save_btn">
                      Save Job
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}