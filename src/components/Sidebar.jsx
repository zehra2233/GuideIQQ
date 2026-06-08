import React, { useState } from "react";
import uskudarLogo from "../assets/uskudar.png";
import academicIcon from "../assets/academic.png";
import announcementIcon from "../assets/announcements.png";
import mapIcon from "../assets/map.png";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ useLocation added
import "./Sidebar.css";

const Sidebar = () => {
  const [openPrograms, setOpenPrograms] = useState(false);
  const [openAnnouncements, setOpenAnnouncements] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ tracks current page

  const isActive = (path) => location.pathname === path; // ✅ helper function

  return (
    <div
      style={{
        position: "fixed",
        top: "76px",
        left: "0",
        width: "390px",
        padding: "0",
        background: "#33363f",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        height: "calc(100vh - 76px)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "4px 0 20px rgba(0,0,0,0.22)",
      }}
    >
      {/* Logo + University Name */}
      <div style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "20px 22px 18px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}>
        <img
          src={uskudarLogo}
          alt="uskudar universitesi logo"
          style={{ width: "60px", height: "60px", flexShrink: 0, borderRadius: "8px" }}
        />
        <div>
          <h2 style={{
            fontSize: "14px",
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: "1.4",
            fontFamily: "Arial, Helvetica, sans-serif",
            margin: 0,
            letterSpacing: "0.04em",
          }}>
            T.C.<br />ÜSKÜDAR<br />ÜNİVERSİTESİ
          </h2>
        </div>
      </div>

      <div style={{ flex: 1, marginTop: "130px", overflowY: "auto" }}>

        {/* Academic Programs */}
        <p
          className={`menu-item ${openPrograms || isActive("/chatbox2") || isActive("/faculty") ? "active" : ""}`}
          onClick={() => {
            setOpenPrograms(!openPrograms);
            setOpenAnnouncements(false);
          }}
        >
          <img
            src={academicIcon}
            alt=""
            style={{ width: "25px", height: "25px", marginLeft: "16px" }}
          />
          <span>Academic Programs</span>
          <span style={{ marginLeft: "auto", fontSize: "15px" }}>
            {openPrograms ? "▲" : "▼"}
          </span>
        </p>

        {openPrograms && (
          <div style={{ paddingLeft: "2px" }}>
            <div
              onClick={() => navigate("/chatbox2")}
              className={`submenu-item ${isActive("/chatbox2") ? "submenu-active" : ""}`}
            >
              Ask Chatbox
            </div>
            <div className="divider" />
            <div
              onClick={() => navigate("/faculty")}
              className={`submenu-item ${isActive("/faculty") ? "submenu-active" : ""}`}
            >
              Faculty Directory
            </div>
          </div>
        )}

        <div className="divider" />

        {/* Announcements */}
        <p
          className={`menu-item ${openAnnouncements || isActive("/chatbox") || isActive("/announcements") ? "active" : ""}`}
          onClick={() => {
            setOpenAnnouncements(!openAnnouncements);
            setOpenPrograms(false);
          }}
        >
          <img
            src={announcementIcon}
            alt=""
            style={{ width: "25px", height: "25px", marginLeft: "15px" }}
          />
          <span>Announcements</span>
          <span style={{ marginLeft: "auto", fontSize: "15px" }}>
            {openAnnouncements ? "▲" : "▼"}
          </span>
        </p>

        {openAnnouncements && (
          <div style={{ paddingLeft: "2px" }}>
            <div
              onClick={() => navigate("/chatbox")}
              className={`submenu-item ${isActive("/chatbox") ? "submenu-active" : ""}`}
            >
              Ask Chatbox
            </div>
            <div className="divider" />
            <div
              onClick={() => navigate("/announcements")}
              className={`submenu-item ${isActive("/announcements") ? "submenu-active" : ""}`}
            >
              University Announcements
            </div>
          </div>
        )}

        <div className="divider" />

        {/* Campus Map */}
        <div
          className={`menu-item ${isActive("/Campus") ? "active" : ""}`}
          onClick={() => {
            navigate("/Campus");
            setOpenPrograms(false);
            setOpenAnnouncements(false);
          }}
        >
          <img src={mapIcon} alt="" style={{ width: "25px", height: "25px", marginLeft: "14px" }} />
          Campus Map & Facilities
        </div>

        <div className="divider" />
      </div>

      {/* Change University Button */}
      <div style={{
        padding: "16px 20px",
        flexShrink: 0,
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            width: "100%",
            padding: "12px 0",
            borderRadius: "6px",
            background: "#cc0707",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            color: "white",
            border: "none",
            fontFamily: "Arial, Helvetica, sans-serif",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            boxShadow: "0 2px 8px rgba(204,7,7,0.25)",
          }}
        >
          ← Change University
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
