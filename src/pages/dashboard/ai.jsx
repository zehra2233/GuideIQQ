import { useEffect, useMemo, useState } from "react";
import "./ai.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "guideiq_questions";

const defaultQuestions = [
  { id: 1,  question: "The library is open from 08:00 AM to 10:00 PM on weekdays", answer: "Exams are online via the portal and specific schedule.", category: "Announcement" },
  { id: 2,  question: "How do I register?", answer: "Exams are online via the portal and specific schedule.", category: "Announcement" },
  { id: 3,  question: "Campus library hours?", answer: "The library is open from 08:00 AM to 10:00 PM on weekdays.", category: "Announcement" },
  { id: 4,  question: "Faculty directory?", answer: "You can find the faculty directory on the university website.", category: "Academic Program" },
  { id: 5,  question: "Where are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 6,  question: "IT support contact?", answer: "You can contact IT support via it.support@uskudar.edu.tr.", category: "Announcement" },
  { id: 7,  question: "Where are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 8,  question: "Where are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 9,  question: "Where are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 10, question: "Where are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 11, question: "Where are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 12, question: "Where are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 13, question: "Where are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
];

function loadQuestions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultQuestions));
  return defaultQuestions;
}

const ITEMS_PER_PAGE = 6;

export default function Ai() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState(loadQuestions);
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return questions.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) return false;
      if (!searchValue) return true;
      return (
        item.question.toLowerCase().includes(searchValue) ||
        item.answer.toLowerCase().includes(searchValue)
      );
    });
  }, [questions, activeCategory, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleDelete() {
    const updated = questions.filter(q => q.id !== deleteId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setQuestions(updated);
    setShowDelete(false);
  }

  return (
    <div className="ai-page">

      <DashboardSidebar activePage="questions" />

      <div className="ai-shell">

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
            <button
              className="ai-button ai-button--ghost"
              onClick={() => navigate("/dashboard/add-question")}
            >
              +&nbsp;&nbsp;Add New Question
            </button>
          </div>
        </header>

        {/* FILTER */}
        <section className="ai-control-panel">
          <div className="ai-pill-row">
            {["all", "Announcement", "Academic Program"].map((cat) => {
              const count = cat === "all"
                ? questions.length
                : questions.filter((q) => q.category === cat).length;
              return (
                <button
                  key={cat}
                  className={`ai-pill ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => { setActiveCategory(cat); setCurrentPage(1); }}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          <div className="ai-search-row">
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={activeCategory}
              onChange={(e) => { setActiveCategory(e.target.value); setCurrentPage(1); }}
            >
              <option value="all">All Categories</option>
              <option value="Announcement">Announcement</option>
              <option value="Academic Program">Academic Program</option>
            </select>
          </div>
        </section>

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
                  <td><input type="checkbox" /></td>
                  <td>{item.question}</td>
                  <td>{item.answer}</td>
                  <td>
                    <span className={`ai-badge ${item.category === "Announcement" ? "ai-badge--announcement" : "ai-badge--academic"}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="ai-actions-cell">
                    <button className="ai-icon-btn" onClick={() => navigate("/dashboard/view-question", { state: { item } })}>👁</button>
                    <button className="ai-icon-btn" onClick={() => navigate("/dashboard/edit-question", { state: { item } })}>✎</button>
                    <button className="ai-icon-btn" onClick={() => { setDeleteId(item.id); setShowDelete(true); }}>🗑</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* PAGINATION */}
        <footer className="ai-footer">
          <div className="ai-pagination">
            <span
              className={`ai-page-arrow ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            >‹</span>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => setCurrentPage(page)}
              >{page}</button>
            ))}

            <span
              className={`ai-page-arrow ${currentPage === totalPages ? "disabled" : ""}`}
              onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            >›</span>
          </div>
        </footer>

      </div>

      {/* DELETE MODAL */}
      {showDelete && (
        <>
          <div className="del-overlay" onClick={() => setShowDelete(false)} />
          <div className="del-popup">
            <div className="del-popup-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </div>
            <h2 className="del-popup-title">Delete Question</h2>
            <p className="del-popup-desc">
              Are you sure you want to delete this question?<br />
              This action cannot be undone.
            </p>
            <div className="del-popup-actions">
              <button className="del-btn del-btn--cancel" onClick={() => setShowDelete(false)}>Cancel</button>
              <button className="del-btn del-btn--delete" onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
