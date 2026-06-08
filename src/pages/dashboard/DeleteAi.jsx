import "./DeleteAi.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function DeleteAi() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state?.item ?? {};

  // 🔥 Delete from Firestore
  async function handleDelete() {
    try {
      await deleteDoc(doc(db, "questions", item.id));
    } catch (err) {
      console.error("Error deleting question:", err);
    }
    navigate("/dashboard/ai");
  }

  const handleCancel = () => navigate("/dashboard/ai");

  return (
    <div className="dai-page">

      {/* BACKGROUND */}
      <div className="dai-bg">
        <DashboardSidebar activePage="questions" />
        <div className="dai-shell">
          <div className="ai-topbar">
            <div className="ai-topbar-right">
              <div className="ai-user-profile">
                <div className="ai-user-avatar">A</div>
                <span className="ai-user-name">Admin</span>
              </div>
            </div>
          </div>
          <header className="ai-header">
            <div className="ai-header-copy">
              <h1>ChatBox Questions</h1>
            </div>
          </header>
        </div>
      </div>

      {/* OVERLAY */}
      <div className="dai-overlay" />

      {/* POPUP */}
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