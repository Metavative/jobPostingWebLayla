import Link from "next/link";

export default function SignupPage() {
  return (
    <section className="auth_section premium_detail_section">
      <div className="container auth_wrap">
        <div className="auth_card polished_card auth_card_premium">
          <div className="auth_visual_top">
            <span className="section_eyebrow">Create Account</span>
            <h1>Sign up to get started</h1>
            <p>
              Save jobs, discover companies, and manage your search in one place
              with a cleaner job platform experience.
            </p>
          </div>

          <form className="auth_form">
            <input type="text" placeholder="Full name" />
            <input type="email" placeholder="Email address" />
            <input type="password" placeholder="Password" />

            <label className="auth_check_row">
              <input type="checkbox" />
              <span>I agree to the terms and privacy policy</span>
            </label>

            <button type="button" className="header_primary_btn auth_btn_full">
              Sign Up
            </button>
          </form>

          <div className="auth_bottom_panel">
            <p className="auth_bottom_text">
              Already have an account? <Link href="/login">Login</Link>
            </p>

            <div className="auth_mini_stats">
              <div className="auth_stat_box">
                <strong>1.4k+</strong>
                <span>Companies</span>
              </div>
              <div className="auth_stat_box">
                <strong>Fast</strong>
                <span>Profile setup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}