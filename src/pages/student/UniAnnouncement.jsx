import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import "./UniAnnouncement.css";
import { db } from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function UniAnnouncement() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Load announcements from Firestore
  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const q = query(collection(db, "announcements"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAnnouncements(data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
      setLoading(false);
    }
    fetchAnnouncements();
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="main-header">
        Guide<span className="iq">IQ</span>
        <span className="change-university">Change University</span>
      </header>

      {/* BODY */}
      <div className="uni-page-body">
        <Sidebar />

        <div className="announcements-wrapper">
          <div className="announcements-container">
            <h2 className="announcements-title">University Announcements</h2>

            {loading ? (
              <p style={{ textAlign: "center", padding: "20px" }}>Loading...</p>
            ) : announcements.length === 0 ? (
              <p style={{ textAlign: "center", padding: "20px" }}>No announcements yet.</p>
            ) : (
              announcements.map((ann, index) => (
                index === 0 ? (
                  // First announcement styled as alert card
                  <div className="alert-card" key={ann.id}>
                    <div className="alert-header">🚨 {ann.title}</div>
                    <div className="alert-body">
                      <p className="alert-text">{ann.content}</p>
                    </div>
                    <div className="alert-foot">Date of addition: {ann.publishedDate}</div>
                  </div>
                ) : (
                  // Rest as normal announcement cards
                  <div className="announcement-card1" key={ann.id}>
                    <div className="header1">{ann.title}</div>
                    <div className="alert-body1">
                      <p className="alert-text1">{ann.content}</p>
                    </div>
                    <div className="alert-foot1">Date of addition: {ann.publishedDate}</div>
                  </div>
                )
              ))
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default UniAnnouncement;