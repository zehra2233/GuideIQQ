import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FiClock, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import "./CampusMap.css";

export default function CampusMap() {
  const campuses = [
    "Altunizade Main Campus (Üsküdar)",
    "Üsküdar Çarşı Campus",
    "Üsküdar Altunizade South Campus",
    "Faculty of Medicine NP Campus",
    "NP Health Campus",
  ];

  const facilitiesData = {
    "Altunizade Main Campus (Üsküdar)": [
      { name: "Student Affairs Office", type: "Student Services", hours: "09:00 - 17:00" },
    ],
    "Üsküdar Çarşı Campus": [],
    "Üsküdar Altunizade South Campus": [],
    "Faculty of Medicine NP Campus": [],                                                                                                                                                                                                                        
    "NP Health Campus": [],
  };

  const campusMaps = {
    "Altunizade Main Campus (Üsküdar)": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.013335040052!2d29.038827599999998!3d41.0249642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7e4b9b96af1%3A0x78ef20ea9ab0de2a!2s%C3%9Csk%C3%BCdar%20University%20Central%20Campus!5e0!3m2!1sen!2str!4v1771461847642!5m2!1sen!2str",
    "Üsküdar Çarşı Campus": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4637.0467924182785!2d29.017698888708654!3d41.0247880196802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab78b80e16b77%3A0x85eb676530996221!2zw5xza8O8ZGFyIFVuaXZlcnNpdHk!5e0!3m2!1sen!2str!4v1771460742528!5m2!1sen!2str",
    "Üsküdar Altunizade South Campus": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.161222626007!2d29.040104!3d41.021728599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7fc9deb4fd3%3A0x1363a714e29e4b77!2zw5xza8O8ZGFyIMOcbml2ZXJzaXRlc2kgR8O8bmV5IFllcmxlxZ9rZXNp!5e0!3m2!1sen!2str!4v1771468402099!5m2!1sen!2str",
    "Faculty of Medicine NP Campus": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.8832970090234!2d29.115745300000004!3d41.027809100000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac90fdde22ce1%3A0xe85078169cfe4133!2zw5xza8O8ZGFyIMOcbml2ZXJzaXRlc2kgTlAgU2HEn2zEsWsgWWVybGXFn2tlc2k!5e0!3m2!1sen!2str!4v1771461983663!5m2!1sen!2str",
    "NP Health Campus": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.8832970090234!2d29.115745300000004!3d41.027809100000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac90fdde22ce1%3A0xe85078169cfe4133!2zw5xza8O8ZGFyIMOcbml2ZXJzaXRlc2kgTlAgU2HEn2zEsWsgWWVybGXFn2tlc2k!5e0!3m2!1sen!2str!4v1771461983663!5m2!1sen!2str",
  };

  const [selectedCampus, setSelectedCampus] = useState(campuses[0]);
  const [search, setSearch] = useState("");

  const filteredFacilities =
    facilitiesData[selectedCampus]?.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <>
      {/* HEADER */}
      <header className="main-header">
        Guide<span className="iq">IQ</span>
        <span className="change-university">Change University</span>
      </header>

      <div className="page-body campusmap-bg">
        <Sidebar />

        <main className="page-content">
          <div className="campus-page">

            {/* TOP CONTROLS */}
            <div className="top-controls">
              <div className="search-wrapper">
                <h1 className="Campus-page-title">Campus Map and Facilities</h1>
                <input
                  className="search-input"
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="directions-btn">Get Directions</button>
              </div>

              <div className="controls-row">
                <select
                  className="select"
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                >
                  {campuses.map((campus) => (
                    <option key={campus}>{campus}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* MAP */}
            <div className="map-box">
              <iframe
                src={campusMaps[selectedCampus]}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: "20px" }}
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* FACILITIES - only Student Affairs card */}
            <div className="facilities-grid">
              {filteredFacilities.map((facility, index) => (
                <div key={index} className="facility-card student-affairs-card">
                  <div className="service-top">
                    <div className="service-icon">🏛️</div>
                    <div className="service-title-area">
                      <h3>{facility.name}</h3>
                    </div>
                  </div>

                  <div className="service-info">
                    <div className="info-item">
                      <FiClock className="info-icon" />
                      <div>
                        <strong>Hours</strong>
                        <span>{facility.hours}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <FiMapPin className="info-icon" />
                      <div>
                        <strong>Main Building</strong>
                        <span>Block A / First Floor</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <FiPhone className="info-icon" />
                      <div>
                        <strong>Contact</strong>
                        <span>+90 536 782 32 82</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <FiMail className="info-icon" />
                      <div>
                        <strong>Email</strong>
                        <span>dr.fulanf@st.uskudar.com</span>
                      </div>
                    </div>

                    <button
                      className="direction-btn"
                      onClick={() => window.open(campusMaps[selectedCampus], "_blank")}
                    >
                      Get Map →
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
