"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Find Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Saved Jobs", href: "/saved-jobs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site_header_new">
      <div className="container header_new_inner">
        <Link href="/" className="header_brand">
          <span className="brand_mark">J</span>
          <div className="brand_text_wrap">
            <span className="brand_text">JobNest</span>
            <span className="brand_subtext">Find work faster</span>
          </div>
        </Link>

        <nav className="desktop_nav_new">
          <ul className="desktop_nav_list">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header_new_actions">

          <Link href="/signup" className="header_signup_btn">
            Sign Up
          </Link>

          <Link href="/post-job" className="header_primary_btn">
            Post a Job
          </Link>

          <button
            type="button"
            className="mobile_toggle_new"
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile_nav_new">
          <div className="container">
            <ul className="mobile_nav_list">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/signup" onClick={() => setOpen(false)}>
                  Sign Up
                </Link>
              </li>
              <li>
                <Link href="/post-job" onClick={() => setOpen(false)}>
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}