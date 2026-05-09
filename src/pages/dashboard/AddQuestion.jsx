import { useState } from "react";
import "./AddQuestion.css";
import uskudarLogo from "../../assets/uskudar.png";

export default function AddQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handlePublish = () => {
    console.log({ question, answer, selectedCategory });
  };
  const handleCancel = () => {
    setQuestion("");
    setAnswer("");
    setSelectedCategory("");
  };

  return (
    <div className="ai-page">
      <aside className="ai-sidebar">

        {/* Brand */}
      <div className="ai-brand">
  <p className="ai-brand-title">
    Guide<span>IQ</span>
  </p>
</div>

        {/* Logo + University Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "1px",marginLeft: "-20px" }}>
          <img
            src={uskudarLogo}
            alt="uskudar universitesi logo"
            style={{ width: "59px", height: "59px", padding: 30 }}
          />
          <h2
            style={{
              fontSize: "16px",
              marginLeft: "-20px",
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

        <div style={{ flex: 1, marginTop: "10px" }}>
        </div>

        {/* Nav */}
        <nav className="ai-nav">
          <button className="ai-nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            Dashboard
          </button>
      
          <button className="ai-nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
           Faculty Directory 
          </button>

          <button className="ai-nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M18 11v2H6v-2h12zm2-7v16l-7-4H5c-1.1 0-2-.9-2-2V9c0-1.1.9-2 2-2h8l7-4v1zm-2 3.49L14.97 9H5v6h9.97L18 16.51V7.49z"/></svg>
            Announcements
          </button>
          <button className="ai-nav-item ai-nav-item--active">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9h-2V5h2v6zm0 4h-2v-2h2v2z"/></svg>
            AI Question Log
          </button>
          <button className="ai-nav-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
            Settings
          </button>
        </nav>

        <button className="ai-university-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white" style={{ marginRight: '6px', verticalAlign: 'middle' }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
          Change University
        </button>
      </aside>



<main className="ai-main">

  <div className="aq-topbar">
    <div className="aq-topbar-right">
     

      <div className="aq-user-profile">
        <div className="aq-user-avatar">A</div>
        <span className="aq-user-name">Admin</span>
      </div>
    </div>
  </div>

  <div className="aq-shell">


            
          <header className="aq-header" style={{ borderBottom: 'none' }}>
            <div className="aq-header-title">
              <h1>Add New Question</h1>
            </div>
          </header>

          <div className="aq-form-grid">
            <div className="aq-form-group">
              <label className="aq-form-label">
                <span className="aq-step">1.</span> Add Question
              </label>
              <textarea
                className="aq-textarea"
                placeholder="Type the question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                maxLength={200}
              />
              <div className="aq-char-count">0 / 200</div>
            </div>

            <div className="aq-form-group">
              <label className="aq-form-label">
                <span className="aq-step">2.</span> Add Answer
              </label>
              <textarea
                className="aq-textarea"
                placeholder="Type the answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                maxLength={2000}
              />
              <div className="aq-char-count">0 / 2000</div>
            </div>

            <div className="aq-form-group">
              <label className="aq-form-label">
                <span className="aq-step">3.</span> Select Category
              </label>
              <div className="aq-category-options">
                <label className="aq-category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Announcement"
                    checked={selectedCategory === "Announcement"}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <div className="aq-category-card">
                    <div className="aq-category-icon">📣</div>
                    <div className="aq-category-text">
                      <strong>Announcement</strong>
                      <p>General announcements and important updates.</p>
                    </div>
                  </div>
                </label>
                <label className="aq-category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Academic Program"
                    checked={selectedCategory === "Academic Program"}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <div className="aq-category-card">
                    <div className="aq-category-icon">🎓</div>
                    <div className="aq-category-text">
                      <strong>Academic Program</strong>
                      <p>Questions related to academic programs and courses.</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="aq-form-actions" style={{ marginTop: '5px', borderTop: 'none', paddingTop: '50px' }}>
            <button className="aq-btn aq-btn--cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button className="aq-btn aq-btn--publish" onClick={handlePublish}>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="white" style={{ marginRight: '10px', verticalAlign: 'middle', transform: 'rotate(-45deg)',  marginBottom:'6px'}}>
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
              Publish
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
