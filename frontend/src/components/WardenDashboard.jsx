import React, { useState } from "react";
import patient from "../assets/patient.png";
import ambul from "../assets/ambul.png";
import Navbar from "./Navbar";
import WardenLocation from "./WardenLocation";
const WardenDashboard = () => {
  const [isLocationSelected, setIsLocationSelected] = useState(false);
  return (
    <div
      className="h-[100vh] w-[100%] flex flex-col items-center justify-center relative bg-white"
      // style={{
      //   background:
      //     "linear-gradient(to top, #FEF2F4 0%, #FFABAB 50%, #FEF2F4 100%)",
      // }}
    >
      {" "}
      {isLocationSelected && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-[50]" />

          <motion.div
            initial={{ opacity: 0, y: -500 }}
            animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute bg-[#3b7973] rounded-[1.8rem] overflow-hidden shadow-2xl z-[100] w-[90.5%] h-[90.5%] flex flex-col items-center justify-center"
          >
            <WardenLocation />
            {/* <SecurityCheckIn setCheckInPage={setCheckInPage} /> */}
            {/* <Alert setIsIsoAlertOpen={setIsIsoAlertOpen} /> */}
            {/* <MedicineTracker setIsSetMedicinesOpen={setIsSetMedicinesOpen} /> */}
          </motion.div>
        </>
      )}{" "}
      <div className="h-[10%] w-[100%] border-b-2 bg-gradient-to-r from-[#f2dde5] to-[#c1336a]">
        <Navbar />
      </div>
      <div className="h-[90%] w-[100%]">
        <div className="flex flex-col justify-center gap-[1rem] items-center w-[100%] mt-5 h-[40%] ">
          <h1 className="text-7xl font-bold text-[#8e193aeb] z-30">
            Welcome Warden
          </h1>
          <h1 className="text-3xl font-semibold text-[#8e193aeb] z-30">
            Hope you're having a good day!
          </h1>
        </div>
        <div className="h-[55%] w-[100%] flex flex-col gap-5 py-2 ">
          <div className="row-1 mt-5 h-4/5 flex gap-8 items-center justify-center px-10 ">
            <div className="row-1-elements  w-2/5 h-full overflow-hidden rounded-tr-2xl border-2   border-[#8e193aeb] shadow-2xl bg-white relative group ">
              <div className="w-full h-full flex items-center justify-center boreder-2  border-[#8e193aeb] rounded-tr-[3rem]">
                <img
                  src={ambul}
                  className="w-[100%] h-[100%] object-contain rounded-tr-2xl"
                />
              </div>
              <div
                onClick={() => {
                  setIsLocationSelected(!isLocationSelected);
                }}
                className="absolute inset-0 bg-[#8e193aeb]/60  opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
              >
                <span className="text-white text-2xl">Location Tracking</span>
              </div>
            </div>
            <div className="row-1-elements  w-2/5 h-full overflow-hidden rounded-tr-2xl border-2   border-[#8e193aeb] shadow-2xl bg-white relative group ">
              <div className="w-full h-full flex items-center justify-center  rounded-tr-[3rem]">
                <img
                  src={patient}
                  className="w-[100%] h-[100%] object-contain rounded-tr-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-[#8e193aeb]/60  opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <span className="text-white text-2xl">
                  Patient Info Sharing
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;
