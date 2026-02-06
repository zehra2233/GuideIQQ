import { Routes, Route } from "react-router-dom";
import RoughPage from "./pages/RoughPage";
import HomePage from "./pages/homepage";
import UniAnnouncement from "./pages/UniAnnouncement";
import Announcechatbox from "./pages/Announcechatbox";
import Academicchatbox from "./pages/Academicchatbox";
import FacultyDirectory from "./pages/FacultyDirectory";







function App() { 
  return (
    <Routes>
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/rough" element={<RoughPage />} />
        <Route path="/announcements" element={<UniAnnouncement />} />
          <Route path="/chatbox" element={<Announcechatbox />} />
            <Route path="/chatbox2" element={<Academicchatbox />} />
              <Route path="/Faculty" element={<FacultyDirectory/>} />

                    



    </Routes>
  );
}

export default App;
