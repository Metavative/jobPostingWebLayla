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
    featured: true,
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
    featured: false,
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
    featured: true,
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
    featured: false,
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
    featured: false,
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
    featured: false,
  },
];

export default function JobsPage() {
  return (
    <section className="jobs_listing_section jobs_listing_section_new">
      <div className="container">
        <div className="jobs_page_heading jobs_page_heading_new">
          <span className="section_eyebrow">Job Search</span>
          <h1>Find jobs that match your skills</h1>
          <p>
            Search by role, filter by work type, and discover better
            opportunities through a cleaner job search interface.
          </p>
        </div>

        <div className="jobs_top_search_bar polished_card">
          <div className="jobs_top_search_grid">
            <input type="text" placeholder="Job title or keyword" />
            <input type="text" placeholder="Location" />
            <button type="button">Search Jobs</button>
          </div>
        </div>

        <div className="jobs_layout jobs_layout_new">
          <aside className="jobs_filter_sidebar jobs_filter_sidebar_new">
            <div className="filter_card polished_card">
              <div className="filter_card_head">
                <h3>Search</h3>
                <button type="button" className="filter_clear_btn">
                  Clear
                </button>
              </div>

              <input type="text" placeholder="Job title" />
              <input type="text" placeholder="Location" />
            </div>

            <div className="filter_card polished_card">
              <h3>Job Type</h3>

              <div className="filter_options_group">
                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">Full Time</span>
                </label>

                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">Remote</span>
                </label>

                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">Hybrid</span>
                </label>

                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">Part Time</span>
                </label>
              </div>
            </div>

            <div className="filter_card polished_card">
              <h3>Salary Range</h3>

              <div className="filter_options_group">
                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">$2k to $4k</span>
                </label>

                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">$4k to $6k</span>
                </label>

                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">$6k+</span>
                </label>
              </div>
            </div>

            <div className="filter_card polished_card">
              <h3>Experience Level</h3>

              <div className="filter_options_group">
                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">Junior</span>
                </label>

                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">Mid Level</span>
                </label>

                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">Senior</span>
                </label>

                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">Lead</span>
                </label>
              </div>
            </div>
          </aside>

          <div className="jobs_results_area">
            <div className="jobs_results_top polished_bar jobs_results_top_new">
              <div>
                <h2>126 Jobs Found</h2>
                <p className="jobs_results_subtext">
                  Showing featured and latest openings
                </p>
              </div>

              <button type="button" className="sort_btn">
                Sort by Latest
              </button>
            </div>

            <div className="jobs_results_list jobs_results_list_new">
              {jobs.map((job) => (
                <div
                  className={`jobs_result_card polished_card jobs_result_card_new ${
                    job.featured ? "featured_job_card" : ""
                  }`}
                  key={`${job.title}${job.company}`}
                >
                  <div className="jobs_result_header">
                    <Link href={job.companyHref} className="job_company_icon large">
                      {job.company.charAt(0)}
                    </Link>

                    <div className="jobs_result_header_text">
                      <div className="jobs_result_title_row">
                        <h3>
                          <Link href={job.href}>{job.title}</Link>
                        </h3>

                        {job.featured && <span className="featured_badge">Featured</span>}
                      </div>

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

                    <Link href={job.companyHref} className="job_save_btn">
                      Company
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