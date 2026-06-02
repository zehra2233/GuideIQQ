import "./ViewFaculty.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useLocation, useNavigate } from "react-router-dom";

export default function ViewFaculty() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state?.item ?? {};

  return (
    <div className="vf-page">

      <DashboardSidebar activePage="faculty" />

      <div className="vf-shell">

        {/* TOPBAR */}
        <div className="vf-topbar">
          <div className="vf-topbar-right">
            <div className="vf-user-profile">
              <div className="vf-user-avatar">
                {(localStorage.getItem("adminName") || "Admin")[0].toUpperCase()}
              </div>
              <span className="vf-user-name">
                {localStorage.getItem("adminName") || "Admin"}
              </span>
            </div>
          </div>
        </div>

        {/* SCROLL AREA */}
        <div className="vf-scroll-area">

          {/* HEADER */}
          <div className="vf-page-header">
            <h1 className="vf-page-title">Faculty Directory</h1>
            <button className="vf-back-btn" onClick={() => navigate("/dashboard/faculty")}>
              ← Back
            </button>
          </div>

          {/* CARD */}
          <div className="vf-card">

            {/* CARD HEADER */}
            <div className="vf-card-header">
              <div className="vf-card-avatar">
                {item.photo
                  ? <img src={item.photo} alt={item.name} className="vf-card-photo" />
                  : <span>{(item.name || "?").split(" ").slice(-1)[0][0]}</span>
                }
              </div>
              <div className="vf-card-header-info">
                <span className="vf-card-name">{item.name || "—"}</span>
                <span className="vf-card-dept">{item.department || "—"}</span>
              </div>
            </div>

            {/* DETAIL ROWS */}
            <div className="vf-card-body">

              <div className="vf-detail-row">
                <span className="vf-detail-label">📧 Email</span>
                <span className="vf-detail-value">{item.email || "—"}</span>
              </div>

              <div className="vf-detail-row">
                <span className="vf-detail-label">📞 Phone</span>
                <span className="vf-detail-value">{item.phone || "—"}</span>
              </div>

              <div className="vf-detail-row">
                <span className="vf-detail-label">📍 Office Location</span>
                <span className="vf-detail-value">{item.office || "—"}</span>
              </div>

              <div className="vf-detail-row">
                <span className="vf-detail-label">🕐 Office Hours</span>
                <span className="vf-detail-value vf-hours-badge">{item.hours || "—"}</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
