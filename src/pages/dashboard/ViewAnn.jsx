import "./ViewAnn.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewAnn() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state?.item ?? {};

  return (
    <div className="ai-page">

      <DashboardSidebar activePage="announcements" />

      <div className="va-shell">

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
        <div className="va-scroll-area">

          {/* PAGE TITLE */}
          <div className="va-page-header">
            <h1 className="va-page-title">University Announcements</h1>
            <button className="va-back-btn" onClick={() => navigate("/dashboard/announce")}>
              ← Back
            </button>
          </div>

          {/* ANNOUNCEMENT CARD */}
          <div className="va-card">

            {/* COLORED HEADER BAR */}
            <div className="va-card-header">
              <span className="va-card-header-icon">📣</span>
              <span className="va-card-header-title">{item.title || "—"}</span>
            </div>

            {/* CONTENT */}
            <div className="va-card-body">
              <p className="va-card-content">
                {item.content || "No additional content available for this announcement."}
              </p>
            </div>

            {/* FOOTER */}
            <div className="va-card-footer">
              <span>Date of addition : {item.publishedDate || "—"}</span>
            </div>

          </div>

          {/* SCHEDULE BADGE */}
          <div className="va-meta">
            <span className="va-meta-label">Schedule Type:</span>
            <span className="va-meta-badge">{item.scheduleType || "—"}</span>
          </div>

        </div>
      </div>
    </div>
  );
}
