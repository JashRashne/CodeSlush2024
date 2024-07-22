import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLanding from "./components/MainLanding.jsx";
import OAuthCallback from "./components/OAuthCallback.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import SecurityDashboard from "./components/SecurityDashboard.jsx";
import CamSurveillance from "./components/CamSurveillance.jsx";
import SecurityCheckIn from "./components/SecurityCheckIn.jsx";
import { useState } from "react";

import WardenDashboard from "./components/WardenDashboard.jsx";
import PatientInfo from "./components/PatientInfo.jsx";
import CommunityChat from "./components/Community.jsx";
import StudentLocation from "./components/StudentLocation.jsx";
// import other components as needed

function App() {
  console.log("APP RENDERED");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      {/* Main Landing is rendered as a route */}
      {/* <WardenDashboard/> */}

      {/* <CommunityChat /> */}
      <Routes>
        <Route path="/oauth/callback" element={<OAuthCallback />} />
        <Route path="/" element={<MainLanding />} />
      </Routes>
    </Router>
  );
}

export default App;
