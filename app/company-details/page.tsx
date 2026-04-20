import Link from "next/link";

export default function CompanyDetailsPage() {
  return (
    <section className="company_details_section">
      <div className="container">
        <div className="page_heading_block">
          <span className="section_eyebrow">Company Details</span>
          <h1>Pixel Forge Studio</h1>
          <p>Product Design Agency, London, UK</p>
        </div>

        <div className="company_details_layout">
          <div className="company_details_main">
            <div className="company_hero_card polished_card">
              <div className="company_logo_circle xl">P</div>
              <div>
                <h2>Pixel Forge Studio</h2>
                <p>
                  A modern product design company building digital experiences
                  for startups and growth focused brands.
                </p>
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
                <li>Flexible and collaborative team culture</li>
                <li>Strong focus on quality design</li>
                <li>Remote and hybrid opportunities</li>
                <li>Learning and career growth support</li>
                <li>Interesting digital products and client work</li>
              </ul>
            </div>
          </div>

          <aside className="job_details_sidebar">
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
          </aside>
        </div>
      </div>
    </section>
  );
}