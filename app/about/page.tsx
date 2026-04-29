import Link from "next/link";
import PageReveal from "@/app/components/PageReveal";

const features = [
  {
    title: "Smart Job Search",
    text: "Find better roles with a clean search experience and simple job filtering.",
  },
  {
    title: "User Accounts",
    text: "Candidates can register, login, save jobs, and track applied jobs.",
  },
  {
    title: "Employer Support",
    text: "Companies can share hiring needs and manage applications more clearly.",
  },
  {
    title: "Admin Control",
    text: "Admin can manage jobs, applications, approvals, enquiries, and replies.",
  },
];

const values = [
  {
    title: "Simple Experience",
    text: "Every page is designed to be easy to read and easy to use.",
  },
  {
    title: "Candidate First",
    text: "Users can apply, save, and track jobs from one clear flow.",
  },
  {
    title: "Better Hiring",
    text: "Employers get cleaner job visibility and better candidate handling.",
  },
];

export default function AboutPage() {
  return (
    <main className="sep_about_page">
      <section className="sep_about_hero">
        <div className="sep_about_container">
          <PageReveal>
            <span className="sep_about_label">About Our Platform</span>
            <h1>
              Building a better way
              <br />
              to find jobs and hire talent
            </h1>
            <p>
              JobNest helps candidates find opportunities faster while giving
              employers and admins a cleaner way to manage hiring.
            </p>

            <div className="sep_about_actions">
              <Link href="/jobs">Browse Jobs</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className="sep_about_intro">
        <div className="sep_about_container sep_about_intro_grid">
          <PageReveal delay={0.05}>
            <div className="sep_about_intro_left">
              <span className="sep_about_label">Who We Are</span>
              <h2>
                A modern job platform made for simple hiring journeys.
              </h2>
            </div>
          </PageReveal>

          <PageReveal delay={0.08}>
            <div className="sep_about_intro_right">
              <p>
                The platform is built to keep job discovery clean, fast, and
                practical. Candidates can browse jobs, apply with a CV, save
                roles, and track their application status. Admins can manage
                listings, review applications, approve candidates, and reply to
                enquiries from one dashboard.
              </p>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className="sep_about_features">
        <div className="sep_about_container">
          <div className="sep_about_section_head">
            <span className="sep_about_label">Platform Features</span>
            <h2>Everything needed for a cleaner job portal</h2>
            <p>
              The core flows are connected with backend APIs and ready for real
              job posting activity.
            </p>
          </div>

          <div className="sep_about_feature_grid">
            {features.map((feature, index) => (
              <PageReveal delay={index * 0.04} key={feature.title}>
                <div className="sep_about_feature_card">
                  <div className="sep_about_feature_icon">{index + 1}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </PageReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sep_about_split">
        <div className="sep_about_container sep_about_split_grid">
          <PageReveal delay={0.06}>
            <div className="sep_about_story_card">
              <span className="sep_about_label">Our Mission</span>
              <h3>Make job search easier and more organized</h3>
              <p>
                The goal is to remove clutter from the hiring experience.
                Candidates should quickly understand the role, apply easily, and
                track their application without confusion.
              </p>
            </div>
          </PageReveal>

          <PageReveal delay={0.1}>
            <div className="sep_about_story_card blue">
              <span className="sep_about_label">Our Vision</span>
              <h3>Create a job product that feels clear and useful</h3>
              <p>
                We want every page to feel focused, from finding jobs to
                managing applications, saved roles, enquiries, and approvals.
              </p>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className="sep_about_values">
        <div className="sep_about_container">
          <div className="sep_about_section_head">
            <span className="sep_about_label">Core Values</span>
            <h2>What shapes the platform</h2>
          </div>

          <div className="sep_about_values_grid">
            {values.map((value) => (
              <div className="sep_about_value_card" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sep_about_stats">
        <div className="sep_about_container sep_about_stats_grid">
          <div>
            <h3>8.2k+</h3>
            <p>Open jobs</p>
          </div>

          <div>
            <h3>1.4k+</h3>
            <p>Hiring companies</p>
          </div>

          <div>
            <h3>24k+</h3>
            <p>Job seekers</p>
          </div>

          <div>
            <h3>92%</h3>
            <p>User satisfaction</p>
          </div>
        </div>
      </section>

      <section className="sep_about_cta">
        <div className="sep_about_container">
          <div className="sep_about_cta_box">
            <div>
              <h2>Ready to explore better opportunities?</h2>
              <p>
                Browse live jobs, save roles, and apply through a clean hiring
                experience.
              </p>
            </div>

            <Link href="/jobs">Find Jobs</Link>
          </div>
        </div>
      </section>
    </main>
  );
}