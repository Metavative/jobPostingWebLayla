import Link from "next/link";

const featuredJobs = [
  {
    title: "Senior Product Designer",
    company: "Pixel Forge Studio",
    companyHref: "/company-details",
    jobHref: "/job-details",
    location: "London, UK",
    type: "Full Time",
    salary: "$4k to $6k",
    tags: ["Figma", "Product", "UI UX"],
  },
  {
    title: "Frontend Developer",
    company: "Nova Stack",
    companyHref: "/company-details",
    jobHref: "/job-details",
    location: "Remote",
    type: "Remote",
    salary: "$3.5k to $5k",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "SEO Specialist",
    company: "RankGrid",
    companyHref: "/company-details",
    jobHref: "/job-details",
    location: "New York, US",
    type: "Full Time",
    salary: "$3k to $4.5k",
    tags: ["SEO", "Content", "Analytics"],
  },
  {
    title: "Marketing Manager",
    company: "Brand Circle",
    companyHref: "/company-details",
    jobHref: "/job-details",
    location: "Toronto, CA",
    type: "Hybrid",
    salary: "$4k to $5.5k",
    tags: ["Growth", "Campaigns", "Branding"],
  },
  {
    title: "UI UX Designer",
    company: "Flow Craft",
    companyHref: "/company-details",
    jobHref: "/job-details",
    location: "Berlin, DE",
    type: "Full Time",
    salary: "$3.8k to $5.2k",
    tags: ["Design", "Research", "Wireframes"],
  },
  {
    title: "Content Strategist",
    company: "WordMint",
    companyHref: "/company-details",
    jobHref: "/job-details",
    location: "Remote",
    type: "Remote",
    salary: "$2.5k to $4k",
    tags: ["Content", "Strategy", "SEO"],
  },
];

const categories = [
  { name: "Design", count: "120+ open roles" },
  { name: "Development", count: "340+ open roles" },
  { name: "Marketing", count: "150+ open roles" },
  { name: "Sales", count: "95+ open roles" },
  { name: "Customer Support", count: "80+ open roles" },
  { name: "Finance", count: "65+ open roles" },
];

const companies = [
  { name: "Google", jobs: "124 Open Jobs", href: "/company-details" },
  { name: "Spotify", jobs: "48 Open Jobs", href: "/company-details" },
  { name: "Figma", jobs: "22 Open Jobs", href: "/company-details" },
  { name: "Notion", jobs: "31 Open Jobs", href: "/company-details" },
  { name: "Stripe", jobs: "37 Open Jobs", href: "/company-details" },
  { name: "Airbnb", jobs: "19 Open Jobs", href: "/company-details" },
];

export default function HomePage() {
  return (
    <>
      <section className="job_hero_section">
        <div className="container">
          <div className="job_hero_wrap">
            <div className="job_hero_content">
              <span className="job_badge">Smarter job search experience</span>
              <h1>
                Find the right job,
                <br />
                faster and better
              </h1>
              <p>
                Search roles, discover companies, and explore opportunities
                through a cleaner hiring interface built for speed, clarity, and
                better decision making.
              </p>

              <div className="job_search_shell">
                <div className="job_search_bar">
                  <input type="text" placeholder="Job title or keyword" />
                  <input type="text" placeholder="Location" />
                  <button type="button">Find Jobs</button>
                </div>

                <div className="job_popular_tags">
                  <span>Popular:</span>
                  <Link href="/jobs">Designer</Link>
                  <Link href="/jobs">Developer</Link>
                  <Link href="/jobs">Marketing</Link>
                  <Link href="/jobs">Remote</Link>
                </div>
              </div>
            </div>

            <div className="job_hero_stats">
              <div className="hero_stat_card large accent_glow">
                <span className="hero_stat_label">Live talent market</span>
                <h3>24k+</h3>
                <p>Active job seekers</p>
              </div>

              <div className="hero_stat_row">
                <div className="hero_stat_card">
                  <span className="hero_stat_label">Jobs</span>
                  <h3>8.2k+</h3>
                  <p>Open positions</p>
                </div>

                <div className="hero_stat_card">
                  <span className="hero_stat_label">Companies</span>
                  <h3>1.4k+</h3>
                  <p>Hiring teams</p>
                </div>
              </div>

              <div className="hero_mini_panel">
                <div className="hero_mini_panel_top">
                  <span className="live_dot"></span>
                  <span>Trending roles this week</span>
                </div>

                <div className="hero_mini_tags">
                  <span>Product Design</span>
                  <span>React Developer</span>
                  <span>SEO Specialist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="job_category_section">
        <div className="container">
          <div className="section_heading_row">
            <div>
              <span className="section_eyebrow">Popular Categories</span>
              <h2>Browse jobs by category</h2>
            </div>
            <Link href="/jobs" className="section_link_btn">
              View all jobs
            </Link>
          </div>

          <div className="category_grid">
            {categories.map((category) => (
              <Link className="category_card polished_card" href="/jobs" key={category.name}>
                <div className="category_card_icon">{category.name.charAt(0)}</div>
                <h3>{category.name}</h3>
                <p>{category.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="featured_jobs_section">
        <div className="container">
          <div className="section_heading_row">
            <div>
              <span className="section_eyebrow">Featured Jobs</span>
              <h2>Recommended opportunities</h2>
            </div>
            <Link href="/jobs" className="section_link_btn">
              Browse all
            </Link>
          </div>

          <div className="featured_jobs_grid">
            {featuredJobs.map((job) => (
              <div className="job_card_new polished_card" key={`${job.title}${job.company}`}>
                <div className="job_card_top">
                  <Link href={job.companyHref} className="job_company_icon">
                    {job.company.charAt(0)}
                  </Link>
                  <div>
                    <h3>
                      <Link href={job.jobHref}>{job.title}</Link>
                    </h3>
                    <p>
                      <Link href={job.companyHref}>{job.company}</Link>
                    </p>
                  </div>
                </div>

                <div className="job_meta_row">
                  <span>{job.location}</span>
                  <span>{job.type}</span>
                  <span>{job.salary}</span>
                </div>

                <div className="jobs_result_tags top_space_small">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="job_card_bottom">
                  <Link href={job.jobHref} className="job_apply_btn">
                    View Job
                  </Link>
                  <button type="button" className="job_save_btn">
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="top_companies_section">
        <div className="container">
          <div className="section_heading_row">
            <div>
              <span className="section_eyebrow">Top Companies</span>
              <h2>Trusted by growing teams</h2>
            </div>
            <Link href="/companies" className="section_link_btn">
              Explore companies
            </Link>
          </div>

          <div className="companies_grid">
            {companies.map((company) => (
              <Link className="company_card polished_card" href={company.href} key={company.name}>
                <div className="company_logo_circle">{company.name.charAt(0)}</div>
                <h3>{company.name}</h3>
                <p>{company.jobs}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="job_cta_section">
        <div className="container">
          <div className="job_cta_box">
            <div>
              <span className="section_eyebrow">For Employers</span>
              <h2>Start attracting better candidates</h2>
              <p>
                Post openings, highlight your company, and make hiring easier
                with a more focused and modern job board UI.
              </p>
            </div>

            <div className="cta_actions_row">
              <Link href="/contact" className="header_primary_btn">
                Post a Job
              </Link>
              <Link href="/companies" className="header_link_btn">
                View Companies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}