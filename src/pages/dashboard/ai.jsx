import { useEffect, useMemo, useState } from "react";
import "./ai.css";

const questions = [
  { id: 1, question: "The library is open from 08:00 AM to 10:00 PM on weekdays", answer: "Exams are online via the portal and specific schedule.", category: "Announcement" },
  { id: 2, question: "How do I register?", answer: "Exams are online via the portal and specific schedule.", category: "Announcement" },
  { id: 3, question: "Campus library hours?", answer: "The library is open from 08:00 AM to 10:00 PM on weekdays.", category: "Announcement" },
  { id: 4, question: "Faculty directory?", answer: "You can find the faculty directory on the university website.", category: "Academic Program" },
  { id: 5, question: "Where are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 6, question: "IT support contact?", answer: "You can contact IT support via it.support@uskudar.edu.tr.", category: "Announcement" },
  { id: 7, question: "Where are uguigiyfgiy exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 8, question: "Where are exam hgyjhgyjfy results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 9, question: "Where are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 10, question: "Where are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
  { id: 11, question: "Where are exhgiuguigo am results?", answer: "You can view your uhuihuresults from the student portal.", category: "Academic Program" },
  { id: 12, question: "Where are uihguighuoexam results?", answer: "You can view yourhuuih results from the student portal.", category: "Academic Program" },
  { id: 13, question: "Whereuighuighuo are exam results?", answer: "You can view your results from the student portal.", category: "Academic Program" },
];

const ITEMS_PER_PAGE = 6;

export default function Ai() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ FILTER (STRICT)
  const filtered = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return questions.filter((item) => {
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }

      if (!searchValue) return true;

      return (
        item.question.toLowerCase().includes(searchValue) ||
        item.answer.toLowerCase().includes(searchValue)
      );
    });
  }, [activeCategory, search]);

  // ✅ RESET PAGE WHEN FILTER CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  // ✅ FIX: prevent invalid page
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="ai-page">
      {/* SIDEBAR */}
      <aside className="ai-sidebar">
        <div className="ai-brand">
          <div className="ai-brand-icon">IQ</div>
          <div>
            <p className="ai-brand-title">GuideIQ</p>
            <p className="ai-brand-subtitle">T.C. Üsküdar Üniversitesi</p>
          </div>
        </div>

        <nav className="ai-nav">
          <button className="ai-nav-item">Dashboard</button>
          <button className="ai-nav-item">Universities</button>
          <button className="ai-nav-item">Professors</button>
          <button className="ai-nav-item">Academic Programs</button>
          <button className="ai-nav-item">Calendar</button>
          <button className="ai-nav-item">Announcements</button>
          <button className="ai-nav-item ai-nav-item--active">AI Question Log</button>
          <button className="ai-nav-item">Users</button>
          <button className="ai-nav-item">Settings</button>
        </nav>

        <div className="ai-status-card">
          <span className="ai-status-label">System Status</span>
          <div className="ai-status-row">
            <span className="ai-status-indicator" />
            <strong>Active</strong>
          </div>
        </div>

        <button className="ai-university-button">
          Change University
        </button>
      </aside>

      {/* MAIN */}
    <main className="ai-main"> <div className="ai-shell"> <header className="ai-header"> <div className="ai-header-copy"> <h1> ChatBox Questions</h1> </div> <div className="ai-header-actions"> <button className="ai-button ai-button--ghost"> + Add New Question</button> </div> </header>

          {/* FILTER */}
          <section className="ai-control-panel">

            <div className="ai-pill-row">
              {["all", "Announcement", "Academic Program"].map((cat) => {
                const count =
                  cat === "all"
                    ? questions.length
                    : questions.filter((q) => q.category === cat).length;

                return (
                  <button
                    key={cat}
                    className={`ai-pill ${activeCategory === cat ? "active" : ""}`}
                    onClick={() => {
                      setActiveCategory(cat);
                      setCurrentPage(1);
                    }}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            <div className="ai-search-row">
              <input
                type="search"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <select
                value={activeCategory}
                onChange={(e) => {
                  setActiveCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Categories</option>
                <option value="Announcement">Announcement</option>
                <option value="Academic Program">Academic Program</option>
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
                    <td><input type="checkbox" /></td>
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
                    <td>
                      <span className={`ai-badge ${
                        item.category === "Announcement"
                          ? "ai-badge--announcement"
                          : "ai-badge--academic"
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="ai-actions-cell">
                      <button className="ai-icon-btn">✎</button>
                      <button className="ai-icon-btn">🗑</button>
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
                onClick={() =>
                  currentPage > 1 && setCurrentPage(currentPage - 1)
                }
              >
                ‹
              </span>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={currentPage === page ? "active" : ""}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <span
                className={`ai-page-arrow ${currentPage === totalPages ? "disabled" : ""}`}
                onClick={() =>
                  currentPage < totalPages &&
                  setCurrentPage(currentPage + 1)
                }
              >
                ›
              </span>

            </div>
          </footer>

        </div>
      </main>
    </div>
  );
}