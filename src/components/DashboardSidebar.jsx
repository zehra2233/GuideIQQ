import "./DashboardSidebar.css";
import uskudarLogo from "../assets/uskudar.png";
import { useNavigate } from "react-router-dom";


export default function DashboardSidebar({ activePage }) {

  const navigate = useNavigate();

  return (

    <aside className="ai-sidebar">

      {/* Brand */}
      <div className="ai-brand" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36" style={{ flexShrink: 0, width: "36px", height: "36px" }}>
          <path d="M38 6 Q42 6 42 10 L42 28 Q42 32 38 32 L20 32 L13 42 L15 32 L10 32 Q6 32 6 28 L6 10 Q6 6 10 6 Z" fill="rgba(255,255,255,0.9)"/>
          <circle cx="16" cy="19" r="2.8" fill="#202c49"/>
          <circle cx="24" cy="19" r="2.8" fill="#2ba3d6"/>
          <circle cx="32" cy="19" r="2.8" fill="#202c49"/>
        </svg>
        <p className="ai-brand-title">
          Guide<span>IQ</span>
        </p>
      </div>

      {/* Logo + University Name */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1px", marginLeft: "-17px" }}>
        <img
          src={uskudarLogo}
          alt="uskudar universitesi logo"
          style={{ width: "75px", height: "75px", padding: 10, marginLeft: "15px", marginTop: "-9px" }}
        />
        <h2
          style={{
            fontSize: "16px",
            marginLeft: "-4px",
            marginBottom: "13px",
            color: "#fff",
            lineHeight: "1.2",
            textAlign: "left",
          }}
        >
          T.C. <br />
          ÜSKÜDAR <br />
          ÜNİVERSİTESİ
        </h2>
      </div>

      {/* Nav */}
      <nav className="ai-nav">
        <button className={`ai-nav-item ${activePage === "faculty" ? "ai-nav-item--active" : ""}`} onClick={() => navigate("/dashboard/faculty")}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          Faculty Directory
        </button>

        <button className={`ai-nav-item ${activePage === "announcements" ? "ai-nav-item--active" : ""}`} onClick={() => navigate("/dashboard/announce")}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M18 11v2H6v-2h12zm2-7v16l-7-4H5c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h8l7-4v1zm-2 3.49L14.97 9H5v6h9.97L18 16.51V7.49z"/></svg>
          Announcements
        </button>

        <button className={`ai-nav-item ${activePage === "questions" ? "ai-nav-item--active" : ""}`} onClick={() => navigate("/dashboard/ai")}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/>
          </svg>
          AI Question
        </button>

        <button className={`ai-nav-item ${activePage === "settings" ? "ai-nav-item--active" : ""}`} onClick={() => navigate("/dashboard/settings")}>
          <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
          Settings
        </button>
      </nav>

      {/* Log Out Button */}
      <button className="ai-university-button" onClick={() => navigate("/dashboard/login")}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style={{ marginRight: '6px', verticalAlign: 'middle' }}>
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
        </svg>
        Log Out
      </button>

    </aside>
  );
}
