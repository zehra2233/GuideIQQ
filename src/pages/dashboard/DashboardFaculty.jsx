import { useState } from "react";
import "./DashboardFaculty.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useNavigate } from "react-router-dom";

export const FACULTY_KEY = "guideiq_faculty";

const defaultFaculty = [
  { id: 1,  name: "Prof. Dr. Ahmet Yılmaz",      department: "Computer Engineering",    email: "ahmet.yilmaz@uskudar.edu.tr",   phone: "+90 216 400 2222", office: "B Block, Room 301", hours: "Mon-Wed 10:00–12:00" },
  { id: 2,  name: "Doç. Dr. Fatma Kaya",         department: "Psychology",              email: "fatma.kaya@uskudar.edu.tr",     phone: "+90 216 400 2223", office: "A Block, Room 112", hours: "Tue-Thu 13:00–15:00" },
  { id: 3,  name: "Dr. Öğr. Üyesi Murat Demir",  department: "Business Administration", email: "murat.demir@uskudar.edu.tr",    phone: "+90 216 400 2224", office: "C Block, Room 205", hours: "Mon-Fri 09:00–11:00" },
  { id: 4,  name: "Prof. Dr. Ayşe Şahin",        department: "Nursing",                 email: "ayse.sahin@uskudar.edu.tr",     phone: "+90 216 400 2225", office: "D Block, Room 410", hours: "Wed-Fri 14:00–16:00" },
  { id: 5,  name: "Doç. Dr. Hasan Çelik",        department: "Physiotherapy",           email: "hasan.celik@uskudar.edu.tr",    phone: "+90 216 400 2226", office: "E Block, Room 102", hours: "Mon-Thu 11:00–13:00" },
  { id: 6,  name: "Dr. Öğr. Üyesi Zeynep Arslan", department: "Medicine",              email: "zeynep.arslan@uskudar.edu.tr",  phone: "+90 216 400 2227", office: "F Block, Room 308", hours: "Tue-Wed 10:00–12:00" },
  { id: 7,  name: "Prof. Dr. Emre Doğan",        department: "Architecture",            email: "emre.dogan@uskudar.edu.tr",     phone: "+90 216 400 2228", office: "A Block, Room 215", hours: "Mon-Fri 13:00–15:00" },
  { id: 8,  name: "Doç. Dr. Selin Koç",          department: "Law",                     email: "selin.koc@uskudar.edu.tr",      phone: "+90 216 400 2229", office: "B Block, Room 120", hours: "Thu-Fri 09:00–11:00" },
  { id: 9,  name: "Dr. Öğr. Üyesi Ali Polat",    department: "Dentistry",               email: "ali.polat@uskudar.edu.tr",      phone: "+90 216 400 2230", office: "C Block, Room 312", hours: "Tue-Thu 14:00–16:00" },
  { id: 10, name: "Prof. Dr. Neslihan Güneş",     department: "Pharmacy",               email: "neslihan.gunes@uskudar.edu.tr", phone: "+90 216 400 2231", office: "D Block, Room 201", hours: "Mon-Wed 11:00–13:00" },
  { id: 11, name: "Doç. Dr. Tarık Özkan",        department: "Communication",           email: "tarik.ozkan@uskudar.edu.tr",    phone: "+90 216 400 2232", office: "E Block, Room 405", hours: "Wed-Fri 10:00–12:00" },
  { id: 12, name: "Dr. Öğr. Üyesi Gül Aydın",    department: "Fine Arts",              email: "gul.aydin@uskudar.edu.tr",      phone: "+90 216 400 2233", office: "F Block, Room 110", hours: "Mon-Thu 15:00–17:00" },
];

function loadFaculty() {
  try {
    const stored = localStorage.getItem(FACULTY_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  localStorage.setItem(FACULTY_KEY, JSON.stringify(defaultFaculty));
  return defaultFaculty;
}

const ITEMS_PER_PAGE = 6;

export default function DashboardFaculty() {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(loadFaculty);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = faculty.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.department.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  function handleDelete() {
    const updated = faculty.filter((f) => f.id !== deleteId);
    localStorage.setItem(FACULTY_KEY, JSON.stringify(updated));
    setFaculty(updated);
    setShowDelete(false);
  }

  return (
    <div className="fac-dash-page">

      <DashboardSidebar activePage="faculty" />

      <div className="fac-dash-shell">

        {/* TOPBAR */}
        <div className="fac-dash-topbar">
          <div className="fac-dash-topbar-right">
            <div className="fac-dash-user-profile">
              <div className="fac-dash-user-avatar">
                {(localStorage.getItem("adminName") || "Admin")[0].toUpperCase()}
              </div>
              <span className="fac-dash-user-name">
                {localStorage.getItem("adminName") || "Admin"}
              </span>
            </div>
          </div>
        </div>

        {/* HEADER */}
        <div className="fac-dash-page-header">
          <h1 className="fac-dash-page-title">Faculty Directory</h1>
          <button className="fac-dash-add-btn" onClick={() => navigate("/dashboard/add-faculty")}>
            +&nbsp;&nbsp;Add New Faculty
          </button>
        </div>

        {/* SEARCH */}
        <div className="fac-dash-control-panel">
          <div className="fac-dash-search-row">
            <input
              type="text"
              placeholder="Search by name or department..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="fac-dash-table-card">
          <table className="fac-dash-table">
            <thead>
              <tr>
                <th style={{ width: "50px" }}></th>
                <th style={{ width: "60px" }}>Photo</th>
                <th>Name</th>
                <th>Department</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Office Location</th>
                <th>Office Hours</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item.id}>
                  <td><input type="checkbox" className="fac-dash-checkbox" /></td>
                  <td>
                    <div className="fac-dash-avatar">
                      {item.photo
                        ? <img src={item.photo} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                        : item.name.split(" ").slice(-1)[0][0]
                      }
                    </div>
                  </td>
                  <td className="fac-dash-name-cell">{item.name}</td>
                  <td><span className="fac-dash-dept-badge">{item.department}</span></td>
                  <td className="fac-dash-email-cell">{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.office}</td>
                  <td><span className="fac-dash-hours-badge">{item.hours}</span></td>
                  <td>
                    <div className="fac-dash-actions-cell">
                      <button className="fac-dash-icon-btn" onClick={() => navigate("/dashboard/view-faculty", { state: { item } })}>👁</button>
                      <button className="fac-dash-icon-btn" onClick={() => navigate("/dashboard/edit-faculty", { state: { item } })}>✎</button>
                      <button className="fac-dash-icon-btn" onClick={() => { setDeleteId(item.id); setShowDelete(true); }}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <footer className="fac-dash-footer">
          <div className="fac-dash-pagination">
            <span className={`fac-dash-page-arrow ${currentPage === 1 ? "disabled" : ""}`} onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}>‹</span>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={currentPage === p ? "active" : ""} onClick={() => setCurrentPage(p)}>{p}</button>
            ))}
            <span className={`fac-dash-page-arrow ${currentPage === totalPages ? "disabled" : ""}`} onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}>›</span>
          </div>
        </footer>

      </div>

      {/* DELETE MODAL */}
      {showDelete && (
        <>
          <div className="fac-del-overlay" onClick={() => setShowDelete(false)} />
          <div className="fac-del-popup">
            <div className="fac-del-popup-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </div>
            <h2 className="fac-del-popup-title">Delete Faculty Member</h2>
            <p className="fac-del-popup-desc">
              Are you sure you want to delete this faculty member?<br />
              This action cannot be undone.
            </p>
            <div className="fac-del-popup-actions">
              <button className="fac-del-btn fac-del-btn--cancel" onClick={() => setShowDelete(false)}>Cancel</button>
              <button className="fac-del-btn fac-del-btn--delete" onClick={handleDelete}>Yes, Delete</button>
            </div>
          </div>
        </>
      )}

    </div>
  );
}
