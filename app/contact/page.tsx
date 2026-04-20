export default function ContactPage() {
  return (
    <section className="contact_job_section">
      <div className="container">
        <div className="page_heading_block">
          <span className="section_eyebrow">Contact Us</span>
          <h1>Let’s talk about hiring</h1>
          <p>
            Whether you want to post jobs, improve your hiring flow, or build a
            better employer presence, we’d love to hear from you.
          </p>
        </div>

        <div className="contact_job_grid">
          <div className="contact_job_info">
            <div className="contact_info_card_new">
              <h3>Email</h3>
              <p>hello@jobnest.com</p>
            </div>

            <div className="contact_info_card_new">
              <h3>Phone</h3>
              <p>+44 945 335 6044</p>
            </div>

            <div className="contact_info_card_new">
              <h3>Address</h3>
              <p>2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
            </div>
          </div>

          <div className="contact_job_form_card">
            <h2>Send a message</h2>

            <form className="contact_job_form">
              <input type="text" placeholder="Full name" />
              <input type="email" placeholder="Email address" />
              <input type="text" placeholder="Subject" />
              <textarea rows={6} placeholder="Write your message"></textarea>
              <button type="button" className="header_primary_btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}