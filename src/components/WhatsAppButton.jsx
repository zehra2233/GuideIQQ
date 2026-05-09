import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "150px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "#fff",
        borderRadius: "50%",
         padding: "12px",        // 👈 bigger circle
    fontSize: "32px",       // 👈 bigger icon
    zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
  <FaWhatsapp size={40} /> {/* 👈 increase ONLY icon */}
    </a>
  );
};

export default WhatsAppButton;