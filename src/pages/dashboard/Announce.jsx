import { useState, useEffect } from "react";
import "./Announce.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth } from "../../firebase";

const ITEMS_PER_PAGE = 6;

export default function Announce() {
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Load announcements from Firestore
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "announcements"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAnnouncements(data);
    } catch (err) {
      console.error("Error fetching announcements:", err);
    }
    setLoading(false);
  }

  // 🔥 Delete from Firestore
  async function handleDelete() {
    try {
      await deleteDoc(doc(db, "announcements", deleteId));
      setAnnouncements(prev => prev.filter(a => a.id !== deleteId));
    } catch (err) {
      console.error("Error deleting:", err);
    }
    setShowDelete(false);
  }

  const filtered = announcements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const adminName = auth.currentUser?.displayName || "Admin";

  return (
    <div className="ann-page">
      <DashboardSidebar activePage="announcements" />

      <div className="ann-shell">

        {/* TOPBAR */}
        <div className="ann-topbar">
          <div className="ann-topbar-right">
            <div className="ann-user-profile">
              <div className="ann-user-avatar">{adminName[0].toUpperCase()}</div>
              <span className="ann-user-name">{adminName}</span>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="ann-page-header">
          <h1 className="ann-page-title">Announcements</h1>
          <button className="ann-add-btn" onClick={() => navigate("/dashboard/add-announcement")}>
            +&nbsp;&nbsp;Add New Announcement
          </button>
        </div>

        {/* SEARCH */}
        <div className="ann-control-panel">
          <div className="ann-search-row">
            <input
              type="text"
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="ann-table-card">
          {loading ? (
            <p style={{ textAlign: "center", padding: "20px" }}>Loading...</p>
          ) : (
            <table className="ann-table">
              <thead>
                <tr>
                  <th style={{ width: "50px" }}></th>
                  <th>Title</th>
                  <th>Published Date</th>
                  <th>Schedule Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>No announcements found</td></tr>
                ) : (
                  paginated.map((item) => (
                    <tr key={item.id}>
                      <td><input type="checkbox" className="ann-checkbox" /></td>
                      <td className="ann-title-cell">{item.title}</td>
                      <td>{item.publishedDate}</td>
                      <td><span className="ann-schedule-badge">{item.scheduleType}</span></td>
                      <td>
                        <div className="ann-actions-cell">
                          <button className="ann-icon-btn" onClick={() => navigate("/dashboard/view-announcement", { state: { item } })}>👁</button>
                          <button className="ann-icon-btn" onClick={() => navigate("/dashboard/edit-announcement", { state: { item } })}>✎</button>
                          <button className="ann-icon-btn" onClick={() => { setDeleteId(item.id); setShowDelete(true); }}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* PAGINATION */}
        <footer className="ann-footer">
          <div className="ann-pagination">
            <span className={`ann-page-arrow ${currentPage === 1 ? "disabled" : ""}`} onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>‹</span>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={currentPage === p ? "active" : ""} onClick={() => setCurrentPage(p)}>{p}</button>
            ))}
            <span className={`ann-page-arrow ${currentPage === totalPages ? "disabled" : ""}`} onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}>›</span>
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
            <h2 className="del-popup-title">Delete Announcement</h2>
            <p className="del-popup-desc">
              Are you sure you want to delete this announcement?<br />
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