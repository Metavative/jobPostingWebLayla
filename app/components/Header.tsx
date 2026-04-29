"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/app/assets/images/logo.png";
type UserData = {
  id: string;
  name: string;
  email: string;
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "Find Jobs", href: "/jobs" },
  { label: "Applied", href: "/applied" },
  { label: "Saved Jobs", href: "/saved-jobs" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [checking, setChecking] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user/me", {
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (response.ok) {
        setUser(result.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setChecking(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/user/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header className="sep_header">
      <div className="sep_header_inner">
        <Link href="/" className="sep_logo">
          <Image
            src={logo.src}
            alt="SEP"
            width={100}
            height={100}
            priority
          />
        </Link>

        <nav className="sep_nav">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sep_actions">
          {checking ? null : user ? (
            <>
              <span className="sep_user_text">Hi, {user.name}</span>
              <button
                type="button"
                className="sep_light_btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* <Link href="/login?tab=user&mode=register" className="sep_text_btn">
                Sign Up
              </Link> */}

              <Link href="/login?tab=user" className="sep_light_btn">
                Login / Register
              </Link>
            </>
          )}

          <button
            type="button"
            className="sep_mobile_btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {open ? (
        <div className="sep_mobile_menu">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}

          {!user ? (
            <>
              <Link href="/login?tab=user" onClick={() => setOpen(false)}>
                Login / Register
              </Link>
              <Link href="/login?tab=admin" onClick={() => setOpen(false)}>
                Admin Login
              </Link>
            </>
          ) : (
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      ) : null}
    </header>
  );
}