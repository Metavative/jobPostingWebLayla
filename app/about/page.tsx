const features = [
  {
    title: "Clean Job Discovery",
    text: "Search, browse, and compare jobs through a simpler and more focused experience.",
  },
  {
    title: "Better Company Visibility",
    text: "Explore hiring companies with clearer information and stronger presentation.",
  },
  {
    title: "Faster Candidate Flow",
    text: "Move from search to decision faster with less clutter and better UI clarity.",
  },
  {
    title: "Modern Hiring UI",
    text: "A polished, dark themed experience designed for both employers and candidates.",
  },
];

export default function AboutPage() {
  return (
    <section className="about_job_section">
      <div className="container">
        <div className="page_heading_block">
          <span className="section_eyebrow">About Platform</span>
          <h1>A better job search experience</h1>
          <p>
            We are building a modern job platform UI that helps candidates find
            roles faster and helps employers present opportunities more clearly.
          </p>
        </div>

        <div className="about_job_intro">
          <div className="about_job_intro_left">
            <h2>
              Built for clarity,
              <br />
              speed, and better hiring
            </h2>
          </div>

          <div className="about_job_intro_right">
            <p>
              This platform is designed to make job discovery feel easier, more
              organized, and more visually appealing. Instead of overwhelming
              users with noise, the focus stays on what matters most, relevant
              jobs, strong company visibility, and a smoother decision making
              experience.
            </p>
          </div>
        </div>

        <div className="about_feature_grid">
          {features.map((feature) => (
            <div className="about_feature_card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          ))}
        </div>

        <div className="about_stats_row">
          <div className="about_stat_box">
            <h3>8.2k+</h3>
            <p>Open jobs</p>
          </div>
          <div className="about_stat_box">
            <h3>1.4k+</h3>
            <p>Hiring companies</p>
          </div>
          <div className="about_stat_box">
            <h3>24k+</h3>
            <p>Job seekers</p>
          </div>
          <div className="about_stat_box">
            <h3>92%</h3>
            <p>User satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}