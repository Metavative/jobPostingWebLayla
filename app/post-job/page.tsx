export default function PostJobPage() {
  return (
    <section className="post_job_section premium_detail_section">
      <div className="container">
        <div className="page_heading_block">
          <span className="section_eyebrow">For Employers</span>
          <h1>Post a new job</h1>
          <p>
            Create a strong listing with clear role details, salary, skills,
            and application info so quality candidates can apply faster.
          </p>
        </div>

        <div className="post_job_layout">
          <div className="post_job_main polished_card premium_form_card">
            <div className="premium_form_head">
              <div>
                <span className="section_eyebrow">Job Form</span>
                <h2>Job information</h2>
              </div>

              <div className="form_status_pill">
                <span className="live_dot"></span>
                <span>Draft ready</span>
              </div>
            </div>

            <form className="post_job_form">
              <div className="post_job_form_grid">
                <div className="post_job_field">
                  <label>Job Title</label>
                  <input type="text" placeholder="Senior Product Designer" />
                </div>

                <div className="post_job_field">
                  <label>Company Name</label>
                  <input type="text" placeholder="Pixel Forge Studio" />
                </div>

                <div className="post_job_field">
                  <label>Location</label>
                  <input type="text" placeholder="London, UK" />
                </div>

                <div className="post_job_field">
                  <label>Job Type</label>
                  <select>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>

                <div className="post_job_field">
                  <label>Salary Range</label>
                  <input type="text" placeholder="$4k to $6k" />
                </div>

                <div className="post_job_field">
                  <label>Experience Level</label>
                  <select>
                    <option>Junior</option>
                    <option>Mid Level</option>
                    <option>Senior</option>
                    <option>Lead</option>
                  </select>
                </div>

                <div className="post_job_field full_span">
                  <label>Short Description</label>
                  <textarea
                    rows={4}
                    placeholder="Brief summary of the role"
                  ></textarea>
                </div>

                <div className="post_job_field full_span">
                  <label>Responsibilities</label>
                  <textarea
                    rows={6}
                    placeholder="List the main responsibilities of this role"
                  ></textarea>
                </div>

                <div className="post_job_field full_span">
                  <label>Requirements</label>
                  <textarea
                    rows={6}
                    placeholder="List required skills, tools, and experience"
                  ></textarea>
                </div>

                <div className="post_job_field">
                  <label>Application Email</label>
                  <input type="email" placeholder="jobs@company.com" />
                </div>

                <div className="post_job_field">
                  <label>Application Deadline</label>
                  <input type="date" />
                </div>
              </div>

              <div className="post_job_actions">
                <button type="button" className="job_apply_btn">
                  Publish Job
                </button>
                <button type="button" className="job_save_btn">
                  Save Draft
                </button>
              </div>
            </form>
          </div>

          <aside className="post_job_sidebar">
            <div className="post_job_side_card polished_card premium_info_card">
              <h3>Posting tips</h3>
              <ul className="post_job_tip_list">
                <li>Use a clear and specific job title</li>
                <li>Keep salary range transparent</li>
                <li>List real responsibilities, not vague points</li>
                <li>Mention tools and experience level</li>
                <li>Make the application method simple</li>
              </ul>
            </div>

            <div className="post_job_side_card polished_card premium_info_card">
              <h3>Why post here?</h3>
              <div className="post_job_stats">
                <div className="post_job_stat_item">
                  <strong>24k+</strong>
                  <span>Active job seekers</span>
                </div>
                <div className="post_job_stat_item">
                  <strong>8.2k+</strong>
                  <span>Monthly applications</span>
                </div>
                <div className="post_job_stat_item">
                  <strong>1.4k+</strong>
                  <span>Hiring companies</span>
                </div>
              </div>
            </div>

            <div className="post_job_side_card polished_card premium_info_card">
              <h3>Hiring support</h3>
              <div className="mini_jobs_list">
                <div className="mini_job_item static_item">
                  <strong>Response time</strong>
                  <span>Within 24 hours</span>
                </div>
                <div className="mini_job_item static_item">
                  <strong>Ad review</strong>
                  <span>Manual quality check</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}