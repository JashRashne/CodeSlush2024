import React, { useState } from "react";
import Navbar from "./Navbar";
import hostel from "../assets/hostel.png";
import cctv from "../assets/cctv.png";
import { motion } from "framer-motion";
import SecurityCheckIn from "./SecurityCheckIn";
import CamSurveillance from "./CamSurveillance";

const SecurityDashboard = () => {
  const [checkInPage, setCheckInPage] = useState(false);
  const [survCam, setSurvCam] = useState(false);
  return (
    <>
      {" "}
      <div
        style={{
          background:
            "linear-gradient(to top, #9AD0C2 0%, #FFFFFF 50%, #9AD0C2 100%)",
        }}
        className="h-[100vh] w-[100%]  flex flex-col items-center justify-center relative"
      >
        {checkInPage && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-[50]" />

            <motion.div
              initial={{ opacity: 0, y: -500 }}
              animate={{ opacity: 1, y: 0 }}
              // exit={{ opacity: 0, y: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute bg-[#3b7973] rounded-[1.8rem] overflow-hidden shadow-2xl z-[100] w-[90.5%] h-[90.5%] flex flex-col items-center justify-center"
            >
              <SecurityCheckIn setCheckInPage={setCheckInPage} />
              {/* <Alert setIsIsoAlertOpen={setIsIsoAlertOpen} /> */}
              {/* <MedicineTracker setIsSetMedicinesOpen={setIsSetMedicinesOpen} /> */}
            </motion.div>
          </>
        )}
        {survCam && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-[50]" />

            <motion.div
              initial={{ opacity: 0, y: -500 }}
              animate={{ opacity: 1, y: 0 }}
              // exit={{ opacity: 0, y: 0, scale: 0 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
              className="absolute bg-[#96d5ce] rounded-[1.8rem] overflow-hidden shadow-2xl z-[100] w-[90.5%] h-[90.5%] flex flex-col items-center justify-center"
            >
              <CamSurveillance setSurvCam={setSurvCam} />
              {/* <Alert setIsIsoAlertOpen={setIsIsoAlertOpen} /> */}
              {/* <MedicineTracker setIsSetMedicinesOpen={setIsSetMedicinesOpen} /> */}
            </motion.div>
          </>
        )}
        <div className="h-[10%] w-[100%] border-b-2 bg-white">
          <Navbar />
        </div>
        <div className="h-[90%] w-[100%] flex gap-[0.2rem] p-2">
          <div className="w-[50%]  flex justify-center items-center px-4">
            <h1 className="text-[6rem] text-left w-[100%] font-extrabold text-[#2b5151] ">
              WELCOME TO SECURITY SYSTEM
            </h1>
          </div>
          <div className="w-[50%] flex flex-col justify-center items-center gap-[1rem]">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ ease: "easeInOut" }}
              className="w-[90%] bg-white cursor-pointer overflow-hidden h-[40%] rounded-[1.8rem] shadow-2xl shadow-[#2b5151] relative group"
            >
              <img src={hostel} alt="hostel" className=" object-contain " />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                onClick={() => {
                  setCheckInPage(!checkInPage);
                }}
                className="absolute top-0 right-0 inset-0 bg-[#2c826aeb] flex items-center justify-center"
              >
                <div className="text-white font-bold text-[3rem]">
                  Security Check In
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ ease: "easeInOut" }}
              className="w-[90%] bg-white cursor-pointer overflow-hidden h-[40%] rounded-[1.8rem] shadow-2xl shadow-[#2b5151] relative group"
            >
              <img src={hostel} alt="hostel" className=" object-contain " />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ ease: "easeInOut", duration: 0.3 }}
                onClick={() => {
                  setSurvCam(!survCam);
                }}
                className="absolute top-0 right-0 inset-0 bg-[#2c826aeb] flex items-center justify-center"
              >
                <div className="text-white font-bold text-[3rem]">
                  Surveillance Cam
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecurityDashboard;
