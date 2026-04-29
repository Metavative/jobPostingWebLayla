"use client";

import JobDetailsClient from "@/app/components/jobs/JobDetailsClient";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type JobData = {
  id: string;
  title: string;
  slug: string;
  companyName: string | null;
  category: string | null;
  location: string;
  employmentType: string;
  salary: string | null;
  shortDescription: string | null;
  description: string;
  responsibilities: string | null;
  requirements: string | null;
  status: string;
  createdAt: Date;
};

export default function JobDetailsPage() {
  const params = useParams();
  const slug = String(params.slug || "");

  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setMessage("");

      try {
        const response = await fetch(`/api/jobs/${encodeURIComponent(slug)}`, {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          setMessage(result.message || "Job not found");
          return;
        }

        setJob(result.data);
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong while loading this job.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchJob();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="job_detail_loading_page">
        <section className="applied_hero">
          <div className="applied_container">
            <h1>Loading Job</h1>
            <p>Please wait while we load this job opening.</p>
          </div>
        </section>

        <section className="applied_content">
          <div className="applied_container">
            <div className="find_job_skeleton"></div>
          </div>
        </section>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="job_detail_loading_page">
        <section className="applied_hero">
          <div className="applied_container">
            <h1>Job Not Found</h1>
            <p>{message}</p>
          </div>
        </section>

        <section className="applied_content">
          <div className="applied_container">
            <div className="applied_empty">
              <div className="applied_empty_icon">!</div>
              <h3>This job is not available</h3>
              <p>The job may have been removed, expired, or the link is incorrect.</p>

              <Link href="/jobs">Browse Jobs</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return <JobDetailsClient job={job} />;
}