"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type JobItem = {
  id: string;
  title: string;
  slug: string;
  companyName: string | null;
  category: string | null;
  location: string;
  employmentType: string;
  salary: string | null;
  shortDescription: string | null;
  createdAt: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");

  const [keyword, setKeyword] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sort, setSort] = useState("new");
  const [showCount, setShowCount] = useState(9);

  const fetchJobs = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/jobs", {
        cache: "no-store",
      });

      const result = await response.json();

      if (response.ok) {
        setJobs(result.data || []);
      }
    } catch (error) {
      console.error("Failed to load jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const response = await fetch("/api/user/saved-jobs", {
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (response.ok) {
        const ids = (result.data || []).map(
          (item: { job: { id: string } }) => item.job.id
        );

        setSavedIds(ids);
      }
    } catch {
      setSavedIds([]);
    }
  };

  const toggleSave = async (jobId: string) => {
    try {
      const response = await fetch("/api/user/saved-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ jobId }),
      });

      const result = await response.json();

      if (!response.ok) {
        setNotice(result.message || "Please login before saving a job");
        return;
      }

      setNotice(result.message);

      setSavedIds((prev) =>
        result.saved ? [...prev, jobId] : prev.filter((id) => id !== jobId)
      );
    } catch {
      setNotice("Something went wrong");
    }

    setTimeout(() => setNotice(""), 1800);
  };

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    let nextJobs = jobs.filter((job) => {
      const searchValue = keyword.toLowerCase();
      const locationValue = locationFilter.toLowerCase();
      const categoryValue = categoryFilter.toLowerCase();

      const matchesKeyword =
        !keyword ||
        job.title.toLowerCase().includes(searchValue) ||
        (job.companyName || "").toLowerCase().includes(searchValue) ||
        (job.category || "").toLowerCase().includes(searchValue);

      const matchesLocation =
        !locationFilter || job.location.toLowerCase().includes(locationValue);

      const matchesCategory =
        !categoryFilter ||
        (job.category || "").toLowerCase().includes(categoryValue);

      return matchesKeyword && matchesLocation && matchesCategory;
    });

    if (sort === "old") {
      nextJobs = [...nextJobs].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    } else {
      nextJobs = [...nextJobs].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return nextJobs.slice(0, showCount);
  }, [jobs, keyword, locationFilter, categoryFilter, sort, showCount]);

  const totalJobs = jobs.length;
  const shownText =
    filteredJobs.length > 0
      ? `Showing 1-${filteredJobs.length} of ${totalJobs} jobs`
      : "No jobs found";

  return (
    <>
      <section className="find_jobs_hero">
        <div className="find_jobs_overlay">
          <div className="find_jobs_container">
            <h1>
              There Are <span>{totalJobs.toLocaleString()}</span> Postings Here
              For you!
            </h1>
            <p>Discover your next career move, freelance gig, or internship</p>

            <div className="find_jobs_search">
              <div className="find_jobs_search_item">
                <span>⌕</span>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <div className="find_jobs_search_item">
                <span>◎</span>
                <input
                  type="text"
                  placeholder="City or postcode"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>

              <div className="find_jobs_search_item">
                <span>▦</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance">Finance</option>
                  <option value="Content">Content</option>
                </select>
              </div>

              <button type="button">Find Jobs</button>
            </div>
          </div>
        </div>
      </section>

      <section className="find_jobs_area">
        <div className="find_jobs_container">
          {notice ? <div className="find_jobs_toast">{notice}</div> : null}

          <div className="find_jobs_topbar">
            <div className="find_jobs_left_tools">
              <button type="button" className="filter_btn">
                ▾ Filter
              </button>

              <p>{shownText}</p>
            </div>

            <div className="find_jobs_right_tools">
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="new">New Jobs</option>
                <option value="old">Old Jobs</option>
              </select>

              <select
                value={showCount}
                onChange={(e) => setShowCount(Number(e.target.value))}
              >
                <option value={6}>Show 6</option>
                <option value={9}>Show 9</option>
                <option value={12}>Show 12</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="find_jobs_grid">
              {Array.from({ length: 9 }).map((_, index) => (
                <div className="find_job_skeleton" key={index}></div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="find_jobs_empty">
              <h3>No jobs found</h3>
              <p>Try changing your keyword, location, or category.</p>
            </div>
          ) : (
            <div className="find_jobs_grid">
              {filteredJobs.map((job, index) => {
                const saved = savedIds.includes(job.id);

                return (
                  <div
                    className={`find_job_card ${
                      index === 0 ? "find_job_active" : ""
                    }`}
                    key={job.id}
                  >
                    <div className="find_job_head">
                      <Link href={`/jobs/${job.slug}`} className="find_job_logo">
                        {(job.companyName || job.title).charAt(0)}
                      </Link>

                      <div className="find_job_icons">
                        <button
                          type="button"
                          onClick={() => toggleSave(job.id)}
                          className={saved ? "saved_icon" : ""}
                        >
                          ♡
                        </button>
                      </div>
                    </div>

                    <h3>
                      <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
                    </h3>

                    <p className="find_job_company">
                      by <strong>{job.companyName}</strong>{" "}
                      in {job.category || "Design & Creative"}
                    </p>

                    <div className="find_job_tags">
                      <span>{job.employmentType}</span>
                      <span>{job.location}</span>
                      <span>{job.salary || "Salary not specified"}</span>
                    </div>

                    {/* <p className="find_job_days">220 days left to apply</p> */}
                  </div>
                );
              })}
            </div>
          )}

          <div className="find_jobs_pagination">
            <button type="button">←</button>
            <button type="button">1</button>
            <button type="button" className="active">
              2
            </button>
            <button type="button">3</button>
            <button type="button">→</button>
          </div>
        </div>
      </section>
    </>
  );
}