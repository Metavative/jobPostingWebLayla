"use client";

import { useState } from "react";
import Image from "next/image";
import Speaker from "@/app/assets/images/speaker.png";
import Address from "@/app/assets/icons/address.svg";
import Smartphone from "@/app/assets/icons/smartphone.svg";
import Letter from "@/app/assets/icons/letter.svg";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setNotice("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const payload = {
        name: String(formData.get("name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        subject: String(formData.get("subject") || "").trim(),
        type: String(formData.get("type") || "GENERAL").trim(),
        message: String(formData.get("message") || "").trim(),
      };

      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setNotice(result.message || "Failed to submit enquiry");
        return;
      }

      setNotice("Your message has been submitted successfully.");
      form.reset();
    } catch (error) {
      console.error("Contact submit error:", error);
      setNotice("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="sep_contact_page">
      <section className="sep_contact_info_section">
        <div className="sep_contact_container">
          <div className="sep_contact_info_grid">
            <div className="sep_contact_info_item">
              <div className="sep_contact_icon">
                <img
                  src={Address.src}
                  alt="Address"
                />
              </div>
              <h3>Address</h3>
              <p>
                329 Queensberry Street, North
                <br />
                Melbourne VIC 3051, Australia.
              </p>
            </div>

            <div className="sep_contact_info_item">
              <div className="sep_contact_icon">
                <img
                  src={Smartphone.src}
                  alt="Call Us"
                />
              </div>
              <h3>Call Us</h3>
              <a href="tel:1234567890">123 456 7890</a>
            </div>

            <div className="sep_contact_info_item">
              <div className="sep_contact_icon">
                <img
                  src={Letter.src}
                  alt="Email"
                />
              </div>
              <h3>Email</h3>
              <a href="mailto:contact.london@example.com">
                contact.london@example.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="sep_contact_form_section">
        <div className="sep_contact_form_card">
          <h2>Leave A Message</h2>

          <form onSubmit={handleSubmit} className="sep_contact_form">
            <div className="sep_contact_form_row">
              <div className="sep_contact_field">
                <label>Your Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name*"
                  required
                />
              </div>

              <div className="sep_contact_field">
                <label>Your Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email*"
                  required
                />
              </div>
            </div>

            <div className="sep_contact_field">
              <label>Subject</label>
              <input name="subject" type="text" placeholder="Subject*" />
            </div>

            <div className="sep_contact_field">
  <label>Enquiry Type</label>
  <select name="type" defaultValue="GENERAL">
    <option value="GENERAL">General Inquiry</option>
    <option value="CANDIDATE">Candidate Help</option>
    <option value="EMPLOYER">Employer Support</option>
  </select>
</div>

            <div className="sep_contact_field">
              <label>Your Message</label>
              <textarea
                name="message"
                rows={7}
                placeholder="Write your message..."
                required
              ></textarea>
            </div>

            {notice ? <p className="sep_contact_notice">{notice}</p> : null}

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      <section className="sep_recruiting_section">
        <div className="sep_recruiting_box">
          <div className="sep_recruiting_content">
            <h2>Recruiting?</h2>
            <p>
              Advertise your jobs to millions of monthly users and search 15.8
              million CVs in our database.
            </p>

            <a href="/contact">Start Recruiting Now</a>
          </div>

          <div className="sep_recruiting_art">
            <img
              src={Speaker.src}
              alt="Recruiting"
            />
          </div>
        </div>
      </section>
    </main>
  );
}