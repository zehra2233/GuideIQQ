// src/pages/HomePage.jsx
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import "../App.css";

function HomePage() {
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina",
    "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
    "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
    "Germany", "Ghana", "Greece", "Guatemala", "Guinea", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
    "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan",
    "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
    "Malaysia", "Maldives", "Mali", "Malta", "Mexico", "Moldova", "Monaco",
    "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria",
    "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Panama",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
    "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Singapore",
    "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "Spain",
    "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
    "Tanzania", "Thailand", "Tunisia", "Turkey", "Turkmenistan", "Uganda",
    "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
    "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  const institutionTypes = ["Public University", "Private University"];

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [universities, setUniversities] = useState([]);
  const [isAssistantActive, setIsAssistantActive] = useState(false);

  useEffect(() => {
    const universitiesByCountryAndType = {
      Turkey: {
        "Public University": ["Istanbul University", "Koç University", "Boğazci University"],
        "Private University": ["Üskudar University", "Istiniye University", "Bahçeşehir University", "Istanbul Aydın University"],
      },
      Canada: {
        "Public University": ["University of Toronto", "University of British Columbia"],
        "Private University": ["McGill University", "McMaster University"],
      },
      "United Kingdom": {
        "Public University": ["University of Oxford", "University of Cambridge"],
        "Private University": ["Imperial College London", "London School of Economics"],
      },
      Australia: {
        "Public University": ["University of Melbourne", "University of Sydney"],
        "Private University": ["Australian National University", "University of Queensland"],
      },
      Germany: {
        "Public University": ["Technical University of Munich", "Heidelberg University"],
        "Private University": ["Free University of Berlin", "Humboldt University of Berlin"],
      },
    };

    if (
      selectedCountry &&
      selectedType &&
      universitiesByCountryAndType[selectedCountry] &&
      universitiesByCountryAndType[selectedCountry][selectedType]
    ) {
      setUniversities(universitiesByCountryAndType[selectedCountry][selectedType]);
      setSelectedUniversity("");
    } else {
      setUniversities([]);
      setSelectedUniversity("");
    }
  }, [selectedCountry, selectedType]);

  useEffect(() => {
    setIsAssistantActive(!!(selectedCountry && selectedType && selectedUniversity));
  }, [selectedCountry, selectedType, selectedUniversity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAssistantActive) {
      alert(`Data-Grounded Assistant activated for ${selectedUniversity} (${selectedCountry})!`);
    }
  };

  return (
    <div className="campus-selector-container">
      <img src={logo} alt="GuideIQ Logo" className="homepage-logo" />
        <h1 className="homepage-title">GuideIQ</h1>
      <div className="header">
        <h1>Find Your Specific Campus Data</h1>
        <p>Select your institution to activate the Data-Grounded Assistant</p>
      </div>

      

      <form onSubmit={handleSubmit} className="selector-form">
        <div className="form-row">
          <div className="form-column">
            <label>Country</label>  
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="form-select"
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={`country-${index}`} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="form-column">
            <label>Institution Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-select"
            >
              <option value="">Select Type</option>
              {institutionTypes.map((type, index) => (
                <option key={`type-${index}`} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-column">
            <label>University Name</label>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="form-select"
              disabled={!selectedCountry}
            >
              <option value="">Select University</option>
              {universities.map((university, index) => (
                <option key={`university-${index}`} value={university}>
                  {university}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className={`activate-button ${isAssistantActive ? "active" : ""}`}
          disabled={!isAssistantActive}
        >
          Activate Specific Assistant
        </button>
      </form>

      {isAssistantActive && (
        <div className="success-message">
          <p>
            ✅ Assistant ready for <strong>{selectedUniversity}</strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
