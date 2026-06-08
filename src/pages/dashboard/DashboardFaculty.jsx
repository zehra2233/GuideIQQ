import { useState, useEffect } from "react";
import "./DashboardFaculty.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const ITEMS_PER_PAGE = 6;

export default function DashboardFaculty() {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Load faculty from Firestore
  useEffect(() => {
    fetchFaculty();
  }, []);

  async function fetchFaculty() {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "faculty"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFaculty(data);
    } catch (err) {
      console.error("Error fetching faculty:", err);
    }
    setLoading(false);
  }

  // 🔥 Delete from Firestore
  async function handleDelete() {
    try {
      await deleteDoc(doc(db, "faculty", deleteId));
      setFaculty(prev => prev.filter(f => f.id !== deleteId));
    } catch (err) {
      console.error("Error deleting:", err);
    }
    setShowDelete(false);
  }

  const filtered = faculty.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.department.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const adminName = auth.currentUser?.displayName || "Admin";

  return (
    <div className="fac-dash-page">
      <DashboardSidebar activePage="faculty" />

      <div className="fac-dash-shell">

        {/* TOPBAR */}
        <div className="fac-dash-topbar">
          <div className="fac-dash-topbar-right">
            <div className="fac-dash-user-profile">
              <div className="fac-dash-user-avatar">{adminName[0].toUpperCase()}</div>
              <span className="fac-dash-user-name">{adminName}</span>
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
          {loading ? (
            <p style={{ textAlign: "center", padding: "20px" }}>Loading...</p>
          ) : (
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
                {paginated.length === 0 ? (
                  <tr><td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>No faculty members found</td></tr>
                ) : (
                  paginated.map((item) => (
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
                  ))
                )}
              </tbody>
            </table>
          )}
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