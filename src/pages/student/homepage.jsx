import React, { useState, useEffect } from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import uskudarLogo from "../../assets/uskudar.png";

function HomePage() {
  const countries = [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia",
    "Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Belarus",
    "Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina",
    "Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia",
    "Cameroon","Canada","Cape Verde","Chad","Chile","China","Colombia","Comoros",
    "Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark",
    "Djibouti","Dominican Republic","Ecuador","Egypt","El Salvador","Estonia",
    "Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany",
    "Ghana","Greece","Guatemala","Guinea","Haiti","Honduras","Hungary","Iceland",
    "India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast",
    "Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyzstan","Laos",
    "Latvia","Lebanon","Lesotho","Liberia","Libya","Lithuania","Luxembourg",
    "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mexico","Moldova",
    "Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia",
    "Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
    "North Macedonia","Norway","Oman","Pakistan","Panama","Paraguay","Peru",
    "Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
    "Saudi Arabia","Senegal","Serbia","Singapore","Slovakia","Slovenia","Somalia",
    "South Africa","South Korea","Spain","Sri Lanka","Sudan","Sweden","Switzerland",
    "Syria","Taiwan","Tajikistan","Tanzania","Thailand","Tunisia","Turkey",
    "Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom",
    "United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
  ];

  const institutionTypes = ["Public University", "Private University"];

  const universitiesByCountryAndType = {
    Turkey: {
      "Public University": [
        "Istanbul University",
        "Istanbul University-Cerrahpaşa",
        "Boğaziçi University",
        "Galatasaray University",
        "Istanbul Medeniyet University",
        "Istanbul Technical University",
        "Marmara University",
        "Mimar Sinan Fine Arts University",
        "Yıldız Technical University",
        "University of Health Sciences",
        "National Defense University",
        "Turkish-German University",
        "Turkish-Japanese Science and Technology University",
      ],
      "Private University": [
        "Üsküdar University",
        "Acıbadem University",
        "Altınbaş University",
        "Bahçeşehir University",
        "Beykoz University",
        "Bezmialem Vakıf University",
        "Biruni University",
        "Demiroğlu Bilim University",
        "Doğuş University",
        "Fatih Sultan Mehmet Vakıf University",
        "Fenerbahçe University",
        "Haliç University",
        "Ibn Haldun University",
        "Istanbul 29 Mayıs University",
        "Istanbul Arel University",
        "Istanbul Atlas University",
        "Istanbul Aydın University",
        "Istanbul Beykent University",
        "Istanbul Bilgi University",
        "Istiniye University",
      ],
    },
    Canada: {
      "Public University": ["University of Toronto", "University of British Columbia"],
      "Private University": ["McGill University", "McMaster University"],
    },
    "United Kingdom": {
      "Public University": ["University of Oxford", "University of Cambridge"],
      "Private University": ["Imperial College London", "London School of Economics"],
    },
    "United States": {
      "Public University": ["University of Michigan", "UCLA"],
      "Private University": ["Harvard University", "MIT", "Stanford University"],
    },
    Germany: {
      "Public University": ["Ludwig Maximilian University", "Heidelberg University"],
      "Private University": ["EBS University", "Jacobs University"],
    },
  };

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedType, setSelectedType]       = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [universities, setUniversities]       = useState([]);
  const navigate = useNavigate();

  const [count24, setCount24]   = useState(0);
  const [count100, setCount100] = useState(20);

  useEffect(() => {
    let frame;
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setCount24(Math.round(ease * 24));
      setCount100(Math.round(20 + ease * 80));

      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (
      selectedCountry && selectedType &&
      universitiesByCountryAndType[selectedCountry] &&
      universitiesByCountryAndType[selectedCountry][selectedType]
    ) {
      setUniversities(universitiesByCountryAndType[selectedCountry][selectedType]);
    } else {
      setUniversities([]);
    }
    setSelectedUniversity("");
  }, [selectedCountry, selectedType]);

  const isActive = !!(selectedCountry && selectedType && selectedUniversity);

  return (
    <div className="homepage-page">

      {/* ── LEFT PANEL ── */}
      <div className="hp-left">

        <div className="homepage-brand">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="homepage-logo">
            <path d="M38 6 Q42 6 42 10 L42 28 Q42 32 38 32 L20 32 L13 42 L15 32 L10 32 Q6 32 6 28 L6 10 Q6 6 10 6 Z" fill="rgba(255,255,255,0.9)"/>
            <circle cx="16" cy="19" r="2.8" fill="#202c49"/>
            <circle cx="24" cy="19" r="2.8" fill="#2ba3d6"/>
            <circle cx="32" cy="19" r="2.8" fill="#202c49"/>
          </svg>
          <p className="homepage-text-logo">Guide<span className="iq">IQ</span></p>
        </div>

        <div className="hp-hero">
          <div className="hp-hero-content">
            <div className="hp-hero-tag">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#93c5fd">
                <circle cx="5" cy="5" r="5"/>
              </svg>
              AI-Powered Campus Assistant
            </div>
            <h2>Your Smart<br /><span>University Guide</span></h2>
            <p>Get instant answers about faculty, announcements, campus maps, and academic support — all powered by AI.</p>
          </div>

          <div className="hp-stats">
            <div className="hp-stat">
              <span className="hp-stat-num">{count24}/7</span>
              <span className="hp-stat-label">Available</span>
            </div>
            <div className="hp-stat">
              <span className="hp-stat-num">AI</span>
              <span className="hp-stat-label">Powered</span>
            </div>
            <div className="hp-stat">
              <span className="hp-stat-num">{count100}+</span>
              <span className="hp-stat-label">Universities</span>
            </div>
          </div>
        </div>

      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="hp-right">
        <div className="campus-selector-container">

          {selectedUniversity === "Üsküdar University" ? (
            <div className="uni-badge">
              <img src={uskudarLogo} alt="Üsküdar University" className="uni-badge-logo" />
              <div className="uni-badge-text">
                <span className="uni-badge-country">Turkey · Private University</span>
                <span className="uni-badge-name">Üsküdar University</span>
              </div>
            </div>
          ) : (
            <div className="header">
              <h1>Find Your Campus Assistant</h1>
              <p>Select your institution to get started</p>
            </div>
          )}

          <form className="selector-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">

              <div className="form-column">
                <label>Country</label>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="form-select">
                  <option value="">Select Country</option>
                  {countries.map((c, i) => <option key={i}>{c}</option>)}
                </select>
              </div>

              <div className="form-column">
                <label>Institution Type</label>
                <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="form-select" disabled={!selectedCountry}>
                  <option value="">Select Type</option>
                  {institutionTypes.map((t, i) => <option key={i}>{t}</option>)}
                </select>
              </div>

              <div className="form-column">
                <label>University Name</label>
                <select value={selectedUniversity} onChange={(e) => setSelectedUniversity(e.target.value)} className="form-select" disabled={!selectedType || universities.length === 0}>
                  <option value="">Select University</option>
                  {universities.map((u, i) => <option key={i}>{u}</option>)}
                </select>
              </div>

            </div>

            <button
              type="button"
              className={`activate-button ${isActive ? "active" : ""}`}
              disabled={!isActive}
              onClick={() => navigate("/chatbox2")}
            >
              {isActive ? `Enter ${selectedUniversity} Assistant` : "Activate Specific Assistant"}
            </button>
          </form>


        </div>
      </div>

    </div>
  );
}

export default HomePage;
