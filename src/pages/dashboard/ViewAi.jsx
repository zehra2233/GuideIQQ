import "./ViewAi.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewAi() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state?.item ?? {};

  return (
    <div className="ai-page">

      <DashboardSidebar activePage="questions" />

      <div className="vai-shell">

        {/* TOPBAR */}
        <div className="va-topbar">
          <div className="va-topbar-right">
            <div className="va-user-profile">
              <div className="va-user-avatar">{(localStorage.getItem("adminName") || "Admin")[0].toUpperCase()}</div>
              <span className="va-user-name">{localStorage.getItem("adminName") || "Admin"}</span>
            </div>
          </div>
        </div>

        {/* SCROLL AREA */}
        <div className="vai-scroll-area">

          {/* PAGE TITLE */}
          <div className="va-page-header">
            <h1 className="va-page-title">ChatBox Questions</h1>
            <button className="va-back-btn" onClick={() => navigate("/dashboard/ai")}>
              ← Back
            </button>
          </div>

          {/* MAIN CARD */}
          <div className="vai-card">

            {/* BLUE HEADER */}
            <div className="vai-card-header">
              <div className="vai-header-left">
                <span className="vai-header-icon">💬</span>
                <div>
                  <p className="vai-header-eyebrow">Question Detail</p>
                  <p className="vai-header-sub">ChatBox Q&amp;A Entry</p>
                </div>
              </div>
              <span className="vai-category-chip">{item.category || "—"}</span>
            </div>

            {/* QUESTION BLOCK */}
            <div className="vai-section">
              <div className="vai-section-label">
                Question
              </div>
              <div className="vai-section-content">
                {item.question || "—"}
              </div>
            </div>

            <div className="vai-divider" />

            {/* ANSWER BLOCK */}
            <div className="vai-section">
              <div className="vai-section-label">
                Answer
              </div>
              <div className="vai-section-content">
                {item.answer || "No answer available for this question."}
              </div>
            </div>

            <div className="vai-divider" />

            {/* META ROW */}
            <div className="vai-meta-row">
              <div className="vai-meta-item">
                <span className="vai-meta-key">Category</span>
                <span className="vai-meta-val">{item.category || "—"}</span>
              </div>
              <div className="vai-meta-item">
                <span className="vai-meta-key">ID</span>
                <span className="vai-meta-val">#{item.id ?? "—"}</span>
              </div>
              <div className="vai-meta-item">
                <span className="vai-meta-key">Status</span>
                <span className="vai-meta-val vai-status-active">Active</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
