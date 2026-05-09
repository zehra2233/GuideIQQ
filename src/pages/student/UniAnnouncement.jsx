import React from "react";
import Sidebar from "../../components/Sidebar";
import "./UniAnnouncement.css";

function UniAnnouncement() {
  return (
    <>
      {/* 🔹 FULL WIDTH HEADER */}
      <header className="main-header">
  Guide<span className="iq">IQ</span>
    <span className="change-university">Change University</span>


</header>
  {/* 🔹 BODY */}
<div className="page-body">
  <Sidebar />

  {/* 🔹 ANNOUNCEMENTS CONTENT */}
    <div className="announcements-wrapper">
  <div className="announcements-container">
    <h2 className="announcements-title">    
  University Announcements
</h2>


<div className="alert-card">

  <div className="alert-header">
    🚨 CAMPUS CLOSED: All Classes Canceled – Feb 15th
  </div>

  <div className="alert-body">
    <p className="alert-text">
      Due to unforeseen weather conditions, the campus will be closed.
      Essential staff only. Please check back for updates.
    </p>
  </div>

  <div className="alert-foot">
  Date of addition : 2025-12-16 18:30:20
  </div>
</div>

    {/* 🔔 ANNOUNCEMENT CARD */}
<div className="announcement-card1"> 

  <div className="header1"> 
International Day
  </div>

  <div className="alert-body1"> 
    <p className="alert-text1"> 
      Tommow we have coffe day bla bla blaa 
    </p>
  </div>

  <div className="alert-foot1"> 
  Date of addition : 2025-12-16 18:30:20
  </div>
</div>



    {/* 🔔 ANNOUNCEMENT CARD */}
    <div className="announcement-card">
      <h3>Guest Lecture Series: AI in Medicine</h3>
      <span className="tag event">Events</span>
      <p className="date">Posted: February 14, 6:00 PM</p>
      <p>
        Join us for an exciting talk on AI applications in healthcare.
      </p>
    </div>
  </div>
  </div>
  </div>
       
    </>
  );
}

export default UniAnnouncement;
