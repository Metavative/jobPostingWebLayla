import Link from "next/link";

const companies = [
  {
    name: "Google",
    industry: "Technology",
    location: "California, USA",
    jobs: "124 Open Jobs",
    desc: "Build products used by billions and work with world class teams.",
  },
  {
    name: "Spotify",
    industry: "Music & Tech",
    location: "Stockholm, Sweden",
    jobs: "48 Open Jobs",
    desc: "Create meaningful digital experiences around music and culture.",
  },
  {
    name: "Notion",
    industry: "Productivity",
    location: "Remote",
    jobs: "31 Open Jobs",
    desc: "Help people build better workflows and simpler digital systems.",
  },
  {
    name: "Figma",
    industry: "Design Tools",
    location: "New York, USA",
    jobs: "22 Open Jobs",
    desc: "Shape collaborative design tools used by teams across the world.",
  },
  {
    name: "Airbnb",
    industry: "Travel",
    location: "San Francisco, USA",
    jobs: "19 Open Jobs",
    desc: "Design trust based travel products and global booking experiences.",
  },
  {
    name: "Stripe",
    industry: "Fintech",
    location: "Dublin, Ireland",
    jobs: "37 Open Jobs",
    desc: "Work on digital payments infrastructure powering online business.",
  },
];

export default function CompaniesPage() {
  return (
    <section className="companies_page_section">
      <div className="container">
        <div className="page_heading_block">
          <span className="section_eyebrow">Top Companies</span>
          <h1>Explore companies hiring now</h1>
          <p>
            Discover fast growing teams, global brands, and remote first
            companies looking for the right talent.
          </p>
        </div>

        <div className="companies_page_grid">
          {companies.map((company) => (
            <div className="company_page_card polished_card" key={company.name}>
              <div className="company_page_card_top">
                <Link href="/company-details" className="company_logo_circle large">
                  {company.name.charAt(0)}
                </Link>

                <div>
                  <h3>
                    <Link href="/company-details">{company.name}</Link>
                  </h3>
                  <p>{company.industry}</p>
                </div>
              </div>

              <div className="company_page_meta">
                <span>{company.location}</span>
                <span>{company.jobs}</span>
              </div>

              <p className="company_page_desc">{company.desc}</p>

              <div className="company_page_actions">
                <Link href="/company-details" className="job_apply_btn">
                  View Company
                </Link>
                <Link href="/jobs" className="job_save_btn">
                  Open Jobs
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}