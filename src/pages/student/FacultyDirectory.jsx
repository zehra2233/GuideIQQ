import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import "./FacultyDirectory.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function FacultyDirectory() {
  const [search, setSearch] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [facultyFilter, setFacultyFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Load faculty from Firestore
  useEffect(() => {
    async function fetchFaculty() {
      try {
        const snapshot = await getDocs(collection(db, "faculty"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFacultyData(data);
      } catch (err) {
        console.error("Error fetching faculty:", err);
      }
      setLoading(false);
    }
    fetchFaculty();
  }, []);

  const handleClearFilters = () => {
    setSearch("");
    setFacultyFilter("");
    setDeptFilter("");
  };

  const filteredFaculty = facultyData.filter((f) => {
    const matchesSearch = f.name?.toLowerCase().includes(search.toLowerCase());
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

      <div className="fac-page-body">
        <Sidebar />

        <main className="fac-page-content">
          <div className="page-content-inner">
            <h1 className="page-title">Faculty Directory</h1>

            <div className="faculty-controls">
              <input
                type="text"
                placeholder="Search for name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <div className="filter-row">
                <select className="filter-dropdown" value={facultyFilter}
                  onChange={(e) => setFacultyFilter(e.target.value)}>
                  <option value="">Faculty</option>
                  <option value="Engineering and Natural Sciences">Engineering and Natural Sciences</option>
                  <option value="medical">medical</option>
                  <option value="Dentistry">Dentistry</option>
                  <option value="Communication">Communication</option>
                  <option value="Health Sciences">Health Sciences</option>
                  <option value="Human and Social Sciences">Human and Social Sciences</option>
                </select>

                <select className="filter-dropdown" value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}>
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

            {loading ? (
              <p style={{ textAlign: "center", padding: "20px" }}>Loading...</p>
            ) : filteredFaculty.length === 0 ? (
              <p style={{ textAlign: "center", padding: "20px" }}>No faculty members found.</p>
            ) : (
              <div className="faculty-grid">
                {filteredFaculty.map((faculty) => (
                  <div className="faculty-card" key={faculty.id}>
                    {faculty.photo ? (
                      <img src={faculty.photo} alt={faculty.name} />
                    ) : (
                      <div style={{
                        width: "80px", height: "80px", borderRadius: "50%",
                        background: "#2563eb", color: "white", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        fontSize: "28px", fontWeight: "bold", margin: "0 auto"
                      }}>
                        {faculty.name?.[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="faculty-info">
                      <p className="faculty-position">{faculty.position || faculty.department}</p>
                      <h3 className="faculty-name">{faculty.name}</h3>
                      <div className="faculty-details-extra">
                        <p><span>{faculty.email}</span></p>
                      </div>
                    </div>
                    <button className="office-btn" onClick={() => setSelectedFaculty(faculty)}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {selectedFaculty && (
        <div className="modal-overlay" onClick={() => setSelectedFaculty(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedFaculty.name}</h3>
              <span className="modal-close" onClick={() => setSelectedFaculty(null)}>×</span>
            </div>
            <div className="modal-body">
              <p><strong>Email:</strong> <a href={`mailto:${selectedFaculty.email}`}>{selectedFaculty.email}</a></p>
              <p><strong>Department:</strong> {selectedFaculty.department}</p>
              <p><strong>Office Location:</strong> {selectedFaculty.office || "N/A"}</p>
              <p><strong>Office Hours:</strong> {selectedFaculty.hours || "Contact for appointment"}</p>
              <p><strong>Phone:</strong> {selectedFaculty.phone || "N/A"}</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setSelectedFaculty(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacultyDirectory;