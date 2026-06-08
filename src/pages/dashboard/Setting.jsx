import { useState, useRef, useEffect } from "react";
import "./Setting.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { auth, db } from "../../firebase";
import { updateProfile, updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Setting() {
  const [adminName, setAdminName] = useState(auth.currentUser?.displayName || "");
  const [savedName, setSavedName] = useState(auth.currentUser?.displayName || "");
  const [email, setEmail] = useState(auth.currentUser?.email || "");
  const [phone, setPhone] = useState("");
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [profileMsg, setProfileMsg] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [showReauth, setShowReauth] = useState(false);
  const [reauthPassword, setReauthPassword] = useState("");
  const [reauthError, setReauthError] = useState("");
  const [pendingEmail, setPendingEmail] = useState("");

  const fileRef = useRef(null);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passMsg, setPassMsg] = useState(null);
  const [passLoading, setPassLoading] = useState(false);

  // 🔥 Load user data including photo from Firestore
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (u) {
        setAdminName(u.displayName || "");
        setSavedName(u.displayName || "");
        setEmail(u.email || "");
        try {
          const snap = await getDoc(doc(db, "admins", u.uid));
          if (snap.exists() && snap.data().photo) {
            setAvatarSrc(snap.data().photo);
          }
        } catch (err) {
          console.error(err);
        }
      }
    });
    return () => unsubscribe();
  }, []);

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
    reader.onload = ev => setTempAvatar(ev.target.result);
    reader.readAsDataURL(file);
  }

  // 🔥 Remove photo from Firestore too
  async function removePhoto() {
    setTempAvatar(null);
    setAvatarSrc(null);
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await setDoc(doc(db, "admins", currentUser.uid), { photo: null }, { merge: true });
      } catch (err) {
        console.error(err);
      }
    }
  }

  async function saveProfile() {
    const currentUser = auth.currentUser;
    if (!currentUser) { setProfileMsg({ type: "error", text: "Not logged in." }); return; }
    if (email !== currentUser.email) {
      setPendingEmail(email);
      setShowReauth(true);
      return;
    }
    await doSaveProfile(currentUser);
  }

  // 🔥 Save profile + photo to Firestore
  async function doSaveProfile(currentUser) {
    setProfileLoading(true);
    setProfileMsg(null);
    try {
      await updateProfile(currentUser, {
        displayName: adminName.trim() || "Admin",
      });
      setSavedName(adminName.trim() || "Admin");

      // 🔥 Save photo to Firestore
      if (tempAvatar) {
        await setDoc(doc(db, "admins", currentUser.uid), {
          photo: tempAvatar
        }, { merge: true });
        setAvatarSrc(tempAvatar);
        setTempAvatar(null);
      }

      setProfileMsg({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      console.error(err);
      setProfileMsg({ type: "error", text: "Failed to update profile. Try again." });
    }
    setProfileLoading(false);
    setTimeout(() => setProfileMsg(null), 3000);
  }

  // 🔥 Re-auth + email update + save photo
  async function handleReauthConfirm() {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    setReauthError("");
    try {
      const credential = EmailAuthProvider.credential(currentUser.email, reauthPassword);
      await reauthenticateWithCredential(currentUser, credential);
      await updateEmail(currentUser, pendingEmail);
      await updateProfile(currentUser, {
        displayName: adminName.trim() || "Admin",
      });

      setEmail(pendingEmail);
      setPendingEmail("");
      setSavedName(adminName.trim() || "Admin");

      // 🔥 Save photo to Firestore
      if (tempAvatar) {
        await setDoc(doc(db, "admins", currentUser.uid), {
          photo: tempAvatar
        }, { merge: true });
        setAvatarSrc(tempAvatar);
        setTempAvatar(null);
      }

      setShowReauth(false);
      setReauthPassword("");
      setProfileMsg({ type: "success", text: "Email updated successfully! Use your new email to login next time." });
      setTimeout(() => setProfileMsg(null), 5000);

    } catch (err) {
      console.error(err);
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setReauthError("Incorrect password. Please try again.");
      } else if (err.code === "auth/email-already-in-use") {
        setReauthError("This email is already in use.");
      } else if (err.code === "auth/invalid-email") {
        setReauthError("Invalid email address.");
      } else {
        setReauthError("Failed to update email. Try again.");
      }
    }
  }

  async function handleUpdatePassword() {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
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
    setPassLoading(true);
    setPassMsg(null);
    try {
      const credential = EmailAuthProvider.credential(currentUser.email, oldPass);
      await reauthenticateWithCredential(currentUser, credential);
      await updatePassword(currentUser, newPass);
      setOldPass(""); setNewPass(""); setConfirmPass("");
      setPassMsg({ type: "success", text: "Password updated successfully!" });
    } catch (err) {
      console.error(err);
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setPassMsg({ type: "error", text: "Current password is incorrect." });
      } else {
        setPassMsg({ type: "error", text: "Failed to update password. Try again." });
      }
    }
    setPassLoading(false);
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

  const topbarInitial = (savedName || email || "A")[0].toUpperCase();
  const avatarInitial = (adminName || email || "A")[0].toUpperCase();

  return (
    <div className="set-page">
      <DashboardSidebar activePage="settings" />
      <div className="set-shell">

        <div className="set-topbar">
          <div className="set-topbar-right">
            <div className="set-user-profile">
              <div className="set-user-avatar">
                {avatarSrc
                  ? <img src={avatarSrc} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                  : topbarInitial}
              </div>
              <span className="set-user-name">{savedName || "Admin"}</span>
            </div>
          </div>
        </div>

        <div className="set-page-body">
          <div className="set-page-heading">
            <h1 className="set-page-title">Account Settings</h1>
            <p className="set-page-subtitle">Manage your personal information and account security.</p>
          </div>

          <div className="set-card">
            <div className="set-card-header"><h2>Profile Information</h2></div>
            <div className="set-card-body">
              <div className="set-profile-layout">
                <div className="set-avatar-col">
                  <div className="set-avatar-circle">
                    {(tempAvatar || avatarSrc)
                      ? <img src={tempAvatar || avatarSrc} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                      : avatarInitial}
                  </div>
                  <div className="set-photo-btns">
                    <button className="set-photo-btn set-photo-btn--change" onClick={() => fileRef.current.click()}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>
                      Change Photo
                    </button>
                    <button className="set-photo-btn set-photo-btn--remove" onClick={removePhoto}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      Remove Photo
                    </button>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
                </div>

                <div className="set-profile-divider" />

                <div className="set-fields-col">
                  <div className="set-field-group">
                    <label className="set-field-label">Full Name</label>
                    <input type="text" className="set-input set-input--full" placeholder="Enter your full name"
                      value={adminName} onChange={e => setAdminName(e.target.value)} />
                  </div>
                  <div className="set-field-group">
                    <label className="set-field-label">Email Address</label>
                    <input type="email" className="set-input set-input--full" placeholder="Enter your email"
                      value={email} onChange={e => setEmail(e.target.value)} />
                    <small style={{ color: "#94a3b8", fontSize: "11px" }}>
                      Changing email requires your current password
                    </small>
                  </div>
                  <div className="set-field-group">
                    <label className="set-field-label">Phone Number</label>
                    <input type="text" className="set-input set-input--full" placeholder="e.g. +90 216 400 2222"
                      value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>
              </div>

              {profileMsg && <p className={`set-msg set-msg--${profileMsg.type}`}>{profileMsg.text}</p>}
              <div className="set-card-actions">
                <button className="set-btn set-btn--primary" onClick={saveProfile} disabled={profileLoading}>
                  {profileLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>

          <div className="set-card">
            <div className="set-card-header"><h2>Change Password</h2></div>
            <div className="set-card-body set-pass-layout">
              <div className="set-pass-fields">
                <div className="set-field-group">
                  <label className="set-field-label">Current Password</label>
                  <div className="set-input-wrap">
                    <input type={showOld ? "text" : "password"} className="set-input" placeholder="Current password"
                      value={oldPass} onChange={e => setOldPass(e.target.value)} />
                    <button className="set-eye-btn" onClick={() => setShowOld(v => !v)}><EyeIcon open={showOld} /></button>
                  </div>
                </div>
                <div className="set-field-group">
                  <label className="set-field-label">New Password</label>
                  <div className="set-input-wrap">
                    <input type={showNew ? "text" : "password"} className="set-input" placeholder="New password"
                      value={newPass} onChange={e => setNewPass(e.target.value)} />
                    <button className="set-eye-btn" onClick={() => setShowNew(v => !v)}><EyeIcon open={showNew} /></button>
                  </div>
                </div>
                <div className="set-field-group">
                  <label className="set-field-label">Confirm New Password</label>
                  <div className="set-input-wrap">
                    <input type={showConfirm ? "text" : "password"} className="set-input" placeholder="Confirm password"
                      value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
                    <button className="set-eye-btn" onClick={() => setShowConfirm(v => !v)}><EyeIcon open={showConfirm} /></button>
                  </div>
                </div>
                {passMsg && <p className={`set-msg set-msg--${passMsg.type}`}>{passMsg.text}</p>}
              </div>

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
              <button className="set-btn set-btn--primary" onClick={handleUpdatePassword} disabled={passLoading}>
                {passLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* RE-AUTH MODAL */}
      {showReauth && (
        <>
          <div style={{
            position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)",
            zIndex: 9998, backdropFilter: "blur(2px)"
          }} onClick={() => { setShowReauth(false); setReauthPassword(""); setReauthError(""); setEmail(auth.currentUser?.email || ""); }} />

          <div style={{
            position: "fixed", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff", borderRadius: "16px",
            padding: "32px", width: "400px", maxWidth: "90%",
            zIndex: 9999, boxShadow: "0 24px 64px rgba(15,23,42,0.18)"
          }}>
            <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: 700, color: "#1e293b" }}>
              Confirm Your Identity
            </h3>
            <p style={{ margin: "0 0 20px", fontSize: "13px", color: "#64748b" }}>
              Enter your current password to change your email to <strong>{pendingEmail}</strong>
            </p>

            <div style={{ marginBottom: "12px" }}>
              <label style={{ fontSize: "13px", fontWeight: 500, color: "#475569", display: "block", marginBottom: "6px" }}>
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={reauthPassword}
                onChange={e => { setReauthPassword(e.target.value); setReauthError(""); }}
                style={{
                  width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0",
                  borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box"
                }}
              />
              {reauthError && <p style={{ color: "red", fontSize: "12px", margin: "6px 0 0" }}>{reauthError}</p>}
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "20px" }}>
              <button
                onClick={() => { setShowReauth(false); setReauthPassword(""); setReauthError(""); setEmail(auth.currentUser?.email || ""); }}
                style={{
                  padding: "10px 20px", borderRadius: "8px", border: "1.5px solid #e2e8f0",
                  background: "#fff", color: "#64748b", cursor: "pointer", fontSize: "14px", fontWeight: 500
                }}>
                Cancel
              </button>
              <button
                onClick={handleReauthConfirm}
                style={{
                  padding: "10px 20px", borderRadius: "8px", border: "none",
                  background: "linear-gradient(135deg, #1e40af, #2563eb)",
                  color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 600
                }}>
                Confirm
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}