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
        padding: "10px",
        background: "#33363fff",
        borderRight: "1px solid #e5e5e5",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {/* Logo + University Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
        <img
          src={uskudarLogo}
          alt="uskudar universitesi logo"
          style={{ width: "90px", height: "90px", padding: 30 }}
        />
        <h2
          style={{
            fontSize: "20px",
            marginLeft: "-20px",
            marginBottom: "20px",
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

      <div style={{ flex: 1, marginTop: "50px" }}>

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
      <div
        style={{
          position: "absolute",
          bottom: "120px",
          left: "0",
          width: "100%",
          textAlign: "center",
        }}
      >
        <button
          style={{
            marginTop: "255px",
            marginRight: 140,
            padding: "12px 5px",
            borderRadius: "3px",
            background: "#cc0707ff",
            cursor: "pointer",
            width: "53%",
            fontSize: 19,
          }}
        >
          Change University
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
