import { useEffect, useRef, useState } from "react";
import "./AddAnnounce.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../firebase";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_LABELS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

function DateTimePicker({ onChange }) {
  const now = new Date();
  const [open, setOpen] = useState(false);
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [time, setTime] = useState("12:00");
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function pickDay(day) {
    setSelectedDay(day);
    const iso = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}T${time}`;
    onChange(iso);
  }

  function changeTime(t) {
    setTime(t);
    if (selectedDay) {
      const iso = `${calYear}-${String(calMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}T${t}`;
      onChange(iso);
    }
  }

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); }
    else setCalMonth(m => m - 1);
    setSelectedDay(null);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); }
    else setCalMonth(m => m + 1);
    setSelectedDay(null);
  }

  const displayValue = selectedDay
    ? `${String(selectedDay).padStart(2, "0")} ${MONTHS[calMonth]} ${calYear}  •  ${time}`
    : "";

  const totalDays = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDay(calYear, calMonth);

  return (
    <div className="aa-picker-wrapper" ref={ref}>
      <div className={`aa-picker-field ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)}>
        {displayValue
          ? <span className="aa-picker-value">{displayValue}</span>
          : <span className="aa-picker-placeholder">Select date and time…</span>
        }
        <svg className="aa-picker-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z"/>
        </svg>
      </div>

      {open && (
        <div className="aa-calendar-popup">
          <div className="aa-cal-nav">
            <button className="aa-cal-arrow" onClick={prevMonth}>‹</button>
            <span className="aa-cal-month-label">{MONTHS[calMonth]} {calYear}</span>
            <button className="aa-cal-arrow" onClick={nextMonth}>›</button>
          </div>

          <div className="aa-cal-grid">
            {DAY_LABELS.map(d => (
              <div key={d} className="aa-cal-day-name">{d}</div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`e${i}`} />
            ))}
            {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => (
              <button
                key={day}
                className={`aa-cal-day ${selectedDay === day ? "selected" : ""}`}
                onClick={() => pickDay(day)}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="aa-cal-time-row">
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm.01 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
            </svg>
            <input
              type="time"
              className="aa-cal-time-input"
              value={time}
              onChange={(e) => changeTime(e.target.value)}
            />
          </div>

          <button className="aa-cal-done-btn" onClick={() => setOpen(false)}>
            Done
          </button>
        </div>
      )}
    </div>
  );
}

export default function AddAnnounce() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduleType, setScheduleType] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔥 Save to Firestore
  const handlePublish = async () => {
    if (!title.trim()) { setError("Please enter a title."); return; }
    if (!content.trim()) { setError("Please enter content."); return; }
    if (!publishedDate) { setError("Please select a date and time."); return; }
    if (!scheduleType) { setError("Please select a schedule type."); return; }

    setLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "announcements"), {
        title: title.trim(),
        content: content.trim(),
        scheduleType,
        publishedDate,
        createdAt: new Date().toISOString(),
        createdBy: auth.currentUser?.email || "admin"
      });
      navigate("/dashboard/announce");
    } catch (err) {
      setError("Failed to save. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  const handleCancel = () => {
    navigate("/dashboard/announce");
  };

  const adminName = auth.currentUser?.displayName || "Admin";

  return (
    <div className="ai-page">
      <DashboardSidebar activePage="announcements" />

      <div className="aa-shell">

        {/* TOPBAR */}
        <div className="aa-topbar">
          <div className="aa-topbar-right">
            <div className="aa-user-profile">
              <div className="aa-user-avatar">{adminName[0].toUpperCase()}</div>
              <span className="aa-user-name">{adminName}</span>
            </div>
          </div>
        </div>

        <div className="aa-scroll-area">

          <header className="aa-header">
            <div className="aa-header-title">
              <h1>Add New Announcement</h1>
            </div>
          </header>

          <div className="aa-form-card">

            {/* ERROR */}
            {error && <p style={{ color: "red", fontSize: "13px", margin: 0 }}>{error}</p>}

            {/* TITLE */}
            <div className="aa-form-group">
              <label className="aa-form-label">
                <span className="aa-step">1.</span> Announcement Title <span className="aa-required">*</span>
              </label>
              <input
                type="text"
                className="aa-input"
                placeholder="Type the announcement title here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={150}
              />
              <div className="aa-char-count">{title.length} / 150</div>
            </div>

            {/* CONTENT */}
            <div className="aa-form-group">
              <label className="aa-form-label">
                <span className="aa-step">2.</span> Announcement Content <span className="aa-required">*</span>
              </label>
              <textarea
                className="aa-textarea"
                placeholder="Type the announcement content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={2000}
              />
              <div className="aa-char-count">{content.length} / 2000</div>
            </div>

            {/* PUBLISHED DATE */}
            <div className="aa-form-group">
              <label className="aa-form-label">
                <span className="aa-step">3.</span> Published Date &amp; Time <span className="aa-required">*</span>
              </label>
              <DateTimePicker value={publishedDate} onChange={setPublishedDate} />
            </div>

            {/* SCHEDULE TYPE */}
            <div className="aa-form-group">
              <label className="aa-form-label">
                <span className="aa-step">4.</span> Schedule Type
              </label>
              <div className="aa-category-options">
                <label className="aa-category-option">
                  <input type="radio" name="scheduleType" value="Scheduled"
                    checked={scheduleType === "Scheduled"}
                    onChange={(e) => setScheduleType(e.target.value)} />
                  <div className="aa-category-card">
                    <div className="aa-category-icon">🗓️</div>
                    <div className="aa-category-text">
                      <strong>Scheduled</strong>
                      <p>Publish the announcement at the selected date and time.</p>
                    </div>
                  </div>
                </label>
                <label className="aa-category-option">
                  <input type="radio" name="scheduleType" value="Immediate"
                    checked={scheduleType === "Immediate"}
                    onChange={(e) => setScheduleType(e.target.value)} />
                  <div className="aa-category-card">
                    <div className="aa-category-icon">⚡</div>
                    <div className="aa-category-text">
                      <strong>Immediate</strong>
                      <p>Publish the announcement right away.</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="aa-form-actions">
              <button className="aa-btn aa-btn--cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="aa-btn aa-btn--publish" onClick={handlePublish} disabled={loading}>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="white" style={{ marginRight: "10px", verticalAlign: "middle", transform: "rotate(-45deg)", marginBottom: "6px" }}>
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
                {loading ? "Publishing..." : "Publish"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}