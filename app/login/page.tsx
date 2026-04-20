import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="auth_section">
      <div className="container auth_wrap">
        <div className="auth_card polished_card">
          <span className="section_eyebrow">Welcome Back</span>
          <h1>Login to your account</h1>
          <p>Access your saved jobs, applications, and job alerts.</p>

          <form className="auth_form">
            <input type="email" placeholder="Email address" />
            <input type="password" placeholder="Password" />
            <button type="button" className="header_primary_btn auth_btn_full">
              Login
            </button>
          </form>

          <p className="auth_bottom_text">
            Don’t have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
}