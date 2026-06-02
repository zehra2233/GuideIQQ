import { useState } from "react";
import "./Announce.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useNavigate } from "react-router-dom";

export const STORAGE_KEY = "guideiq_announcements";

const defaultAnnouncements = [
  { id: 1,  title: "Spring Semester Exams Schedule Posted",  scheduleType: "Scheduled", publishedDate: "17.05.2024 13:00" },
  { id: 2,  title: "Campus Closed for Holiday",              scheduleType: "Scheduled", publishedDate: "17.05.2024 12:00" },
  { id: 3,  title: "New Library Hours",                      scheduleType: "Scheduled", publishedDate: "17.05.2024 12:00" },
  { id: 4,  title: "Registrar Office Relocation",            scheduleType: "Scheduled", publishedDate: "17.05.2024 12:00" },
  { id: 5,  title: "New Student Orientation Program",        scheduleType: "Scheduled", publishedDate: "18.05.2024 10:00" },
  { id: 6,  title: "IT Maintenance Window Scheduled",        scheduleType: "Scheduled", publishedDate: "19.05.2024 09:00" },
  { id: 7,  title: "Cafeteria Menu Update",                  scheduleType: "Scheduled", publishedDate: "19.05.2024 10:00" },
  { id: 8,  title: "Scholarship Application Deadline",       scheduleType: "Scheduled", publishedDate: "20.05.2024 11:00" },
  { id: 9,  title: "Guest Lecture: AI in Healthcare",        scheduleType: "Scheduled", publishedDate: "20.05.2024 14:00" },
  { id: 10, title: "Parking Lot Closure Notice",             scheduleType: "Scheduled", publishedDate: "21.05.2024 08:00" },
  { id: 11, title: "Student Council Elections",              scheduleType: "Scheduled", publishedDate: "21.05.2024 09:00" },
  { id: 12, title: "End of Year Ceremony Details",           scheduleType: "Scheduled", publishedDate: "22.05.2024 10:00" },
  { id: 13, title: "Summer Internship Fair",                 scheduleType: "Scheduled", publishedDate: "22.05.2024 13:00" },
];

function loadAnnouncements() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore parse errors */ }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAnnouncements));
  return defaultAnnouncements;
}

const ITEMS_PER_PAGE = 6;

export default function Announce() {
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState(loadAnnouncements);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = announcements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleDelete() {
    const updated = announcements.filter(a => a.id !== deleteId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setAnnouncements(updated);
    setShowDelete(false);
  }

  return (
    <div className="ann-page">

      <DashboardSidebar activePage="announcements" />

      <div className="ann-shell">

        {/* TOPBAR */}
        <div className="ann-topbar">
          <div className="ann-topbar-right">
            <div className="ann-user-profile">
              <div className="ann-user-avatar">{(localStorage.getItem("adminName") || "Admin")[0].toUpperCase()}</div>
              <span className="ann-user-name">{localStorage.getItem("adminName") || "Admin"}</span>
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
              {paginated.map((item) => (
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
              ))}
            </tbody>
          </table>
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
