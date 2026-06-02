import { useState, useRef } from "react";
import "./Setting.css";
import DashboardSidebar from "../../components/DashboardSidebar";

export default function Setting() {
  const [adminName, setAdminName]   = useState(localStorage.getItem("adminName") || "");
  const [email, setEmail]           = useState(localStorage.getItem("adminEmail") || "");
  const [phone, setPhone]           = useState(localStorage.getItem("adminPhone") || "");
  const [avatarSrc, setAvatarSrc]   = useState(localStorage.getItem("adminAvatar") || null);
  const fileRef = useRef(null);

  const [oldPass, setOldPass]       = useState("");
  const [newPass, setNewPass]       = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showOld, setShowOld]       = useState(false);
  const [showNew, setShowNew]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passMsg, setPassMsg]       = useState(null);


  const req = {
    length:    newPass.length >= 8,
    uppercase: /[A-Z]/.test(newPass),
    lowercase: /[a-z]/.test(newPass),
    number:    /[0-9]/.test(newPass),
    special:   /[^A-Za-z0-9]/.test(newPass),
  };

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setAvatarSrc(ev.target.result);
      localStorage.setItem("adminAvatar", ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setAvatarSrc(null);
    localStorage.removeItem("adminAvatar");
  }

  function saveProfile() {
    localStorage.setItem("adminName", adminName.trim() || "Admin");
    localStorage.setItem("adminEmail", email);
    localStorage.setItem("adminPhone", phone);
  }

  function updatePassword() {
    if (!oldPass || !newPass || !confirmPass) {
      setPassMsg({ type: "error", text: "All fields are required." });
      return;
    }
    if (newPass !== confirmPass) {
      setPassMsg({ type: "error", text: "Passwords do not match." });
      return;
    }
    if (!Object.values(req).every(Boolean)) {
      setPassMsg({ type: "error", text: "Password does not meet all requirements." });
      return;
    }
    setOldPass(""); setNewPass(""); setConfirmPass("");
    setPassMsg({ type: "success", text: "Password updated successfully." });
    setTimeout(() => setPassMsg(null), 3000);
  }

  const EyeIcon = ({ open }) => open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );

  const ReqItem = ({ met, label }) => (
    <div className="set-req-item">
      <svg width="18" height="18" viewBox="0 0 24 24" fill={met ? "#22c55e" : "#d1d5db"} style={{ flexShrink: 0, transition: "fill 0.2s" }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5l-4.5-4.5 1.41-1.41L10 13.67l7.09-7.09L18.5 8l-8.5 8.5z"/>
      </svg>
      <span style={{ color: met ? "#16a34a" : "#9ca3af", fontWeight: met ? 600 : 400, transition: "color 0.2s" }}>{label}</span>
    </div>
  );

  return (
    <div className="set-page">
      <DashboardSidebar activePage="settings" />

      <div className="set-shell">

        {/* TOPBAR */}
        <div className="set-topbar">
          <div className="set-topbar-right">
            <div className="set-user-profile">
              <div className="set-user-avatar">
                {avatarSrc
                  ? <img src={avatarSrc} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                  : (localStorage.getItem("adminName") || "A")[0].toUpperCase()
                }
              </div>
              <span className="set-user-name">{localStorage.getItem("adminName") || "Admin"}</span>
            </div>
          </div>
        </div>

        <div className="set-page-body">

          {/* PAGE TITLE */}
          <div className="set-page-heading">
            <h1 className="set-page-title">Account Settings</h1>
            <p className="set-page-subtitle">Manage your personal information and account security.</p>
          </div>

          {/* ── PROFILE CARD ── */}
          <div className="set-card">
            <div className="set-card-header">
              <h2>Profile Information</h2>
            </div>
            <div className="set-card-body">
              <div className="set-profile-layout">

                {/* AVATAR */}
                <div className="set-avatar-col">
                  <div className="set-avatar-circle">
                    {avatarSrc
                      ? <img src={avatarSrc} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                      : (adminName || "A")[0].toUpperCase()
                    }
                  </div>
                  <div className="set-photo-btns">
                  <button className="set-photo-btn set-photo-btn--change" onClick={() => fileRef.current.click()}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/>
                    </svg>
                    Change Photo
                  </button>
                  <button className="set-photo-btn set-photo-btn--remove" onClick={removePhoto}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                    Remove Photo
                  </button>
                </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
                </div>

                {/* VERTICAL DIVIDER */}
                <div className="set-profile-divider" />

                {/* FIELDS — aligned next to circle */}
                <div className="set-fields-col">
                  <div className="set-field-group">
                    <label className="set-field-label">Full Name</label>
                    <input type="text" className="set-input set-input--full" placeholder="Enter your full name" value={adminName} onChange={e => setAdminName(e.target.value)} />
                  </div>
                  <div className="set-field-group">
                    <label className="set-field-label">Email Address</label>
                    <input type="email" className="set-input set-input--full" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="set-field-group">
                    <label className="set-field-label">Phone Number</label>
                    <input type="text" className="set-input set-input--full" placeholder="e.g. +90 216 400 2222" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>

              </div>

              <div className="set-card-actions">
                <button className="set-btn set-btn--primary" onClick={saveProfile}>Save Changes</button>
              </div>
            </div>
          </div>

          {/* ── PASSWORD CARD ── */}
          <div className="set-card">
            <div className="set-card-header">
              <h2>Change Password</h2>
            </div>
            <div className="set-card-body set-pass-layout">

              {/* LEFT — fields */}
              <div className="set-pass-fields">
                <div className="set-field-group">
                  <label className="set-field-label">Current Password</label>
                  <div className="set-input-wrap">
                    <input type={showOld ? "text" : "password"} className="set-input" placeholder="Current password" value={oldPass} onChange={e => setOldPass(e.target.value)} />
                    <button className="set-eye-btn" onClick={() => setShowOld(v => !v)}><EyeIcon open={showOld} /></button>
                  </div>
                </div>
                <div className="set-field-group">
                  <label className="set-field-label">New Password</label>
                  <div className="set-input-wrap">
                    <input type={showNew ? "text" : "password"} className="set-input" placeholder="New password" value={newPass} onChange={e => setNewPass(e.target.value)} />
                    <button className="set-eye-btn" onClick={() => setShowNew(v => !v)}><EyeIcon open={showNew} /></button>
                  </div>
                </div>
                <div className="set-field-group">
                  <label className="set-field-label">Confirm New Password</label>
                  <div className="set-input-wrap">
                    <input type={showConfirm ? "text" : "password"} className="set-input" placeholder="Confirm password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
                    <button className="set-eye-btn" onClick={() => setShowConfirm(v => !v)}><EyeIcon open={showConfirm} /></button>
                  </div>
                </div>
                {passMsg && <p className={`set-msg set-msg--${passMsg.type}`}>{passMsg.text}</p>}
              </div>

              {/* RIGHT — requirements */}
              <div className="set-req-panel">
                <p className="set-req-title">Password Requirements</p>
                <ReqItem met={req.length}    label="At least 8 characters" />
                <ReqItem met={req.uppercase} label="One uppercase letter" />
                <ReqItem met={req.lowercase} label="One lowercase letter" />
                <ReqItem met={req.number}    label="One number" />
                <ReqItem met={req.special}   label="One special character" />
              </div>

            </div>
            <div className="set-card-footer">
              <button className="set-btn set-btn--primary" onClick={updatePassword}>Update Password</button>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
