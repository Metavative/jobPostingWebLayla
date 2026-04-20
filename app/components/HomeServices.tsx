import Image from "next/image";
import Reveal from "./Reveal";

const services = [
  {
    title: "Web Design",
    description:
      "Clean, modern, and user focused website designs that strengthen your brand presence.",
    icon: "/assets/images/icon_webflow.png",
  },
  {
    title: "App Design",
    description:
      "Interface systems built for clarity, usability, and a smooth user journey across devices.",
    icon: "/assets/images/icon_flutter.svg",
  },
  {
    title: "SEO Strategy",
    description:
      "Structured growth plans that improve visibility, traffic quality, and long term search performance.",
    icon: "/assets/images/icon_nextjs.svg",
  },
  {
    title: "Marketing Growth",
    description:
      "Creative campaigns and smart execution focused on conversion, reach, and measurable results.",
    icon: "/assets/images/icon_wordpress.png",
  },
];

export default function HomeServices() {
  return (
    <section className="home_services_section">
      <div className="container">
        <div className="home_services_top">
          <Reveal direction="left">
            <div>
              <span className="section_tag">WHAT I DO</span>
              <h2 className="services_title">
                SKILLS, TOOLS, AND
                <br />
                CREATIVE EXPERTISE
              </h2>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <p className="services_top_text">
              I combine strategic thinking with design and development tools to
              create experiences that are visually strong, functional, and built
              for real business impact.
            </p>
          </Reveal>
        </div>

        <div className="services_cards_grid">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.12} direction="up">
              <div className="service_card">
                <div className="service_icon_wrap">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    width={42}
                    height={42}
                  />
                </div>

                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="home_skill_visual_wrap">
          <Reveal direction="up" delay={0.15}>
            <div className="home_skill_visual">
              <div className="skill_visual_left">
                <h3>Over 12+ years of experience</h3>
                <p>
                  Design, development, strategy, and creative execution focused
                  on meaningful digital growth.
                </p>
              </div>

              <div className="skill_visual_right">
                <Image
                  src="/assets/images/skill_shape_3_1.png"
                  alt="Skill visual"
                  width={220}
                  height={220}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}