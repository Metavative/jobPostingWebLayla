import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/images/logo.png";

export default function Footer() {
  return (
    <footer className="footer_job">
      <div className="container footer_job_top new_footer_layout">
        
        {/* LEFT SIDE (Logo + text) */}
        <div className="footer_job_brand_col">
          <Link href="/" className="footer_logo_wrap">
            <Image src={logo} alt="SEP" width={120} height={80} />
          </Link>

          <p className="footer_desc">
            Find better opportunities, explore live jobs, and apply with your CV
            through a cleaner recruitment platform.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer_job_links_col">
          <h4>For Candidates</h4>
          <ul>
            <li><Link href="/jobs">Find Jobs</Link></li>
            <li><Link href="/saved-jobs">Saved Jobs</Link></li>
            <li><Link href="/contact">Candidate Help</Link></li>
          </ul>
        </div>

        <div className="footer_job_links_col">
          <h4>Platform</h4>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/saved-jobs">Saved Jobs</Link></li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="footer_job_links_col">
          <h4>Get in touch</h4>

          <p className="footer_small_text">
            Have a question about a role or application? Send an enquiry and the
            team will review it.
          </p>

          <div className="footer_actions">
            <Link href="/contact" className="footer_action_btn">
              Send Enquiry
            </Link>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="container footer_job_bottom new_footer_bottom">
        <p>© 2026 JobNest. All rights reserved.</p>

        <div className="footer_bottom_links">
          <Link href="/jobs">Jobs</Link>
          <Link href="/contact">Support</Link>
          <Link href="/saved-jobs">Saved Jobs</Link>
        </div>
      </div>
    </footer>
  );
}