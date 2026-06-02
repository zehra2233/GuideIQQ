import { useMemo, useState } from "react";
import "./DeleteAnn.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useNavigate } from "react-router-dom";

const announcements = [
  { id: 1,  title: "Spring Semester Exams Schedule Posted",  scheduleType: "Scheduled", publishedDate: "17.05.2024 13:00" },
  { id: 2,  title: "Campus Closed for Holiday",              scheduleType: "Scheduled", publishedDate: "17.05.2024 12:00" },
  { id: 3,  title: "New Library Hours",                      scheduleType: "Scheduled", publishedDate: "17.05.2024 12:00" },
  { id: 4,  title: "Registrar Office Relocation",            scheduleType: "Scheduled", publishedDate: "17.05.2024 12:00" },
  { id: 5,  title: "New Student Orientation Program",        scheduleType: "Scheduled", publishedDate: "18.05.2024 10:00" },
  { id: 6,  title: "IT Maintenance Window Scheduled",        scheduleType: "Scheduled", publishedDate: "19.05.2024 09:00" },
];

const ITEMS_PER_PAGE = 6;

export default function DeleteAipop() {
  const navigate = useNavigate();
  const [currentPage] = useState(1);

  const paginated = useMemo(() =>
    announcements.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    ), [currentPage]);

  const handleDelete = () => {
    console.log("Announcement deleted");
    navigate("/dashboard/announce");
  };

  const handleCancel = () => {
    navigate("/dashboard/announce");
  };

  return (
    <div className="dap-page">

      {/* ── BACKGROUND (blurred) ── */}
      <div className="dap-bg">
        <DashboardSidebar activePage="announcements" />

        <div className="dap-shell">

          {/* TOPBAR */}
          <div className="ann-topbar">
            <div className="ai-topbar-right">
              <div className="ai-user-profile">
                <div className="ai-user-avatar">{(localStorage.getItem("adminName") || "Admin")[0].toUpperCase()}</div>
                <span className="ai-user-name">{localStorage.getItem("adminName") || "Admin"}</span>
              </div>
            </div>
          </div>

          {/* HEADER */}
          <div className="ann-page-header">
            <h1 className="ann-page-title">Announcements</h1>
            <button className="ann-add-btn">+ Add New Announcement</button>
          </div>

          {/* SEARCH */}
          <div className="ai-control-panel">
            <div className="ai-search-row">
              <input type="search" placeholder="Search announcements..." readOnly />
            </div>
          </div>

          {/* TABLE */}
          <div className="ai-table-card">
            <table className="ai-table">
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
                    <td><input type="checkbox" readOnly /></td>
                    <td className="ann-title-cell">{item.title}</td>
                    <td>{item.publishedDate}</td>
                    <td><span className="ann-schedule-badge">{item.scheduleType}</span></td>
                    <td>
                      <div className="ai-actions-cell">
                        <button className="ai-icon-btn">👁</button>
                        <button className="ai-icon-btn">✎</button>
                        <button className="ai-icon-btn">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <footer className="ai-footer">
            <div className="ai-pagination">
              <span className="ai-page-arrow disabled">‹</span>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <span className="ai-page-arrow">›</span>
            </div>
          </footer>

        </div>
      </div>

      {/* ── BLUR OVERLAY ── */}
      <div className="dap-overlay" />

      {/* ── POPUP ── */}
      <div className="dap-popup">
        <div className="dap-popup-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </div>
        <h2 className="dap-popup-title">Delete Announcement</h2>
        <p className="dap-popup-desc">
          Are you sure you want to delete this announcement?<br />
          This action cannot be undone.
        </p>
        <div className="dap-popup-actions">
          <button className="dap-btn dap-btn--cancel" onClick={handleCancel}>Cancel</button>
          <button className="dap-btn dap-btn--delete" onClick={handleDelete}>Yes, Delete</button>
        </div>
      </div>

    </div>
  );
}
