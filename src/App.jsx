import { Routes, Route, useLocation } from "react-router-dom";
import RoughPage from "./pages/student/RoughPage";
import HomePage from "./pages/student/homepage";
import UniAnnouncement from "./pages/student/UniAnnouncement";
import Announcechatbox from "./pages/student/Announcechatbox";
import Academicchatbox from "./pages/student/Academicchatbox";
import FacultyDirectory from "./pages/student/FacultyDirectory";
import CampusMap from "./pages/student/CampusMap";
import WhatsAppButton from "./components/WhatsAppButton";
import DashboardLogin from "./pages/dashboard/DashboardLogin";
import Ai from "./pages/dashboard/ai";
import AddQuestion from "./pages/dashboard/AddQuestion";

function App() {
  const location = useLocation();

  // Check if current page is a dashboard page
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <Routes>
        {/* ── SYSTEM ROUTES ── */}
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/rough" element={<RoughPage />} />
        <Route path="/announcements" element={<UniAnnouncement />} />
        <Route path="/chatbox" element={<Announcechatbox />} />
        <Route path="/chatbox2" element={<Academicchatbox />} />
        <Route path="/Faculty" element={<FacultyDirectory />} />
        <Route path="/Campus" element={<CampusMap />} />

        {/* ── DASHBOARD ROUTES ── */}
        <Route path="/dashboard/login" element={<DashboardLogin />} />
        <Route path="/dashboard/ai" element={<Ai />} />
        <Route path="/dashboard/add-question" element={<AddQuestion />} />
        {/* add more dashboard pages here */}
      </Routes>

      {/* Hide WhatsApp button on homepage AND all dashboard pages */}
      {!isDashboard && location.pathname !== "/homepage" && <WhatsAppButton />}
    </>
  );
}

export default App;
