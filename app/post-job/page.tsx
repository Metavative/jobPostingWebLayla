export default function PostJobPage() {
  return (
    <section className="post_job_section">
      <div className="container">
        <div className="page_heading_block">
          <span className="section_eyebrow">For Employers</span>
          <h1>Post a new job</h1>
          <p>
            Create a job listing with role details, company information, salary,
            and requirements so candidates can apply quickly.
          </p>
        </div>

        <div className="post_job_layout">
          <div className="post_job_main polished_card">
            <h2>Job Information</h2>

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
            <div className="post_job_side_card polished_card">
              <h3>Posting Tips</h3>
              <ul className="post_job_tip_list">
                <li>Use a clear and specific job title</li>
                <li>Keep salary range transparent</li>
                <li>List real responsibilities, not vague points</li>
                <li>Mention tools and experience level</li>
                <li>Make the application method simple</li>
              </ul>
            </div>

            <div className="post_job_side_card polished_card">
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
          </aside>
        </div>
      </div>
    </section>
  );
}