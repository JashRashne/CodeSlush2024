import React from "react";
import PatientInfoSharing from "../assets/patientinfosharing.png";
import PatientLocationTracking from "../assets/PatientTracking.png";

const WardenDashboard = () => {
  return (
    <div className="h-[100%] flex p-[2rem] flex-col items-center justify-center gap-[1rem]" 
         style={{ background: "linear-gradient(to top, #FEF2F4 0%, #FFABAB 50%, #FEF2F4 100%)" }}>
      <div className="flex justify-center items-center  mt-0 w-[100%] h-1/5">
        <h1 className="text-7xl font-bold text-[#8e193aeb] z-30 mt-5">Welcome Warden</h1>
        
      </div>
      <h1 className="text-3xl font-semibold text-[#8e193aeb] z-30 mt-10">Hope you're having a good day!</h1>
      <div className="h-4/5 w-[100%] flex flex-col gap-5 py-2 ">
        <div className="row-1 mt-5 h-4/5 flex gap-8 items-center justify-center px-10 ">
          <div className="row-1-elements w-2/5 h-full overflow-hidden rounded-tr-2xl bg-white relative group ">
            <div className="w-full h-full flex items-center justify-center border-2 border-[#8e193aeb] rounded-tr-2xl">
              <img src={PatientLocationTracking} className="w-[100%] h-[100%] object-cover rounded-tr-2xl" />
            </div>
            <div className="absolute inset-0 bg-[#9da09f] bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <span className="text-white text-2xl">Location Tracking</span>
            </div>
          </div>
          <div className="row-1-elements w-2/5 h-full overflow-hidden rounded-tr-2xl bg-white relative group ">
            <div className="w-full h-full flex items-center justify-center border-2 border-[#8e193aeb] rounded-tr-2xl">
              <img src={PatientInfoSharing} className="w-[100%] h-[100%] object-cover rounded-tr-2xl" />
            </div>
            <div className="absolute inset-0 bg-[#9da09f] bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <span className="text-white text-2xl">Patient Info Sharing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;
