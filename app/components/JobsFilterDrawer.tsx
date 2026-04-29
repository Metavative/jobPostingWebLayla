"use client";

import { useState } from "react";

export default function JobsFilterDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="mobile_filter_toggle"
        onClick={() => setOpen(true)}
      >
        Open Filters
      </button>

      {open && (
        <div className="filter_drawer_overlay" onClick={() => setOpen(false)}>
          <div
            className="filter_drawer_panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="filter_drawer_head">
              <h3>Filters</h3>
              <button
                type="button"
                className="filter_drawer_close"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="filter_card polished_card">
              <h3>Job Type</h3>

              <div className="filter_options_group">
                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">Full Time</span>
                </label>

                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">Remote</span>
                </label>

                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">Hybrid</span>
                </label>
              </div>
            </div>

            <div className="filter_card polished_card">
              <h3>Salary</h3>

              <div className="filter_options_group">
                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">$2k to $4k</span>
                </label>

                <label className="filter_option">
                  <input type="checkbox" />
                  <span className="custom_checkbox"></span>
                  <span className="filter_option_text">$4k to $6k</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}