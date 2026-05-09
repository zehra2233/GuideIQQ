import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./FacultyDirectory.css";

function FacultyDirectory() {
  const [search, setSearch] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [facultyFilter, setFacultyFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");

  const facultyData = [
    {
      id: 1,
      name: "KRİSTİN SURPUHİ BENİ",
      position: "Dr. Öğr. Üyesi",
      office: "kristin.benli@uskudar.edu.tr",
      image: "src/assets/kristin.jpeg",
      faculty: "Engineering and Natural Sciences", // 👈 Added specific faculty
      department: "Computer Engineer", // 👈 Added specific department
      location: "Block B– Floor 2– Office 302",
      hours: "Mon-Wed: 9:00-17:00"


    },
    {
      id: 2,
      name: "SALIM JIBRIN DANBATTA",
      position: "Dr. Öğr. Üyesi",
      office: "salimjibrin.danbatta@uskudar.edu.tr",
      image: "src/assets/Salim.jpeg",
      faculty: "Engineering and Natural Sciences", // 👈 Added specific faculty
      department: "Computer Engineer",
            location: "Block A – Floor 3 – Office 392",
      hours: "Mon-Fri: 8:40-17:30"

    },
    {
      id: 3, // Changed duplicate ID
      name: "BURHAN PEKTAŞ",
      position: "Prof. Dr.",
      office: "burhanpektas@uskudar.edu.tr",
      image: "src/assets/burhan.jpeg",
      faculty: "Engineering and Natural Sciences", // 👈 Added specific faculty
      department: "Computer Engineer", // 👈 Added specific department
      hours: "Office Hours Available"
    },
    {
      id: 4, // Changed duplicate ID
     name: "TÜRKER TEKİN ERGÜZEL",
      position: "Prof. Dr.",
      office: "turker.erguzel@uskudar.edu.tr",
      image: "src/assets/turker.jpeg",
      faculty: "Engineering and Natural Sciences", // 👈 Added specific faculty
      department: "Software Engineer",
      hours: "By Appointment"
    },
    {
      id: 5,
     name: "QAISER MEHMOOD",
      position: "Öğr. Gör.",
      office: "qaisermeh@uskudar.edu.tr",
      image: "src/assets/Qais.jpeg",
      faculty: "Engineering and Natural Sciences", // 👈 Added specific faculty
      department: " Software Engineering",
   hours: "Mon: 15:00-17:00"
    },
    {
      id: 6,
      name: "FATİH TEMİZ",
      position: "Dr. Öğr. Üyesi",
      office: "fatih.temiz@uskudar.edu.tr",
      image: "src/assets/fatih.jpg",
      faculty: "Engineering and Natural Sciences", // 👈 Added specific faculty
      department: "Software Engineer",
      hours: "Mon: 15:00-17:00"
    },
    {
      id: 7,
      name: "SÜEDA KAYA",
      position: "ARŞ.GÖR.",
      office: "suedaaaz@uskudar.edu.tr",
      image: "src/assets/sueda.jpeg",
      faculty: "Engineering and Natural Sciences", // 👈 Added specific faculty
      department: "Software Engineer",
      hours: "Wed: 10:00-12:00"
    },
    {
      id: 8,
      name: "ŞEYMA YEKTAR",
      position: "ARŞ.GÖR.",
      office: "setymakhan@uskudar.edu.tr",
      image: "src/assets/sheyma.jpeg",
      faculty: "Engineering and Natural Sciences", // 👈 Added specific faculty
      department: "Software Engineer",
      hours: "Wed: 10:00-12:00"
    },
    {
      id: 9,
      name: "MERYEM KEVSER ZELKA",
      position: "ARŞ.GÖR.",
       office: "meryeman@uskudar.edu.tr",
      image: "src/assets/meryem.jpeg",
      faculty: "Engineering and Natural Sciences", // 👈 Added specific faculty
      department: "Software Engineer",
      hours: "Wed: 10:00-12:00"
    },
    {
      id: 10,
      name: "GÖKHAN APAYDIN",
      position: "Prof. Dr.",
      office: "elif.yilmaz@uskudar.edu.tr",
      image: "src/assets/gokhan.jpeg",
      faculty: "Engineering and Natural Sciences", // 👈 Added specific faculty
      department: "Software Engineer",
      hours: "Wed: 10:00-12:00"
    }
    
  ];

  // 🔹 ACTIONS
  const handleClearFilters = () => {
    setSearch("");
    setFacultyFilter("");
    setDeptFilter("");
  };

  // 🔹 FILTER LOGIC
  const filteredFaculty = facultyData.filter((f) => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    
    // Check if dropdown matches or is set to "All" (empty string)
    const matchesFaculty = facultyFilter === "" || f.faculty === facultyFilter;
    const matchesDept = deptFilter === "" || f.department === deptFilter;

    return matchesSearch && matchesFaculty && matchesDept;
  });

  return (
    <div className="faculty-page">
      <header className="main-header">
        Guide<span className="iq">IQ</span>
        <span className="change-university">Change University</span>
      </header>

      <div className="page-body">
        <Sidebar />

        <main className="page-content">
          <div className="page-content-inner">
            <h1 className="page-title">Faculty Directory</h1>

            <div className="faculty-controls">
              <input 
                type="text"
                placeholder="Search for name "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="filter-row">
                {/* 🔹 Linked value and onChange to state */}
                <select 
                  className="filter-dropdown" 
                  value={facultyFilter} 
                  onChange={(e) => setFacultyFilter(e.target.value)}
                >
                  <option value="">Faculty</option>
                  
                  <option value="Engineering and Natural Sciences">Engineering and Natural Sciences</option>
                  <option value="medical">medical</option> 
                                    <option value="Dentistry">Dentistry</option> 

                  <option value="Communication">Communication</option>
                                    <option value="Health Sciences">Health Sciences</option>
                             <option value="Human and Social Sciences">Human and Social Sciences</option>


                </select>   

                <select 
                  className="filter-dropdown" 
                  value={deptFilter} 
                  onChange={(e) => setDeptFilter(e.target.value)}
                >
                  <option value="">Department</option>
                  <option value="Business">Business</option>
                  <option value="Software Engineer">Software Engineer</option>
                  <option value="Bio Medical Engineering">Bio Medical Engineering</option>
                  <option value="Computer Engineer">Computer Engineer</option>
                  <option value="Accounting">Accounting</option> 
                  <option value="Economics">Economics</option> 

                </select>   
                <div className="spacer"></div>

                <button className="clear-filters" onClick={handleClearFilters}>
                  Clear Filters
                </button>                
              </div>
            </div>

            <div className="faculty-grid">
              {filteredFaculty.map((faculty) => (
                <div className="faculty-card" key={faculty.id}>
                  <img src={faculty.image} alt={faculty.name} />
                  <div className="faculty-info">
                    <p className="faculty-position">{faculty.position}</p>
                    <h3 className="faculty-name">{faculty.name}</h3>
                    <div className="faculty-details-extra">
                      <p><span>{faculty.office}</span></p>
                    </div>
                  </div>
                  <button
                    className="office-btn"
                    onClick={() => setSelectedFaculty(faculty)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>


     {selectedFaculty && (
  <div
    className="modal-overlay"
    onClick={() => setSelectedFaculty(null)}
  >
    <div
      className="modal"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="modal-header">
        <h3>{selectedFaculty.name}</h3>
        <span
          className="modal-close"
          onClick={() => setSelectedFaculty(null)}
        >
          ×
        </span>
      </div>

      {/* Body */}
      <div className="modal-body">
        <p>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${selectedFaculty.office}`}>
            {selectedFaculty.office}
          </a>
        </p>

  <p>
  <strong>Office Location:</strong> {selectedFaculty.location}
</p>

        <p>
          <strong>Office Hours:</strong>{" "}
          {selectedFaculty.hours || "Contact for appointment"}
        </p>
      </div>

      {/* Footer */}
      <div className="modal-footer">
        <button onClick={() => setSelectedFaculty(null)}>
          Close
        </button>
      </div>
    </div>
  </div>
)}

     
    </div>
  );
}

export default FacultyDirectory;