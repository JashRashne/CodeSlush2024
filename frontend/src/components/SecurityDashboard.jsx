import React from "react";
import Navbar from "./Navbar";
import hostel from "../assets/hostel.png";
import cctv from "../assets/cctv.png";
import { motion } from "framer-motion";
const SecurityDashboard = () => {
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
