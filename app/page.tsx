"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import Home from "@/app/assets/images/home1.png"
import Home2 from "@/app/assets/images/home2.png"
import Home3 from "@/app/assets/images/home3.png"
import Brand from "@/app/assets/images/brand.png"
import Expert from "@/app/assets/images/expert.png"
import Testi from "@/app/assets/images/testi.jpg"
import Hiring from "@/app/assets/images/home4.png"
import Miami from "@/app/assets/images/city_miami.png"
import Roma from "@/app/assets/images/city_roma.png"
import Delhi from "@/app/assets/images/city_delhi.png"
import London from "@/app/assets/images/city_london.png"
import Amsterdam from "@/app/assets/images/city_amsterdam.png"
import Berlin from "@/app/assets/images/city_berlin.png"
import Paris from "@/app/assets/images/city_paris.png"
import Newzealand from "@/app/assets/images/city_newzealand.png"
import Newsletter from "@/app/assets/images/newsletter.png"
import Amazon from "@/app/assets/icons/amazon.png"
import Amd from "@/app/assets/icons/amd.png"
import Logitech from "@/app/assets/icons/logitech.png"

type JobItem = {
  id: string;
  title: string;
  slug: string;
  companyName: string | null;
  category: string | null;
  location: string;
  employmentType: string;
  salary: string | null;
  shortDescription: string | null;
  createdAt: string;
};

const categories = [
  {
    title: "Accounting / Finance",
    icon: "ACC",
    jobs: "120 open position",
  },
  {
    title: "Marketing",
    icon: "MKT",
    jobs: "84 open position",
  },
  {
    title: "Design",
    icon: "DES",
    jobs: "43 open position",
  },
  {
    title: "Development",
    icon: "DEV",
    jobs: "72 open position",
  },
];

const cities = [
  { name: "Miami", jobs: "95 jobs", image: Miami.src },
  { name: "Roma", jobs: "96 jobs", image: Roma.src },
  { name: "New Delhi", jobs: "96 jobs", image: Delhi.src },
  { name: "London", jobs: "95 jobs", image: London.src },
  { name: "Amsterdam", jobs: "95 jobs", image: Amsterdam.src },
  { name: "Berlin", jobs: "96 jobs", image: Berlin.src },
  { name: "Paris", jobs: "96 jobs", image: Paris.src },
  { name: "New Zealand", jobs: "95 jobs", image: Newzealand.src },
];

export default function HomePage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [keyword, setKeyword] = useState("");
  const [where, setWhere] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs", {
        cache: "no-store",
      });

      const result = await response.json();

      if (response.ok) {
        setJobs(result.data || []);
      }
    } catch (error) {
      console.error("Failed to load jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const featuredJobs = jobs.slice(0, 6);

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
    }

    if (where.trim()) {
      params.set("location", where.trim());
    }

    window.location.href = `/jobs?${params.toString()}`;
  };

  return (
    <>
      <section className="jp_hero">
        <div className="jp_container jp_hero_grid">
          <div className="jp_hero_content">
            <h1>
              Join us & Explore Thousands
              <br />
              of Jobs
            </h1>
            <p>Find jobs, employment and career opportunities</p>

            <div className="jp_search_box">
              <div className="jp_search_field">
                <label>What</label>
                <input
                  type="text"
                  placeholder="Job title, keyword, or company"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <div className="jp_search_field">
                <label>Where</label>
                <input
                  type="text"
                  placeholder="City or postcode"
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                />
              </div>

              <button type="button" onClick={handleSearch}>
                Find Jobs
              </button>
            </div>

            <div className="jp_popular_search">
              <strong>Popular Searches:</strong>
              <span>Designer</span>
              <span>Developer</span>
              <span>Remote</span>
              <span>Part Time</span>
            </div>

            <div className="jp_brand_slider">
  <div className="jp_brand_track">
    <img src={Amazon.src} />
    <img src={Amd.src} />
    <img src={Logitech.src} />
    {/* <img src={Google.src} />
    <img src={Microsoft.src} />
    <img src={Apple.src} /> */}

    {/* duplicate for smooth loop */}
    <img src={Amazon.src} />
    <img src={Amd.src} />
    <img src={Logitech.src} />
    {/* <img src={Google.src} />
    <img src={Microsoft.src} />
    <img src={Apple.src} /> */}
  </div>
</div>
          </div>

          <div className="jp_hero_image">
            <img src={Home.src} alt="Hero" />
          </div>
        </div>
      </section>

      {/* <section className="jp_employer_candidate">
        <div className="jp_container jp_two_cards">
          <div className="jp_info_card">
            <div>
              <h3>Employers</h3>
              <p>Start, connect or hire top talent with your job post.</p>
              <Link href="/contact">Post Your Job For Free</Link>
            </div>
            <img src={Home2.src} alt="Employers" />
          </div>

          <div className="jp_info_card">
            <div>
              <h3>Candidate</h3>
              <p>Start your candidate profile and find better jobs.</p>
              <Link href="/login?tab=user&mode=register">Upload Your CV</Link>
            </div>
            <img src={Home3.src} alt="Candidate" />
          </div>
        </div>
      </section> */}

      <section className="jp_categories">
        <div className="jp_container">
          <div className="jp_section_head">
            <div>
              <h2>Popular Job Categories</h2>
              <p>2020 jobs live, 203 added today.</p>
            </div>
            <Link href="/jobs">View All Categories</Link>
          </div>

          <div className="jp_category_grid">
            {categories.map((item) => (
              <Link href="/jobs" className="jp_category_card" key={item.title}>
                <div className="jp_category_icon">{item.icon}</div>
                <p>{item.jobs}</p>
                <h3>{item.title}</h3>
                <span>Sit amet, consectetur adipiscing elit, sed do eiusmod.</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="jp_featured_jobs">
        <div className="jp_container">
          <div className="jp_center_head">
            <h2>Featured Jobs</h2>
            <p>Know your worth and find the job that qualify your life</p>
          </div>

          {loading ? (
            <div className="jp_jobs_grid">
              <div className="jp_job_skeleton"></div>
              <div className="jp_job_skeleton"></div>
              <div className="jp_job_skeleton"></div>
              <div className="jp_job_skeleton"></div>
            </div>
          ) : featuredJobs.length === 0 ? (
            <div className="jp_empty_card">
              <h3>No jobs added yet</h3>
              <p>Jobs from admin panel will appear here.</p>
            </div>
          ) : (
            <div className="jp_jobs_grid">
              {featuredJobs.map((job, index) => (
                <div
                  className={`jp_job_card ${index === 1 ? "jp_job_active" : ""}`}
                  key={job.id}
                >
                  <div className="jp_job_top">
                    <div className="jp_job_logo">
                      {job.companyName
                        ? job.companyName.charAt(0)
                        : job.title.charAt(0)}
                    </div>

                    <div>
                      <h3>
                        <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
                      </h3>
                      <p>
                        by {job.companyName || "Company"} in{" "}
                        {job.category || "General"}
                      </p>
                    </div>

                    <span className="jp_job_bookmark">♡</span>
                  </div>

                  <div className="jp_job_meta">
                    <span>{job.employmentType}</span>
                    <span>{job.location}</span>
                    <span>{job.salary || "Salary not specified"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="jp_brand_collab">
        <div className="jp_container">
          <div className="jp_collab_box">
            <div>
              <h2>
                Collaboration With Top
                <br />
                Brands
              </h2>
              <p>
                To start searching for jobs, you can attend job fairs online or
                in person, use job boards and career websites.
              </p>
              <Link href="/jobs">View All Brands</Link>
            </div>

            <img src={Brand.src} alt="Brands" />
          </div>
        </div>
      </section>

      <section className="jp_experts">
        <div className="jp_container jp_experts_grid">
          <div className="jp_expert_images">
            <img src={Expert.src} alt="Expert" />
            <div className="jp_expert_badge">Work Inquiry From 45 Talent</div>
          </div>

          <div className="jp_expert_text">
            <h2>
              Get Over 75,000+ Talented
              <br />
              Experts in Superio
            </h2>
            <p>
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 600,000
              companies worldwide.
            </p>

            <ul>
              <li>Bring to the table win survival</li>
              <li>Capitalize on low hanging fruit to identify</li>
              <li>But I must explain to you how all this</li>
            </ul>

            <Link href="/jobs">Get Started Now</Link>
          </div>
        </div>
      </section>

      <section className="jp_testimonial">
        <div className="jp_container">
          <div className="jp_testimonial_box">
            <div className="jp_quote">
              <div className="jp_quote_mark">“</div>
              <p>
                Without JobHunt I would be homeless, they found me a job and got
                me sorted out quickly with everything. Cannot quite believe it.
              </p>
              <strong>Noel Golden</strong>
              <span>CEO, Founder & Advisor</span>
            </div>

            <img src={Testi.src} alt="Testimonial" />
          </div>

          <div className="jp_stats_row">
            <div>
              <h3>4M</h3>
              <p>4 million daily active users</p>
            </div>
            <div>
              <h3>12k</h3>
              <p>Over 12k open job positions</p>
            </div>
            <div>
              <h3>20M</h3>
              <p>Over 20 million stories shared</p>
            </div>
          </div>
        </div>
      </section>

      <section className="jp_hiring_banner">
        <div className="jp_container">
          <div className="jp_hiring_box">
            <img src={Hiring.src} alt="Hiring" />
            <div>
              <h2>We Are Hiring</h2>
              <p>Let’s work together and explore opportunities.</p>
            </div>
            <Link href="/jobs">Apply Now</Link>
          </div>
        </div>
      </section>

      <section className="jp_cities">
        <div className="jp_container">
          <div className="jp_section_head">
            <div>
              <h2>Popular Cities</h2>
              <p>Know your worth and find the job that qualify your life</p>
            </div>
            <Link href="/jobs">View All Cities</Link>
          </div>

          <div className="jp_city_grid">
            {cities.map((city) => (
              <Link href="/jobs" className="jp_city_item" key={city.name}>
                <img src={city.image} alt={city.name} />
                <div>
                  <h3>{city.name}</h3>
                  <p>{city.jobs}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="jp_newsletter">
        <div className="jp_container jp_newsletter_grid">
          <img src={Newsletter.src} alt="Newsletter" />

          <div>
            <h2>Subscribe Our Newsletter</h2>
            <p>
              Advertise your jobs to millions of monthly users and search 15.8
              million CVs in our database.
            </p>
          </div>

          <form>
            <input type="email" placeholder="Your email" />
            <button type="button">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}