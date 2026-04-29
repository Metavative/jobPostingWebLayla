"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type ActiveTab = "admin" | "user";
type UserMode = "login" | "register";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<ActiveTab>("user");
  const [userMode, setUserMode] = useState<UserMode>("login");

  const [adminEmail, setAdminEmail] = useState("admin@example.com");
  const [adminPassword, setAdminPassword] = useState("admin123");

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const tab = searchParams.get("tab");
    const mode = searchParams.get("mode");

    if (tab === "admin") setActiveTab("admin");
    if (tab === "user") setActiveTab("user");
    if (mode === "register") setUserMode("register");
  }, [searchParams]);

  const handleAdminLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setNotice("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: adminEmail,
          password: adminPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setNotice(result.message || "Admin login failed");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setNotice("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUserLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setNotice("");

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setNotice(result.message || "User login failed");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setNotice("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleUserRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setNotice("");

    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setNotice(result.message || "Registration failed");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setNotice("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="sep_login_page">
      <section className="sep_login_hero">
        <div className="sep_login_container">
          <h1>Account Access</h1>
          <p>Login as a candidate or admin to continue.</p>
        </div>
      </section>

      <section className="sep_login_section">
        <div className="sep_login_container sep_login_grid">
          <div className="sep_login_info">
            <span className="sep_login_label">Welcome Back</span>

            <h2>
              Manage jobs, applications,
              <br />
              and your hiring journey.
            </h2>

            <p>
              Candidates can save jobs, apply with a CV, and track application
              status. Admins can manage jobs, applications, approvals, and
              enquiries.
            </p>

            <div className="sep_login_points">
              <div>
                <strong>01</strong>
                <span>Save and track jobs</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Apply with your CV</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Manage admin dashboard</span>
              </div>
            </div>

            <Link href="/" className="sep_login_back">
              Back to website
            </Link>
          </div>

          <div className="sep_login_card">
            <div className="sep_login_tabs">
              <button
                type="button"
                className={activeTab === "user" ? "active" : ""}
                onClick={() => {
                  setActiveTab("user");
                  setNotice("");
                }}
              >
                User
              </button>

              <button
                type="button"
                className={activeTab === "admin" ? "active" : ""}
                onClick={() => {
                  setActiveTab("admin");
                  setNotice("");
                }}
              >
                Admin
              </button>
            </div>

            {activeTab === "admin" ? (
              <form className="sep_login_form" onSubmit={handleAdminLogin}>
                <div className="sep_login_form_head">
                  <span className="sep_login_label">Admin Login</span>
                  <h3>Login as admin</h3>
                  <p>Access job posting and application management tools.</p>
                </div>

                <div className="sep_login_field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Admin email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="sep_login_field">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    required
                  />
                </div>

                {notice ? <p className="sep_login_notice">{notice}</p> : null}

                <button type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "Login as Admin"}
                </button>
              </form>
            ) : (
              <form
                className="sep_login_form"
                onSubmit={
                  userMode === "login" ? handleUserLogin : handleUserRegister
                }
              >
                <div className="sep_login_form_head">
                  <span className="sep_login_label">
                    {userMode === "login" ? "User Login" : "User Register"}
                  </span>

                  <h3>
                    {userMode === "login"
                      ? "Login to your account"
                      : "Create your account"}
                  </h3>

                  <p>
                    {userMode === "login"
                      ? "Continue to save jobs and track applications."
                      : "Create an account to apply and track jobs."}
                  </p>
                </div>

                {userMode === "register" ? (
                  <div className="sep_login_field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                ) : null}

                <div className="sep_login_field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="sep_login_field">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                  />
                </div>

                {notice ? <p className="sep_login_notice">{notice}</p> : null}

                <button type="submit" disabled={loading}>
                  {loading
                    ? "Please wait..."
                    : userMode === "login"
                    ? "Login"
                    : "Register"}
                </button>

                {userMode === "login" ? (
                  <p className="sep_login_switch">
                    Do not have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setUserMode("register");
                        setNotice("");
                      }}
                    >
                      Register here
                    </button>
                  </p>
                ) : (
                  <p className="sep_login_switch">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setUserMode("login");
                        setNotice("");
                      }}
                    >
                      Login here
                    </button>
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}