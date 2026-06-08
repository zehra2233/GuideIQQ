import { useState } from "react";
import "./StudentLogin.css";
import { useNavigate } from "react-router-dom";
import uskudarLogo from "../../assets/uskudar.png";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [studentNo, setStudentNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!studentNo.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    // Check against stored student accounts or default credentials
    const stored = localStorage.getItem("guideiq_students");
    const students = stored ? JSON.parse(stored) : [
      { studentNo: "2023001", password: "uskudar123" },
    ];

    const match = students.find(
      (s) => s.studentNo === studentNo.trim() && s.password === password
    );

    if (!match) {
      setError("Invalid student number or password.");
      return;
    }

    localStorage.setItem("studentLoggedIn", "true");
    localStorage.setItem("studentNo", studentNo.trim());
    navigate("/homepage");
  }

  return (
    <div className="sl-page">

      {/* Brand */}
      <div className="sl-brand">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="sl-brand-logo">
          <path d="M38 6 Q42 6 42 10 L42 28 Q42 32 38 32 L20 32 L13 42 L15 32 L10 32 Q6 32 6 28 L6 10 Q6 6 10 6 Z" fill="#202c49"/>
          <circle cx="16" cy="19" r="2.8" fill="rgba(255,255,255,0.9)"/>
          <circle cx="24" cy="19" r="2.8" fill="#2ba3d6"/>
          <circle cx="32" cy="19" r="2.8" fill="rgba(255,255,255,0.9)"/>
        </svg>
        <p className="sl-brand-text">Guide<span>IQ</span></p>
      </div>

      {/* Card */}
      <div className="sl-card">

        {/* University badge */}
        <div className="sl-uni-badge">
          <img src={uskudarLogo} alt="Üsküdar University" className="sl-uni-logo" />
          <div className="sl-uni-info">
            <span className="sl-uni-label">Turkey · Private University</span>
            <span className="sl-uni-name">Üsküdar University</span>
          </div>
        </div>

        <div className="sl-header">
          <h1>Student Login</h1>
          <p>Enter your credentials to access GuideIQ</p>
        </div>

        <form className="sl-form" onSubmit={handleLogin}>

          <div className="sl-field">
            <label>Student Number</label>
            <input
              type="text"
              placeholder="e.g. 2023001"
              value={studentNo}
              onChange={(e) => setStudentNo(e.target.value)}
              className="sl-input"
            />
          </div>

          <div className="sl-field">
            <label>Password</label>
            <div className="sl-input-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="sl-input"
              />
              <button type="button" className="sl-eye-btn" onClick={() => setShowPass(v => !v)}>
                {showPass ? (
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
                )}
              </button>
            </div>
          </div>

          {error && <p className="sl-error">{error}</p>}

          <button type="submit" className="sl-btn">Login</button>

        </form>

      </div>

    </div>
  );
}
