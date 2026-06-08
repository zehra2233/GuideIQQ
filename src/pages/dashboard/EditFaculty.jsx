import { useState, useRef } from "react";
import "./AddFaculty.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function EditFaculty() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const item = state?.item ?? {};

  const [name, setName] = useState(item.name ?? "");
  const [department, setDepartment] = useState(item.department ?? "");
  const [email, setEmail] = useState(item.email ?? "");
  const [phone, setPhone] = useState(item.phone ?? "");
  const [office, setOffice] = useState(item.office ?? "");
  const [hours, setHours] = useState(item.hours ?? "");
  const [photoPreview, setPhotoPreview] = useState(item.photo ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  }

  // 🔥 Save changes to Firestore
  async function handleSave() {
    if (!name.trim()) { setError("Please enter a name."); return; }
    if (!department.trim()) { setError("Please enter a department."); return; }
    if (!email.trim()) { setError("Please enter an email."); return; }

    setLoading(true);
    setError("");
    try {
      await updateDoc(doc(db, "faculty", item.id), {
        name: name.trim(),
        department: department.trim(),
        email: email.trim(),
        phone: phone.trim(),
        office: office.trim(),
        hours: hours.trim(),
        photo: photoPreview || null,
        updatedAt: new Date().toISOString(),
        updatedBy: auth.currentUser?.email || "admin"
      });
      navigate("/dashboard/faculty");
    } catch (err) {
      console.error("Error updating faculty:", err);
      setError("Failed to save changes. Please try again.");
    }
    setLoading(false);
  }

  const adminName = auth.currentUser?.displayName || "Admin";

  return (
    <div className="af-page">
      <DashboardSidebar activePage="faculty" />

      <div className="af-shell">

        {/* TOPBAR */}
        <div className="af-topbar">
          <div className="af-topbar-right">
            <div className="af-user-profile">
              <div className="af-user-avatar">{adminName[0].toUpperCase()}</div>
              <span className="af-user-name">{adminName}</span>
            </div>
          </div>
        </div>

        <div className="af-scroll-area">

          <header className="af-header">
            <h1>Edit Faculty</h1>
          </header>

          <div className="af-form-card">

            {/* ERROR */}
            {error && <p style={{ color: "red", fontSize: "13px", margin: 0 }}>{error}</p>}

            {/* PHOTO */}
            <div className="af-photo-section">
              <div className="af-photo-upload" onClick={() => fileRef.current.click()}>
                {photoPreview ? (
                  <img src={photoPreview} alt="preview" className="af-photo-preview" />
                ) : (
                  <div className="af-photo-placeholder">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                    </svg>
                    <span>Upload Photo</span>
                  </div>
                )}
              </div>
              <div className="af-photo-info">
                <h3>Profile Photo</h3>
                <p>Click the circle to change the photo.<br />JPG or PNG recommended.</p>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </div>

            {/* NAME + DEPARTMENT */}
            <div className="af-form-row">
              <div className="af-form-group">
                <label className="af-form-label">Full Name <span className="af-required">*</span></label>
                <input type="text" className="af-input" value={name}
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="af-form-group">
                <label className="af-form-label">Department <span className="af-required">*</span></label>
                <input type="text" className="af-input" value={department}
                  onChange={(e) => setDepartment(e.target.value)} />
              </div>
            </div>

            {/* EMAIL + PHONE */}
            <div className="af-form-row">
              <div className="af-form-group">
                <label className="af-form-label">Email <span className="af-required">*</span></label>
                <input type="email" className="af-input" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="af-form-group">
                <label className="af-form-label">Phone</label>
                <input type="text" className="af-input" value={phone}
                  onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            {/* OFFICE + HOURS */}
            <div className="af-form-row">
              <div className="af-form-group">
                <label className="af-form-label">Office Location</label>
                <input type="text" className="af-input" value={office}
                  onChange={(e) => setOffice(e.target.value)} />
              </div>
              <div className="af-form-group">
                <label className="af-form-label">Office Hours</label>
                <input type="text" className="af-input" value={hours}
                  onChange={(e) => setHours(e.target.value)} />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="af-form-actions">
              <button className="af-btn af-btn--cancel" onClick={() => navigate("/dashboard/faculty")}>
                Cancel
              </button>
              <button className="af-btn af-btn--save" onClick={handleSave} disabled={loading}>
                <svg viewBox="0 0 24 24" fill="white" width="17" height="17" style={{ marginRight: "8px", verticalAlign: "middle", marginBottom: "2px" }}>
                  <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                </svg>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}