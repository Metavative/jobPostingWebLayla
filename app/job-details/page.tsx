import Link from "next/link";

export default function JobDetailsPage() {
  return (
    <section className="job_details_section">
      <div className="container">
        <div className="page_heading_block">
          <span className="section_eyebrow">Job Details</span>
          <h1>Senior Product Designer</h1>
          <p>Pixel Forge Studio, London, UK, Full Time, $4k to $6k</p>
        </div>

        <div className="job_details_layout">
          <div className="job_details_main">
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
                <li>Create wireframes, flows, and polished UI screens</li>
                <li>Collaborate with cross functional teams</li>
                <li>Maintain and improve design systems</li>
                <li>Translate research insights into usable interfaces</li>
                <li>Support product decisions with clear design reasoning</li>
              </ul>
            </div>

            <div className="job_details_card polished_card">
              <h2>Requirements</h2>
              <ul className="job_details_list">
                <li>3+ years of product design experience</li>
                <li>Strong portfolio of web or app projects</li>
                <li>Proficiency in Figma and prototyping tools</li>
                <li>Good understanding of UX principles</li>
                <li>Clear communication and teamwork skills</li>
              </ul>
            </div>
          </div>

          <aside className="job_details_sidebar">
            <div className="job_details_side_card polished_card">
              <h3>Job Summary</h3>
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
                <span>Location</span>
                <strong>London, UK</strong>
              </div>
              <div className="job_summary_item">
                <span>Type</span>
                <strong>Full Time</strong>
              </div>
              <div className="job_summary_item">
                <span>Salary</span>
                <strong>$4k to $6k</strong>
              </div>

              <button type="button" className="job_apply_btn full_btn">
                Apply Now
              </button>
            </div>

            <div className="job_details_side_card polished_card">
              <h3>Skills</h3>
              <div className="job_side_tags">
                <span>Figma</span>
                <span>UX</span>
                <span>UI Design</span>
                <span>Design Systems</span>
                <span>Research</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}