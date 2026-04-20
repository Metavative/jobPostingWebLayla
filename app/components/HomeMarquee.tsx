export default function HomeMarquee() {
  const items = [
    "PRODUCT DESIGN",
    "WEB DESIGN",
    "DIGITAL MARKETING",
    "BRANDING",
    "UI UX DESIGN",
    "SEO STRATEGY",
  ];

  return (
    <section className="home_marquee_section">
      <div className="home_marquee_track">
        {[...items, ...items].map((item, index) => (
          <div className="home_marquee_item" key={`${item}_${index}`}>
            <span>{item}</span>
            <span className="home_marquee_star">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}