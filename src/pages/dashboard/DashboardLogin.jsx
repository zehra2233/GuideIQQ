import { useState } from "react";
import "./DashboardLogin.css";

export default function DashboardLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    console.log("Logging in with:", formData);
  };

  return (
    <div className="dl-wrapper">

      {/* ── LEFT PANEL ── */}
      <div className="dl-left">
        <div className="dl-grid-pattern" />

        <div className="dl-box">
          <h1 className="dl-title">Dashboard Panel</h1>
          <p className="dl-subtitle">Enter your registered email address and password to login!</p>

          {/* Email */}
          <div className="dl-group">
            <label className="dl-label">Email</label>
            <div className="dl-input-wrap">
              <svg className="dl-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <input
                className="dl-input"
                type="text"
                name="email"
                placeholder="eg. admin@guideiq.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="dl-group">
            <label className="dl-label">Password</label>
            <div className="dl-input-wrap">
              <svg className="dl-field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                className="dl-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              <button className="dl-eye" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="dl-options">
            <label className="dl-remember">
              <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} />
              <span>Remember me</span>
            </label>
            <a href="#" className="dl-forgot">Forgot Password ?</a>
          </div>

          {/* Button */}
          <button className="dl-btn" onClick={handleLogin}>Login</button>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="dl-right">
        <div className="dl-orbit">
          <div className="dl-ring dl-ring-1"/>
          <div className="dl-ring dl-ring-2"/>
          <div className="dl-ring dl-ring-3"/>

          <div className="dl-center">
            <svg viewBox="0 0 24 24" fill="white" width="36" height="36">
              <path d="M10 17v-6l-2 2V11l3-3 3 3v2l-2-2v6h-2zm2-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
          </div>

          {[0,60,120,180,240,300].map((deg, i) => (
            <div key={i} className="dl-orbit-dot" style={{"--deg": `${deg}deg`}}>
              <div className="dl-orbit-chip">
                {i === 0 && <svg viewBox="0 0 24 24" width="20" height="20" fill="#0078D7"><path d="M4 4h16v16H4z"/><path fill="white" d="M8 8h3v8H8zm5 0h3v8h-3z"/></svg>}
                {i === 1 && <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10" fill="#EA4335"/><path fill="white" d="M8 8h8v8H8z"/></svg>}
                {i === 2 && <svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366"><circle cx="12" cy="12" r="10"/><path fill="white" d="M8 12l2.5 2.5L16 9"/></svg>}
                {i === 3 && <svg viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10" fill="#4285F4"/><path fill="white" d="M8 11h8v2H8z"/></svg>}
                {i === 4 && <svg viewBox="0 0 24 24" width="20" height="20" fill="#0A66C2"><rect x="2" y="2" width="20" height="20" rx="4"/><path fill="white" d="M7 10h2v7H7zm1-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3 3h2v1c.4-.7 1.2-1 2-1 1.7 0 3 1.3 3 3v4h-2v-3.5c0-.8-.7-1.5-1.5-1.5S14 13.7 14 14.5V17h-3v-7z"/></svg>}
                {i === 5 && <svg viewBox="0 0 23 23" width="20" height="20"><rect x="1" y="1" width="10" height="10" fill="#F25022"/><rect x="12" y="1" width="10" height="10" fill="#7FBA00"/><rect x="1" y="12" width="10" height="10" fill="#00A4EF"/><rect x="12" y="12" width="10" height="10" fill="#FFB900"/></svg>}
              </div>
            </div>
          ))}
        </div>

        <p className="dl-caption">
          Compatible with <strong>Gmail, Outlook Web, LinkedIn and most web editors</strong> for a smooth experience anywhere online.
        </p>
      </div>
    </div>
  );
}
