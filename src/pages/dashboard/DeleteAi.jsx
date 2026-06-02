import { useMemo, useState } from "react";
import "./DeleteAi.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useNavigate } from "react-router-dom";

const questions = [
  { id: 1, question: "The library is open from 08:00 AM to 10:00 PM on weekdays", answer: "Exams are online via the portal and specific schedule.", category: "Announcement" },
  { id: 2, question: "How do I register?", answer: "Exams are online via the portal and specific schedule.", category: "Announcement" },
  { id: 3, question: "Campus library hours?", answer: "The library is open from 08:00 AM to 10:00 PM on weekdays.", category: "Announcement" },
  { id: 4, question: "Faculty directory?", answer: "You can find the faculty directory on the university website.", category: "Academic Program" },
  { id: 5, question: "Where are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 6, question: "IT support contact?", answer: "You can contact IT support via it.support@uskudar.edu.tr.", category: "Announcement" },
];

const ITEMS_PER_PAGE = 6;

export default function DeleteAi() {
  const navigate = useNavigate();
  const [currentPage] = useState(1);

  const paginated = useMemo(() =>
    questions.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    ), [currentPage]);

  const handleDelete = () => {
    console.log("Question deleted");
    navigate("/dashboard/ai");
  };

  const handleCancel = () => {
    navigate("/dashboard/ai");
  };

  return (
    <div className="dai-page">

      {/* ── BACKGROUND (blurred) ── */}
      <div className="dai-bg">
        <DashboardSidebar activePage="questions" />

        <div className="dai-shell">

          {/* TOPBAR */}
          <div className="ai-topbar">
            <div className="ai-topbar-right">
              <div className="ai-user-profile">
                <div className="ai-user-avatar">{(localStorage.getItem("adminName") || "Admin")[0].toUpperCase()}</div>
                <span className="ai-user-name">{localStorage.getItem("adminName") || "Admin"}</span>
              </div>
            </div>
          </div>

          {/* HEADER */}
          <header className="ai-header">
            <div className="ai-header-copy">
              <h1>ChatBox Questions</h1>
            </div>
            <div className="ai-header-actions">
              <button className="ai-button ai-button--ghost">+ Add New Question</button>
            </div>
          </header>

          {/* FILTER */}
          <section className="ai-control-panel">
            <div className="ai-pill-row">
              {["all", "Announcement", "Academic Program"].map((cat) => (
                <button key={cat} className={`ai-pill ${cat === "all" ? "active" : ""}`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="ai-search-row">
              <input type="search" placeholder="Search questions..." readOnly />
              <select readOnly defaultValue="all">
                <option value="all">All Categories</option>
              </select>
            </div>
          </section>

          {/* TABLE */}
          <section className="ai-table-card">
            <table className="ai-table">
              <thead>
                <tr>
                  <th />
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((item) => (
                  <tr key={item.id}>
                    <td><input type="checkbox" readOnly /></td>
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
                    <td>
                      <span className={`ai-badge ${item.category === "Announcement" ? "ai-badge--announcement" : "ai-badge--academic"}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="ai-actions-cell">
                      <button className="ai-icon-btn">👁</button>
                      <button className="ai-icon-btn">✎</button>
                      <button className="ai-icon-btn">🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* FOOTER */}
          <footer className="ai-footer">
            <div className="ai-pagination">
              <span className="ai-page-arrow disabled">‹</span>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <span className="ai-page-arrow">›</span>
            </div>
          </footer>

        </div>
      </div>

      {/* ── OVERLAY ── */}
      <div className="dai-overlay" />

      {/* ── POPUP ── */}
      <div className="dai-popup">
        <div className="dai-popup-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </div>
        <h2 className="dai-popup-title">Delete Question</h2>
        <p className="dai-popup-desc">
          Are you sure you want to delete this question?<br />
          This action cannot be undone.
        </p>
        <div className="dai-popup-actions">
          <button className="dai-btn dai-btn--cancel" onClick={handleCancel}>Cancel</button>
          <button className="dai-btn dai-btn--delete" onClick={handleDelete}>Yes, Delete</button>
        </div>
      </div>

    </div>
  );
}
