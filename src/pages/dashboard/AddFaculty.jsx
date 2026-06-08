import { useState, useRef } from "react";
import "./AddFaculty.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddFaculty() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [office, setOffice] = useState("");
  const [hours, setHours] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
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

  // 🔥 Save to Firestore
  async function handleSave() {
    if (!name.trim()) { setError("Please enter a name."); return; }
    if (!department.trim()) { setError("Please enter a department."); return; }
    if (!email.trim()) { setError("Please enter an email."); return; }

    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "faculty"), {
        name: name.trim(),
        department: department.trim(),
        email: email.trim(),
        phone: phone.trim(),
        office: office.trim(),
        hours: hours.trim(),
        photo: photoPreview || null,
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.email || "admin"
      });
      navigate("/dashboard/faculty");
    } catch (err) {
      console.error("Error adding faculty:", err);
      setError("Failed to save. Please try again.");
    }
    setLoading(false);
  }

  function handleCancel() {
    navigate("/dashboard/faculty");
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
            <h1>Add New Faculty</h1>
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
                <p>Click the circle to upload a photo.<br />JPG or PNG recommended.</p>
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
                <input type="text" className="af-input" placeholder="e.g. Prof. Dr. Ahmet Yılmaz"
                  value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="af-form-group">
                <label className="af-form-label">Department <span className="af-required">*</span></label>
                <input type="text" className="af-input" placeholder="e.g. Computer Engineering"
                  value={department} onChange={(e) => setDepartment(e.target.value)} />
              </div>
            </div>

            {/* EMAIL + PHONE */}
            <div className="af-form-row">
              <div className="af-form-group">
                <label className="af-form-label">Email <span className="af-required">*</span></label>
                <input type="email" className="af-input" placeholder="e.g. name@uskudar.edu.tr"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="af-form-group">
                <label className="af-form-label">Phone</label>
                <input type="text" className="af-input" placeholder="e.g. +90 216 400 2222"
                  value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            {/* OFFICE + HOURS */}
            <div className="af-form-row">
              <div className="af-form-group">
                <label className="af-form-label">Office Location</label>
                <input type="text" className="af-input" placeholder="e.g. B Block, Room 301"
                  value={office} onChange={(e) => setOffice(e.target.value)} />
              </div>
              <div className="af-form-group">
                <label className="af-form-label">Office Hours</label>
                <input type="text" className="af-input" placeholder="e.g. Mon–Wed 10:00–12:00"
                  value={hours} onChange={(e) => setHours(e.target.value)} />
              </div>
            </div>

            {/* ACTIONS */}
            <div className="af-form-actions">
              <button className="af-btn af-btn--cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="af-btn af-btn--save" onClick={handleSave} disabled={loading}>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="white" style={{ marginRight: "10px", verticalAlign: "middle", transform: "rotate(-45deg)", marginBottom: "6px" }}>
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
                {loading ? "Uploading..." : "Upload"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}