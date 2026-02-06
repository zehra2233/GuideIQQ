import React, { useState } from "react";
import uskudarLogo from "../assets/uskudar.png";
import academicIcon from "../assets/academic.png";
import announcementIcon from "../assets/announcements.png";
import mapIcon from "../assets/map.png";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  // ✅ STATE MUST BE INSIDE THE COMPONENT
  const [openPrograms, setOpenPrograms] = useState(false);
  const [openAnnouncements, setOpenAnnouncements] = useState(false);
  const navigate = useNavigate();

  
  return (
    <div
      style={{
        position:"fixed",
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

     
<div style={{ flex: 1 }}>

<p
  onClick={() => setOpenPrograms(!openPrograms)}
  style={{
    margin: "90px 0 6px",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center"
  }}
>
  <img
    src={academicIcon}
    alt=""
    style={{ width: "25px", height: "25px", marginRight: "13px" ,marginLeft: "25px" }}
  />
  <span>Academic Programs</span>
  {/* Arrow pushed to the far right */}
  <span style={{ 
    marginLeft: "124px",
      marginTop: "5px", 
  fontSize: "15px"      
   }}>
    {openPrograms ? "▲" : "▼"}
  </span>
</p>
{openPrograms && (
          <div style={{ paddingLeft: "2px" }}>
            <div 
                             onClick={() => navigate("/chatbox2")}

            style={{
               padding: "6px 0",
                cursor: "pointer" ,
                marginRight:"50%" ,
}}>
            Ask Chatbox
            </div>
          <div style={{
  height: "1px",
  width: "90%",
    marginLeft:"15px",
  background: "rgba(255,255,255,0.25)",
  marginBottom: "10px",
  marginTop: "10px"
}} />



            <div 
             onClick={() => navigate("/faculty")}
            style=
            {{ padding: "6px 0", cursor: "pointer" ,marginRight:"43%" }}>
           Faculty Directory
            </div>
          </div>
        )}



<div style={{
  height: "1px",
    width: "90%",
   marginLeft:"15px",
  background: "rgba(255,255,255,0.25)",
  marginBottom: "20px",
  marginTop: "20px"
}} />


<p
  onClick={() => setOpenAnnouncements(!openAnnouncements)}
  style={{
    margin: "10px 0 6px",
    fontSize: "18px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "18px"
  }}
>
  <img src={announcementIcon} alt="" style={{ 
    width: "25px", height: "25px", marginRight: "-4px" ,marginLeft: "24px"}} />
  <span>Announcements</span>
  {/* Arrow pushed to the far right */}
  <span style={{ 
    marginLeft: "135px",
      marginTop: "5px", 
  fontSize: "15px"      
   }}>
    {openAnnouncements ? "▲" : "▼"}
  </span>
</p>

{openAnnouncements && (
          <div style={{ 
            paddingLeft: "2px" }}>
            <div  
                 onClick={() => navigate("/chatbox")}

             style={{ 
              padding: "6px 0",
               cursor: "pointer",marginRight:"50%"}}>
            Ask Chatbox 
            </div>



                  <div style={{
  height: "1px",
  width: "90%",
  marginLeft:"15px",
  background: "rgba(255,255,255,0.25)",
  marginBottom: "10px",
  marginTop: "10px"
}} />

        <div 
          onClick={() => navigate("/announcements")}

        style={{ 
        padding: "6px 0",
        cursor: "pointer",marginRight:"27%"}}>
        University Announcments </div>
        </div>
        )}
<div style={{
  height: "1px",
      width: "90%",
   marginLeft:"15px",
  background: "rgba(255,255,255,0.25)",
  marginBottom: "20px",
  marginTop: "20px"}} />


       <div
  style={{
    padding: "8px 6px",
    cursor: "pointer",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    gap: "18px"
  }}>
  <img src={mapIcon} alt="" style={{ width: "25px", height: "25px", marginRight: "-2px" ,marginLeft: "14px"}} />
  Campus Map & Facilities
</div>
<div style={{
  height: "1px",
      width: "90%",
   marginLeft:"15px",
  background: "rgba(255,255,255,0.25)",
  marginBottom: "20px",
  marginTop: "15px"}} />
  
</div>


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
            marginRight:140,
            padding: "12px 5px",
            borderRadius: "3px",
            background: "#cc0707ff",
            cursor: "pointer",
            width: "53%",
            fontSize:19,
          }}
        >
       Change University
        </button>
      </div>
            </div>

  );
};


export default Sidebar;
