import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer_job">
      <div className="container footer_job_top">
        <div className="footer_job_brand_col">
          <div className="footer_job_brand">
            <span className="brand_mark">J</span>
            <span className="brand_text">JobNest</span>
          </div>

          <p>
            Find better opportunities, discover top companies, and explore jobs
            through a cleaner and smarter hiring experience.
          </p>
        </div>

        <div className="footer_job_links_col">
          <h4>For Candidates</h4>
          <ul>
            <li>
              <Link href="/jobs">Find Jobs</Link>
            </li>
            <li>
              <Link href="/companies">Companies</Link>
            </li>
            <li>
              <Link href="/saved-jobs">Saved Jobs</Link>
            </li>
          </ul>
        </div>

        <div className="footer_job_links_col">
          <h4>Company</h4>
          <ul>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/jobs">Post a Job</Link>
            </li>
          </ul>
        </div>

        <div className="footer_job_links_col">
          <h4>Newsletter</h4>
          <p className="footer_small_text">
            Get job alerts and new opportunities directly in your inbox.
          </p>
          <div className="footer_subscribe">
            <input type="email" placeholder="Email address" />
            <button type="button">Join</button>
          </div>
        </div>
      </div>

      <div className="container footer_job_bottom">
        <p>© 2026 JobNest. All rights reserved.</p>
        <div className="footer_bottom_links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}