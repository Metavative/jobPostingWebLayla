"use client";

import AdminRouteGuard from "@/app/components/admin/AdminRouteGuard";
import { useEffect, useMemo, useState } from "react";

type EnquiryItem = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  type: string;
  createdAt: string;
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(
    null
  );
  const [replyEnquiry, setReplyEnquiry] = useState<EnquiryItem | null>(null);

  const [replyText, setReplyText] = useState("");
  const [replyNotice, setReplyNotice] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const fetchEnquiries = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/enquiries", {
        credentials: "include",
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Failed to fetch enquiries");
        return;
      }

      setEnquiries(result.data || []);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while loading enquiries");
    } finally {
      setLoading(false);
    }
  };

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const value = search.toLowerCase();

      const matchesSearch =
        item.name.toLowerCase().includes(value) ||
        item.email.toLowerCase().includes(value) ||
        (item.subject || "").toLowerCase().includes(value) ||
        item.message.toLowerCase().includes(value);

      const matchesType = typeFilter === "ALL" || item.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [enquiries, search, typeFilter]);

  const openReplyModal = (item: EnquiryItem) => {
    setReplyEnquiry(item);
    setReplyText("");
    setReplyNotice("");
  };

  const closeReplyModal = () => {
    setReplyEnquiry(null);
    setReplyText("");
    setReplyNotice("");
    setSendingReply(false);
  };

  const sendReply = async () => {
    if (!replyEnquiry) return;

    const cleanMessage = replyText.trim();

    if (!cleanMessage) {
      setReplyNotice("Please write a reply message.");
      return;
    }

    setSendingReply(true);
    setReplyNotice("");

    try {
      const response = await fetch("/api/admin/enquiries/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          enquiryId: replyEnquiry.id,
          message: cleanMessage,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setReplyNotice(result.message || "Failed to send reply");
        return;
      }

      setReplyNotice(result.message || "Reply sent successfully");

      setTimeout(() => {
        closeReplyModal();
      }, 900);
    } catch (error) {
      console.error(error);
      setReplyNotice("Something went wrong while sending reply.");
    } finally {
      setSendingReply(false);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    const confirmed = window.confirm("Delete this enquiry permanently?");
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/enquiries/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to delete enquiry");
        return;
      }

      setEnquiries((prev) => prev.filter((item) => item.id !== id));

      setSelectedEnquiry((prev) => {
        if (prev && prev.id === id) return null;
        return prev;
      });

      setReplyEnquiry((prev) => {
        if (prev && prev.id === id) return null;
        return prev;
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const getTypeClass = (type: string) => {
    if (type === "EMPLOYER") return "employer";
    if (type === "CANDIDATE") return "candidate";
    return "general";
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <AdminRouteGuard>
      <main className="admin_enq_page">
        <div className="admin_enq_head">
          <div>
            <span>Enquiries</span>
            <h1>Contact submissions</h1>
            <p>Review messages, reply by email, and manage enquiry records.</p>
          </div>

          <button type="button" onClick={fetchEnquiries}>
            Refresh
          </button>
        </div>

        <div className="admin_enq_filters">
          <input
            type="text"
            placeholder="Search by name, email, subject, or message"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">All Types</option>
            <option value="GENERAL">General</option>
            <option value="CANDIDATE">Candidate</option>
            <option value="EMPLOYER">Employer</option>
          </select>
        </div>

        {loading ? (
          <div className="admin_enq_state">
            <h3>Loading enquiries...</h3>
            <p>Please wait while we load contact submissions.</p>
          </div>
        ) : message ? (
          <div className="admin_enq_state">
            <h3>Unable to load enquiries</h3>
            <p>{message}</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="admin_enq_state">
            <h3>No enquiries found</h3>
            <p>Try changing your search or filter values.</p>
          </div>
        ) : (
          <div className="admin_enq_grid">
            {filteredEnquiries.map((item) => (
              <div className="admin_enq_card" key={item.id}>
                <div className="admin_enq_card_top">
                  <div className="admin_enq_avatar">
                    {item.name.charAt(0)}
                  </div>

                  <span className={`admin_enq_type ${getTypeClass(item.type)}`}>
                    {item.type}
                  </span>
                </div>

                <h3>{item.name}</h3>
                <p className="admin_enq_email">{item.email}</p>

                <div className="admin_enq_subject">
                  <span>Subject</span>
                  <strong>{item.subject || "No subject"}</strong>
                </div>

                <p className="admin_enq_preview">{item.message}</p>

                <div className="admin_enq_date">
                  Received on {new Date(item.createdAt).toLocaleDateString()}
                </div>

                <div className="admin_enq_actions">
                  <button
                    type="button"
                    onClick={() => setSelectedEnquiry(item)}
                  >
                    Open Message
                  </button>

                  <button type="button" onClick={() => openReplyModal(item)}>
                    Reply
                  </button>

                  <button
                    type="button"
                    className="danger"
                    onClick={() => handleDeleteEnquiry(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedEnquiry ? (
          <div
            className="admin_enq_modal_overlay"
            onClick={() => setSelectedEnquiry(null)}
          >
            <div
              className="admin_enq_modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin_enq_modal_head">
                <div>
                  <span>Enquiry Details</span>
                  <h2>{selectedEnquiry.name}</h2>
                  <p>{selectedEnquiry.email}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                >
                  ×
                </button>
              </div>

              <div className="admin_enq_modal_grid">
                <div>
                  <span>Email</span>
                  <strong>{selectedEnquiry.email}</strong>
                </div>

                <div>
                  <span>Type</span>
                  <strong>{selectedEnquiry.type}</strong>
                </div>

                <div>
                  <span>Subject</span>
                  <strong>{selectedEnquiry.subject || "No subject"}</strong>
                </div>

                <div>
                  <span>Date</span>
                  <strong>
                    {new Date(selectedEnquiry.createdAt).toLocaleString()}
                  </strong>
                </div>
              </div>

              <div className="admin_enq_message">
                <h3>Message</h3>
                <p>{selectedEnquiry.message}</p>
              </div>

              <div className="admin_enq_modal_actions">
                <button
                  type="button"
                  className="primary"
                  onClick={() => {
                    setSelectedEnquiry(null);
                    openReplyModal(selectedEnquiry);
                  }}
                >
                  Reply by Email
                </button>

                <button
                  type="button"
                  className="danger"
                  onClick={() => handleDeleteEnquiry(selectedEnquiry.id)}
                >
                  Delete
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedEnquiry(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {replyEnquiry ? (
          <div className="admin_enq_modal_overlay" onClick={closeReplyModal}>
            <div
              className="admin_enq_modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin_enq_modal_head">
                <div>
                  <span>Reply Email</span>
                  <h2>Reply to {replyEnquiry.name}</h2>
                  <p>{replyEnquiry.email}</p>
                </div>

                <button type="button" onClick={closeReplyModal}>
                  ×
                </button>
              </div>

              <div className="admin_enq_modal_grid">
                <div>
                  <span>Email</span>
                  <strong>{replyEnquiry.email}</strong>
                </div>

                <div>
                  <span>Subject</span>
                  <strong>{replyEnquiry.subject || "No subject"}</strong>
                </div>
              </div>

              <div className="admin_enq_message">
                <h3>Original Message</h3>
                <p>{replyEnquiry.message}</p>
              </div>

              <div className="admin_enq_reply_box">
                <label>Write your reply</label>
                <textarea
                  rows={7}
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
              </div>

              {replyNotice ? (
                <p className="admin_enq_notice">{replyNotice}</p>
              ) : null}

              <div className="admin_enq_modal_actions">
                <button
                  type="button"
                  className="primary"
                  onClick={sendReply}
                  disabled={sendingReply}
                >
                  {sendingReply ? "Sending..." : "Send Reply"}
                </button>

                <button type="button" onClick={closeReplyModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </AdminRouteGuard>
  );
}