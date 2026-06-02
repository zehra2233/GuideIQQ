import React from "react";
import Sidebar from "../../components/Sidebar";
import "./RoughPage.css";

function RoughPage() {
  return (
    <>
      {/* 🔹 FULL WIDTH HEADER */}
      <header className="main-header">
  Guide<span className="iq">IQ</span>
    <span className="change-university">Change University</span>

</header>

 


      {/* 🔹 BODY */}
      <div className="rough-page-body">
        <Sidebar />

        <main className="rough-page-content">
        </main>
      </div>
    </>
  );
}

export default RoughPage;
