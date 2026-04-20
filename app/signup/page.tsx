import Link from "next/link";

export default function SignupPage() {
  return (
    <section className="auth_section">
      <div className="container auth_wrap">
        <div className="auth_card polished_card">
          <span className="section_eyebrow">Create Account</span>
          <h1>Sign up to get started</h1>
          <p>
            Save jobs, discover companies, and manage your job search in one
            place.
          </p>

          <form className="auth_form">
            <input type="text" placeholder="Full name" />
            <input type="email" placeholder="Email address" />
            <input type="password" placeholder="Password" />
            <button type="button" className="header_primary_btn auth_btn_full">
              Sign Up
            </button>
          </form>

          <p className="auth_bottom_text">
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}