import "./DeleteFaculty.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default function DeleteFaculty() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state?.item ?? {};

  // 🔥 Delete from Firestore
  async function handleDelete() {
    try {
      await deleteDoc(doc(db, "faculty", item.id));
    } catch (err) {
      console.error("Error deleting faculty:", err);
    }
    navigate("/dashboard/faculty");
  }

  return (
    <div className="df-page">

      {/* BLURRED BACKGROUND */}
      <div className="df-bg">
        <DashboardSidebar activePage="faculty" />
        <div className="df-bg-shell">
          <div className="df-bg-topbar" />
          <div className="df-bg-content">
            <div className="df-bg-title">Faculty Directory</div>
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      <div className="df-overlay" onClick={() => navigate("/dashboard/faculty")} />

      {/* POPUP */}
      <div className="df-popup">
        <div className="df-popup-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </div>
        <h2 className="df-popup-title">Delete Member</h2>
        <p className="df-popup-desc">
          Are you sure you want to delete this faculty member?
        </p>
        <div className="df-popup-actions">
          <button className="df-btn df-btn--cancel" onClick={() => navigate("/dashboard/faculty")}>
            Cancel
          </button>
          <button className="df-btn df-btn--delete" onClick={handleDelete}>
            Yes, Delete
          </button>
        </div>
      </div>

    </div>
  );
}