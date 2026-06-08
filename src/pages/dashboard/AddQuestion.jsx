import { useState } from "react";
import "./AddQuestion.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddQuestion() {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Save to Firestore
  const handlePublish = async () => {
    if (!question.trim()) { setError("Please enter a question."); return; }
    if (!answer.trim()) { setError("Please enter an answer."); return; }
    if (!selectedCategory) { setError("Please select a category."); return; }

    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "questions"), {
        question: question.trim(),
        answer: answer.trim(),
        category: selectedCategory,
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.email || "admin"
      });
      navigate("/dashboard/ai");
    } catch (err) {
      console.error("Error adding question:", err);
      setError("Failed to save. Please try again.");
    }
    setLoading(false);
  };

  const handleCancel = () => navigate("/dashboard/ai");

  const adminName = auth.currentUser?.displayName || "Admin";

  return (
    <div className="ai-page">
      <DashboardSidebar activePage="questions" />

      <div className="aq-shell">

        {/* TOPBAR */}
        <div className="aq-topbar">
          <div className="aq-topbar-right">
            <div className="aq-user-profile">
              <div className="aq-user-avatar">{adminName[0].toUpperCase()}</div>
              <span className="aq-user-name">{adminName}</span>
            </div>
          </div>
        </div>

        <div className="aq-scroll-area">

          <header className="aq-header">
            <div className="aq-header-title">
              <h1>Add New Question</h1>
            </div>
          </header>

          {/* ERROR */}
          {error && <p style={{ color: "red", fontSize: "13px", margin: "0 0 10px 0" }}>{error}</p>}

          {/* QUESTION */}
          <div className="aq-form-group">
            <label className="aq-form-label">
              <span className="aq-step">1.</span> Add Question
            </label>
            <textarea className="aq-textarea" placeholder="Type the question here..."
              value={question} onChange={(e) => setQuestion(e.target.value)} maxLength={200} />
            <div className="aq-char-count">{question.length} / 200</div>
          </div>

          {/* ANSWER */}
          <div className="aq-form-group">
            <label className="aq-form-label">
              <span className="aq-step">2.</span> Add Answer
            </label>
            <textarea className="aq-textarea" placeholder="Type the answer here..."
              value={answer} onChange={(e) => setAnswer(e.target.value)} maxLength={2000} />
            <div className="aq-char-count">{answer.length} / 2000</div>
          </div>

          {/* CATEGORY */}
          <div className="aq-form-group">
            <label className="aq-form-label">
              <span className="aq-step">3.</span> Select Category
            </label>
            <div className="aq-category-options">
              <label className="aq-category-option">
                <input type="radio" name="category" value="Announcement"
                  checked={selectedCategory === "Announcement"}
                  onChange={(e) => setSelectedCategory(e.target.value)} />
                <div className="aq-category-card">
                  <div className="aq-category-icon">📣</div>
                  <div className="aq-category-text">
                    <strong>Announcement</strong>
                    <p>General announcements and important updates.</p>
                  </div>
                </div>
              </label>
              <label className="aq-category-option">
                <input type="radio" name="category" value="Academic Program"
                  checked={selectedCategory === "Academic Program"}
                  onChange={(e) => setSelectedCategory(e.target.value)} />
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
            <button className="aq-btn aq-btn--publish" onClick={handlePublish} disabled={loading}>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="white"
                style={{ marginRight: '10px', verticalAlign: 'middle', transform: 'rotate(-45deg)', marginBottom: '6px' }}>
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}