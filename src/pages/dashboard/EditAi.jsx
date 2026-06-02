import { useState } from "react";
import "./AddQuestion.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useLocation, useNavigate } from "react-router-dom";

const STORAGE_KEY = "guideiq_questions";

export default function EditAi() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state?.item ?? {};

  const [question, setQuestion]           = useState(item.question ?? "");
  const [answer, setAnswer]               = useState(item.answer   ?? "");
  const [selectedCategory, setSelectedCategory] = useState(item.category ?? "");

  const handleSave = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const all = stored ? JSON.parse(stored) : [];
    const updated = all.map(q =>
      q.id === item.id
        ? { ...q, question, answer, category: selectedCategory }
        : q
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    navigate("/dashboard/ai");
  };

  const handleCancel = () => navigate("/dashboard/ai");

  return (
    <div className="ai-page">

      <DashboardSidebar activePage="questions" />

      <div className="aq-shell">

        {/* TOPBAR */}
        <div className="aq-topbar">
          <div className="aq-topbar-right">
            <div className="aq-user-profile">
              <div className="aq-user-avatar">{(localStorage.getItem("adminName") || "Admin")[0].toUpperCase()}</div>
              <span className="aq-user-name">{localStorage.getItem("adminName") || "Admin"}</span>
            </div>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="aq-scroll-area">

          <header className="aq-header">
            <div className="aq-header-title">
              <h1>Edit Question</h1>
            </div>
          </header>

          {/* QUESTION */}
          <div className="aq-form-group">
            <label className="aq-form-label">
              <span className="aq-step">1.</span> Question
            </label>
            <textarea
              className="aq-textarea"
              placeholder="Type the question here..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={200}
            />
            <div className="aq-char-count">{question.length} / 200</div>
          </div>

          {/* ANSWER */}
          <div className="aq-form-group">
            <label className="aq-form-label">
              <span className="aq-step">2.</span> Answer
            </label>
            <textarea
              className="aq-textarea"
              placeholder="Type the answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              maxLength={2000}
            />
            <div className="aq-char-count">{answer.length} / 2000</div>
          </div>

          {/* CATEGORY */}
          <div className="aq-form-group">
            <label className="aq-form-label">
              <span className="aq-step">3.</span> Select Category
            </label>
            <div className="aq-category-options">
              <label className="aq-category-option">
                <input
                  type="radio"
                  name="category"
                  value="Announcement"
                  checked={selectedCategory === "Announcement"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <div className="aq-category-card">
                  <div className="aq-category-icon">📣</div>
                  <div className="aq-category-text">
                    <strong>Announcement</strong>
                    <p>General announcements and important updates.</p>
                  </div>
                </div>
              </label>
              <label className="aq-category-option">
                <input
                  type="radio"
                  name="category"
                  value="Academic Program"
                  checked={selectedCategory === "Academic Program"}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                />
                <div className="aq-category-card">
                  <div className="aq-category-icon">🎓</div>
                  <div className="aq-category-text">
                    <strong>Academic Program</strong>
                    <p>Questions related to academic programs and courses.</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="aq-form-actions">
            <button className="aq-btn aq-btn--cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button className="aq-btn aq-btn--publish" onClick={handleSave}>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="white" style={{ marginRight: "10px", verticalAlign: "middle", marginBottom: "3px" }}>
                <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
              </svg>
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
