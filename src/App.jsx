import { Routes, Route, useLocation } from "react-router-dom";
import RoughPage from "./pages/student/RoughPage";
import HomePage from "./pages/student/homepage";
import StudentLogin from "./pages/student/StudentLogin";
import UniAnnouncement from "./pages/student/UniAnnouncement";
import Announcechatbox from "./pages/student/Announcechatbox";
import Academicchatbox from "./pages/student/Academicchatbox";
import FacultyDirectory from "./pages/student/FacultyDirectory";
import CampusMap from "./pages/student/CampusMap";
import WhatsAppButton from "./components/WhatsAppButton";
import DashboardLogin from "./pages/dashboard/DashboardLogin";
import Ai from "./pages/dashboard/ai";
import AddQuestion from "./pages/dashboard/AddQuestion";
import Announce from "./pages/dashboard/Announce";
import AddAnnounce from "./pages/dashboard/AddAnnounce";
import DeleteAnn from "./pages/dashboard/DeleteAnn";
import EditAnn from "./pages/dashboard/EditAnn"
import ViewAnn from "./pages/dashboard/ViewAnn";
import DeleteAi from "./pages/dashboard/DeleteAi";
import EditAi from "./pages/dashboard/EditAi";
import ViewAi from "./pages/dashboard/ViewAi";
import DashboardFaculty from "./pages/dashboard/DashboardFaculty";
import AddFaculty from "./pages/dashboard/AddFaculty";
import ViewFaculty from "./pages/dashboard/ViewFaculty";
import EditFaculty from "./pages/dashboard/EditFaculty";
import DeleteFaculty from "./pages/dashboard/DeleteFaculty";
import Setting from "./pages/dashboard/Setting";


function App() {
  const location = useLocation();

  // Check if current page is a dashboard page
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <Routes>
        {/* ── SYSTEM ROUTES ── */}
        <Route path="/" element={<HomePage />} />
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
        <Route path="/dashboard/announce" element={<Announce />} />
        <Route path="/dashboard/add-announcement" element={<AddAnnounce />} />
        <Route path="/dashboard/delete-announcement" element={<DeleteAnn />} />
        <Route path="/dashboard/edit-announcement" element={<EditAnn />} />
        <Route path="/dashboard/view-announcement" element={<ViewAnn />} />
        <Route path="/dashboard/delete-question" element={<DeleteAi />} />
        <Route path="/dashboard/edit-question" element={<EditAi />} />
        <Route path="/dashboard/view-question" element={<ViewAi />} />
        <Route path="/dashboard/faculty" element={<DashboardFaculty />} />
        <Route path="/dashboard/add-faculty" element={<AddFaculty />} />
        <Route path="/dashboard/view-faculty" element={<ViewFaculty />} />
        <Route path="/dashboard/edit-faculty" element={<EditFaculty />} />
        <Route path="/dashboard/delete-faculty" element={<DeleteFaculty />} />

        <Route path="/dashboard/settings" element={<Setting />} />

        {/* add more dashboard pages here */}
      </Routes>

      {/* Hide WhatsApp button on homepage, login, and all dashboard pages */}
      {!isDashboard && location.pathname !== "/homepage" && location.pathname !== "/" && <WhatsAppButton />}
    </>
  );
}

export default App;
