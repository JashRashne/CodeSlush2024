import { useState } from "react";

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

// import Sidebar from './components/Sidebar.jsx'
import Layout from "./components/Layout.jsx";
import MedicalHistory from "./components/MedicalHistory.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActivitySummary from "./components/ActivitySummary.jsx";
import AvatarCanvas from "./components/Avatar/AvatarCanvas.jsx";
import Alert from "./components/Alert.jsx";
import PatientInfo from "./components/PatientInfo.jsx";
import LeaveApplication from "./components/LeaveApplication.jsx";
import LeaveReview from "./components/LeaveReview.jsx";

import WardenDashboard from "./components/WardenDashboard.jsx";
import StudentDashboard from "./components/StudentDashboard.jsx";
import HelpAsk from "./components/HelpAsk.jsx";

import DownloadEntries from "./components/DownloadEntries.jsx";
import MedicineTracker from "./components/MedicineTracker.jsx";
import SecurityCheckIn from "./components/SecurityCheckIn.jsx";

function App() {
  return (
    <>
      <Router>
        <Layout>
          {/* CHILD COMPONENTS HERE */}
          {/* TEST */}
          {/* <MedicineTracker /> */}
          {/* <DownloadEntries /> */}
          {/* <LeaveApplication /> */}
          {/* <LeaveReview /> */}
          {/* <Alert /> */}
          {/* <AvatarCanvas /> */}
          {/* <MedicalHistory /> */}
          {/* <CamSurveillance /> */}
          {/* <PatientInfo /> */}
          <SecurityCheckIn />
          {/* {/* <WardenDashboard/>
          <StudentDashboard/> */}
          {/* <HelpAsk /> */}
        </Layout>
      </Router>
    </>
  );
}

export default App;
