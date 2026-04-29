import Link from "next/link";

const companyBenefits = [
  "Flexible working environment",
  "Strong design culture",
  "Learning budget for every employee",
  "Global product exposure",
  "Supportive team collaboration",
];

const openJobs = [
  {
    title: "Senior Product Designer",
    href: "/job-details",
  },
  {
    title: "UI UX Designer",
    href: "/job-details",
  },
  {
    title: "Frontend Developer",
    href: "/job-details",
  },
];

export default function CompanyDetailsPage() {
  return (
    <section className="company_details_section premium_detail_section">
      <div className="container">
        <div className="page_heading_block">
          <span className="section_eyebrow">Company Details</span>
          <h1>Pixel Forge Studio</h1>
          <p>Product Design Agency, London, UK</p>
        </div>

        <div className="company_details_layout premium_details_layout">
          <div className="company_details_main">
            <div className="company_hero_card polished_card company_hero_card_new">
              <div className="company_logo_circle xl">P</div>

              <div className="company_hero_content">
                <div className="company_title_row">
                  <h2>Pixel Forge Studio</h2>
                  <span className="featured_badge">Hiring</span>
                </div>

                <p>
                  A modern product design company building digital experiences
                  for startups and growth focused brands.
                </p>

                <div className="job_meta_row">
                  <span>London, UK</span>
                  <span>Hybrid</span>
                  <span>120+ employees</span>
                  <span>4.8 rating</span>
                </div>
              </div>
            </div>

            <div className="job_details_card polished_card">
              <h2>About Company</h2>
              <p>
                Pixel Forge Studio works with startups and established teams to
                create clean, scalable, and user focused digital products. Their
                work combines strong design systems, product clarity, and close
                collaboration with engineering and strategy teams.
              </p>
            </div>

            <div className="job_details_card polished_card">
              <h2>Why Work Here</h2>
              <ul className="job_details_list">
                {companyBenefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="job_details_card polished_card">
              <h2>Company Culture</h2>
              <p>
                The team values curiosity, clean execution, ownership, and
                thoughtful collaboration. Designers, developers, and strategists
                work closely together to create products that are both strong in
                experience and meaningful in business value.
              </p>
            </div>

            <div className="job_details_card polished_card">
              <h2>Open Roles</h2>
              <div className="mini_jobs_list">
                {openJobs.map((job) => (
                  <Link href={job.href} className="mini_job_item" key={job.title}>
                    <strong>{job.title}</strong>
                    <span>View role</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside className="job_details_sidebar sticky_sidebar">
            <div className="job_details_side_card polished_card">
              <h3>Company Info</h3>
              <div className="job_summary_item">
                <span>Industry</span>
                <strong>Design</strong>
              </div>
              <div className="job_summary_item">
                <span>Location</span>
                <strong>London, UK</strong>
              </div>
              <div className="job_summary_item">
                <span>Employees</span>
                <strong>120+</strong>
              </div>
              <div className="job_summary_item">
                <span>Open Jobs</span>
                <strong>14</strong>
              </div>
              <div className="job_summary_item">
                <span>Type</span>
                <strong>Hybrid</strong>
              </div>

              <Link href="/jobs" className="job_apply_btn full_btn">
                View Open Jobs
              </Link>
            </div>

            <div className="job_details_side_card polished_card">
              <h3>Reviews</h3>
              <div className="review_stat_box">
                <strong>4.8 / 5</strong>
                <span>Based on 12k reviews</span>
              </div>

              <div className="mini_jobs_list">
                <div className="mini_job_item static_item">
                  <strong>Work life balance</strong>
                  <span>Excellent</span>
                </div>
                <div className="mini_job_item static_item">
                  <strong>Growth opportunities</strong>
                  <span>Strong</span>
                </div>
                <div className="mini_job_item static_item">
                  <strong>Team collaboration</strong>
                  <span>Very good</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}