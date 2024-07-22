import React, { useState } from "react";
import React, { useState } from "react";
import RoomOccupancy from "./RoomOccupancy";
import ActivitySummary from "./ActivitySummary";
import AvatarCanvas from "./Avatar/AvatarCanvas";
import setting from "../assets/setting.png";
import add from "../assets/add.png";
import logout from "../assets/logout.png";
import { easeIn, easeInOut, easeOut, motion } from "framer-motion";
import MedicineDisplay from "./MedicineDisplay";
import { set, useForm } from "react-hook-form";
import MedicineTracker from "./MedicineTracker";
import MedHistory from "./MedHistory";
import Alert from "./Alert";
import LeaveApplication from "./LeaveApplication";
import Navbar from "./Navbar";
import HelpAsk from "./HelpAsk";
const StudentDashboard = () => {
  const [isSetMedicinesOpen, setIsSetMedicinesOpen] = useState(false);
  const [isIsoAlertOpen, setIsIsoAlertOpen] = useState(false);
  const [isLeaveApplicationOpen, setIsLeaveApplicationOpen] = useState(false);
  const [isRoomEntryOpening, setIsRoomEntryOpening] = useState(false);
  const [isStressSOSOpen, setIsStressSOSOpen] = useState(false);
  const [isRoomOccupancyOpen, setIsRoomOccupancyOpen] = useState(false);

  const { register, handleSubmit } = useForm();

  return (
    <>
      {/* bg-gradient-to-tr from-white to-[#70d7bb97] */}{" "}
      <div className=" h-[100vh] w-[100%] flex flex-col items-center justify-center relative ">
        {isSetMedicinesOpen && (
          <>
            <div className="fixed inset-0 bg-black opacity-50 z-[50]" />{" "}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              // exit={{ opacity: 0, y: 0, scale: 0 }}
              transition={{ delay: 0.1, ease: easeInOut }}
              className="absolute bg-white dark:bg-purple-200 p-6 rounded-[1.8rem] shadow-2xl h-[70vh] w-[60vw] z-[100] "
            >
              <MedicineTracker setIsSetMedicinesOpen={setIsSetMedicinesOpen} />
            </motion.div>
          </>
        )}{" "}
        {isIsoAlertOpen && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50 z-[50]" />

            {/* Motion Alert */}
            <motion.div
              initial={{ opacity: 0, y: -500, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              // exit={{ opacity: 0, y: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: easeInOut }}
              className="absolute bg-[#FFFFDD] p-6 rounded-[1.8rem] shadow-2xl z-[100] flex items-center justify-center"
            >
              <Alert setIsIsoAlertOpen={setIsIsoAlertOpen} />
              {/* <MedicineTracker setIsSetMedicinesOpen={setIsSetMedicinesOpen} /> */}
            </motion.div>
          </>
        )}{" "}
        {isLeaveApplicationOpen && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50 z-[50]" />

            {/* Motion Alert */}
            <motion.div
              initial={{ opacity: 0, x: -500, y: -500 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              // exit={{ opacity: 0, y: 0, scale: 0 }}
              transition={{ duration: 1.8, ease: easeInOut }}
              className="absolute bg-[#d5f3b9] rounded-[1.8rem] shadow-2xl w-[80%] h-[87%] z-[100] flex items-center justify-center"
            >
              <LeaveApplication
                setIsLeaveApplicationOpen={setIsLeaveApplicationOpen}
              />
              {/* <Alert setIsIsoAlertOpen={setIsIsoAlertOpen} /> */}
              {/* <MedicineTracker setIsSetMedicinesOpen={setIsSetMedicinesOpen} /> */}
            </motion.div>
          </>
        )}{" "}
        {isRoomEntryOpening && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50 z-[50]" />

            {/* Motion Alert */}
            <motion.div
              initial={{ opacity: 0, y: -500, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              // exit={{ opacity: 0, y: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: easeInOut }}
              className="absolute bg-[#FFFFDD] p-6 rounded-[1.8rem] shadow-2xl z-[100] flex items-center justify-center"
            >
              <Alert setIsIsoAlertOpen={setIsIsoAlertOpen} />
              {/* <MedicineTracker setIsSetMedicinesOpen={setIsSetMedicinesOpen} /> */}
            </motion.div>
          </>
        )}{" "}
        {isStressSOSOpen && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50 z-[50]" />

            {/* Motion Alert */}
            <motion.div
              initial={{ opacity: 0, y: -500, scale: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              // exit={{ opacity: 0, y: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: easeInOut }}
              className="absolute bg-[#A2C579] p-6 rounded-[1.8rem] shadow-2xl z-[100] w-[77.5%] h-[97.5%] flex items-center justify-center"
            >
              <HelpAsk setIsStressSOSOpen={setIsStressSOSOpen} />
              {/* <Alert setIsIsoAlertOpen={setIsIsoAlertOpen} /> */}
              {/* <MedicineTracker setIsSetMedicinesOpen={setIsSetMedicinesOpen} /> */}
            </motion.div>
          </>
        )}{" "}
        {isRoomOccupancyOpen && (
          <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50 z-[50]" />

            {/* Motion Alert */}
            <motion.div
              initial={{ opacity: 0, y: -500 }}
              animate={{ opacity: 1, y: 0 }}
              // exit={{ opacity: 0, y: 0, scale: 0 }}
              transition={{ duration: 0.8, ease: easeInOut }}
              className="absolute bg-[#caf5f1] p-6 rounded-[1.8rem] shadow-2xl z-[100] w-[97.5%] h-[97.5%] flex flex-col items-center justify-center"
            >
              <RoomOccupancy setIsRoomOccupancyOpen={setIsRoomOccupancyOpen} />
              {/* <Alert setIsIsoAlertOpen={setIsIsoAlertOpen} /> */}
              {/* <MedicineTracker setIsSetMedicinesOpen={setIsSetMedicinesOpen} /> */}
            </motion.div>
          </>
        )}{" "}
        <div className="h-[10%] w-[100%] border-b-2 bg-gradient-to-tr from-[#d7fef5] to-white">
          <Navbar />
        </div>
        <div className="h-[90%] w-[100%]">
          <div className="h-[100%] w-[100%] flex p-[2rem] items-center justify-center gap-[1rem]">
            <div className="h-[100%] w-[72.5%] flex flex-col items-center justify-center gap-[1rem]">
              <div className="bg-[#016A70] w-[100%] text-white flex items-center justify-center h-[65%]">
                <div className="h-[100%] w-[60%] flex flex-col items-center justify-center">
                  <div className="w-[100%] h-[60%] py-3 px-7">
                    <h1 className="text-[4.2rem]">WELCOME JUHI</h1>
                    <p className="text-[1.6rem]">
                      Hope you are having a great day !
                    </p>
                  </div>
                  <div className="w-[100%] h-[40%] flex  justify-center">
                    <div className="tracker bg-[#FFFFDD] w-[90%] h-[80%] p-2 rounded-[1.8rem] flex "></div>
                  </div>
                </div>
                <div className="h-[100%] w-[42%] flex items-center justify-center">
                  <div className="avatar bg-[#FFFFDD] h-[80%] w-[87%] rounded-[1.8rem]  overflow-hidden">
                    <AvatarCanvas />
                  </div>
                </div>
              </div>
              <div className="w-[100%] h-[35%] flex items-center justify-between ">
                {" "}
                <div className=" h-[100%] w-[23%] flex items-center justify-center ">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ ease: easeInOut }}
                    onClick={() => {
                      setIsIsoAlertOpen(!isIsoAlertOpen);
                    }}
                    className="bg-[#ADE792] cursor-pointer shadow-2xl w-[100%] h-[70%] rounded-xl"
                  >
                    Sick Shield
                  </motion.div>
                </div>
                <div className=" h-[100%] w-[23%] flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ ease: easeInOut }}
                    onClick={() => {
                      setIsLeaveApplicationOpen(!isLeaveApplicationOpen);
                    }}
                    className="bg-[#ADE792] cursor-pointer shadow-2xl w-[100%] h-[70%] rounded-xl"
                  >
                    Leave Lever
                  </motion.div>
                </div>
                <div className=" h-[100%] w-[23%] flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ ease: easeInOut }}
                    onClick={() => {
                      setIsRoomEntryOpening(!isRoomEntryOpening);
                    }}
                    className="bg-[#ADE792] cursor-pointer shadow-2xl w-[100%] h-[70%] rounded-xl"
                  >
                    Room Radar
                  </motion.div>
                </div>
                <div className=" h-[100%] w-[23%] flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ ease: easeInOut }}
                    onClick={() => {
                      setIsStressSOSOpen(!isStressSOSOpen);
                    }}
                    className="bg-[#ADE792] cursor-pointer shadow-2xl w-[100%] h-[70%] rounded-xl"
                  >
                    Stress SOS
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="h-[100%] w-[27.5%] flex flex-col items-center justify-center gap-[1rem]">
              <div className="w-[100%] h-[45%] flex flex-col items-center justify-center gap-[1rem]">
                <div className="bg-[#b9e6d4] relative drop-shadow-md p-2 tracker w-[100%] rounded-tr-[1.8rem] h-[50%] flex flex-col">
                  {/* bg-[#91cd6c]        {" "} */}
                  {/* bg-[#88caaf] */}
                  <div className="w-[100%]">
                    <div
                      onClick={() => setIsSetMedicinesOpen(!isSetMedicinesOpen)}
                      className="float-right text-center flex items-center justify-center text-xl cursor-pointer pr-2"
                    >
                      <img src={add} alt="add" className="w-[2rem] " />
                    </div>
                  </div>
                  <div className="overflow-auto scrollbar-hide w-[95%] ">
                    {" "}
                    <MedicineDisplay />
                  </div>
                </div>
                <div
                  onClick={() => {
                    setIsRoomOccupancyOpen(!isRoomOccupancyOpen);
                  }}
                  className="bg-[#b9e6d4] cursor-pointer drop-shadow-md w-[100%] rounded-tr-[1.8rem] h-[50%] p-2"
                >
                  ROOM OCCUPANCY
                </div>
              </div>
              <div className="w-[100%] h-[55%] relative">
                <div className="w-[95%] h-[95%] bg-[#11493f] absolute top-0 left-0 border-2 shadow-2xl"></div>
                <div className="w-[95%] h-[95%] bg-[#65b997] border-2 border-[#11493f] absolute bottom-0 right-0  shadow-2xl overflow-hidden pb-[3.7rem] ">
                  <h1 className="bg-white h-[20%] text-2xl p-2 text-center">
                    Medical History
                  </h1>

                  <div className="w-[100%] h-[100%] overflow-auto scrollbar-hide p-3 mt-2">
                    <MedHistory />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container min-w-[100vw] bg-red-200 flex flex-col min-h-[100vh] relative">
        {isSetMedicinesOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            // exit={{ opacity: 0, y: 0, scale: 0 }}
            transition={{ delay: 0.1, ease: easeInOut }}
            className="absolute bg-white dark:bg-purple-200 p-6 rounded-[1.8rem] shadow-2xl h-[70vh] w-[60vw] z-[100] "
          >
            <MedicineTracker setIsSetMedicinesOpen={setIsSetMedicinesOpen} />
          </motion.div>
        )}
        {isIsoAlertOpen && (
          <motion.div
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            // exit={{ opacity: 0, y: 0, scale: 0 }}
            transition={{ delay: 0.1, duration: 1, ease: easeInOut }}
            className="absolute bg-white dark:bg-purple-200 p-6 rounded-[1.8rem] shadow-2xl h-[90vh] w-[90vw] z-[100] "
          >
            <MedicineTracker setIsSetMedicinesOpen={setIsSetMedicinesOpen} />
          </motion.div>
        )}
        <div className="header-wrapper flex justify-between items-center  w-[100%] h-[17%] bg-purple-200 px-2">
          <h1 className="h-[100%] text-5xl flex items-center justify-center pl-6 font-semibold ">
            HELLO USER
          </h1>
          <motion.div
            className="mr-7 flex items-center justify-center relative"
            onClick={() => setIsSettingOpen(!isSettingOpen)}
          >
            <img
              src={setting}
              alt="setting"
              className="w-[2.3rem] cursor-pointer"
            />

            {isSettingOpen ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 0, scale: 0.6, x: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 40, x: -20 }}
                  transition={{
                    delay: 0.1,
                    duration: 0.2,
                    ease: easeInOut,
                  }}
                  className="absolute top-0 right-0 bg-orange-300 w-[12rem] h-[5rem] rounded-[0.6rem] p-2 gap-2 flex items-center justify-center"
                >
                  <h1 className="text-2xl">Logout</h1>
                  <img
                    src={logout}
                    alt="logout"
                    className="w-[1.2rem] cursor-pointer"
                  />
                </motion.div>
              </>
            ) : (
              <></>
            )}
          </motion.div>
        </div>

        <div className="h-[85%] w-[100%] flex flex-col gap-[0.8rem] py-2">
          <div className="row-1 h-2/5 flex gap-[2rem] items-center justify-center ">
            <div className="row-1-elements medicine-tracker w-[30%] h-[100%] overflow-hidden rounded-[1.8rem]  bg-white">
              <div className="w-[100%] h-[27.5%] px-4 text-xl flex  items-center justify-center">
                <h1 className="w-[87.5%] font-semibold">Medicine Tracker</h1>
                <button
                  onClick={() => {
                    setIsSetMedicinesOpen(!isSetMedicinesOpen);
                  }}
                >
                  Set
                </button>
              </div>
              <div className="h-[100%] scroll-smooth overflow-scroll scrollbar-hide  ">
                {/* <MedicineDisplay /> */}
      {/* <div className="justify-center h-[100%] flex flex-wrap gap-[0.4rem] w-[100%]">
                  <MedicineDisplay />
                </div>
              </div>
            </div> */}
      {/* <div className="row-1-elements w-[30%] h-[100%] rounded-[1.8rem] p-2 bg-white">
              <AvatarCanvas />
            </div>
            <div className="row-1-elements w-[30%] h-[100%] overflow-hidden rounded-[1.8rem] p-2 bg-sky-800">
              <div className="w-[100%] h-[27.5%]  text-xl  flex  items-center justify-center">
                <h1 className="w-[87.5%] font-semibold">Medicine History</h1>
              </div>{" "}
              <div className="h-[100%] scroll-smooth overflow-scroll scrollbar-hide  ">
                <MedHistory /> */}
      {/* <div className="  items-center h-auto flex flex-col gap-[0.2rem] mb-[4rem]">
                  <div className="w-[90%] bg-white h-[2.5rem] rounded-xl flex justify-between px-2 items-center ">
                    <div>Reason</div>
                    <div>Admission Date</div>
                  </div>{" "}
                  <div className="w-[90%] h-[2.5rem] rounded-xl flex justify-between px-2 items-center ">
                    <div>Reason</div>
                    <div>Admission Date</div>
                  </div>{" "}
                  <div className="w-[90%] h-[2.5rem] rounded-xl flex justify-between px-2 items-center ">
                    <div>Reason</div>
                    <div>Admission Date</div>
                  </div>
                </div> */}
      {/* </div>
            </div>
          </div>
          <div className="row-2 h-1/5 gap-[2rem] flex items-center justify-center">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ ease: easeInOut }}
              onClick={() => {
                setIsIsoAlertOpen(!isIsoAlertOpen);
              }}
              className="row-2-elements w-[20%] h-[100%] rounded-md bg-purple-500 flex items-center justify-center "
            >
              Sick Shield
            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ ease: easeInOut }}
              onClick={() => {
                setIsLeaveApplicationOpen(!isLeaveApplicationOpen);
              }}
              className="row-2-elements w-[20%] h-[100%] rounded-md bg-purple-500 flex items-center justify-center "
            >
              {" "}
              Leave Lever
            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ ease: easeInOut }}
              onClick={() => {
                setIsRoomEntryOpening(!isRoomEntryOpening);
              }}
              className="row-2-elements w-[20%] h-[100%] rounded-md bg-purple-500 flex items-center justify-center "
            >
              {" "}
              Room Radar
            </motion.div>

            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ ease: easeInOut }}
              onClick={() => {
                setIsStressSOSOpen(!isStressSOSOpen);
              }}
              className="row-2-elements w-[20%] h-[100%] rounded-md bg-purple-500 flex items-center justify-center "
            >
              {" "}
              Stress SOS
            </motion.div>
          </div>
          <div className="row-3 h-2/5 flex items-center justify-center gap-[1.2rem] ">
            <div className="row-3-elements w-[48%] rounded-[1.8rem] bg-red-200 h-[100%] ">
              <ActivitySummary />
            </div>
            <div className="row-3-elements w-[48%] rounded-[1.8rem] bg-white h-[100%] p-2">
              <RoomOccupancy />
            </div>
          </div> */}
      {/* </div>
      </div>  */}
      {/* <div className="bg-red-300 flex flex-col w-[100%] h-[100%] space-y-2">
        <div className="bg-green-300 h-[30%] flex items-center gap-2">
          <div className="w-[60%] h-[100%] bg-pink-200">Name +AVATAR</div>
          <div className="bg-purple-200 w-[40%] h-[100%]">Weekly report</div>
        </div>
        <div className=" h-[55%] flex items-center gap-2">
          <div className="w-[35%] bg-white h-[100%] rounded-md  overflow-hidden  ">
            <h1 className="w-[100%] h-[16%] flex items-center bg-gray-200 border-b-2 p-1">
              Medicine Tracker{" "}
            </h1>
            <div className="bg-green-400 h-[100%] scroll-smooth overflow-scroll scrollbar-hide p-2 ">
              <div className="justify-center h-[100%] flex flex-wrap gap-4  mt-2 w-[100%]">
                <div className="w-[70%] h-[40%] bg-white  "></div>
                <div className="w-[70%] h-[40%] bg-white  "></div>
                <div className="w-[45%] h-[40%] bg-white  "></div>
                <div className="w-[45%] h-[40%] bg-white  "></div>{" "}
                <div className="w-[45%] h-[40%] bg-white  "></div>
                <div className="w-[45%] h-[40%] bg-white  "></div>
                <div className="w-[45%] h-[40%] bg-white  "></div>
                <div className="w-[45%] h-[40%] bg-white  "></div>
                <div className="w-[45%] h-[40%] bg-white  "></div>
                <div className="w-[45%] h-[40%] bg-white  "></div>
                <div className="w-[45%] h-[40%] bg-white  "></div>
                <div className="w-[45%] h-[40%] bg-white  "></div>
              </div>
            </div>
          </div>
          <div className="w-[35%] bg-red-800 h-[100%]">
            {/* Reading Room */}
      {/* <RoomOccupancy /> */}
      {/* </div> */}
      {/* MEDICAL HISTORY */}
      {/* <div className="w-[35%] bg-red-800 h-[100%]">
            <h1>Medical History</h1> */}
      {/* <ActivitySummary /> */}
      {/* <div>
              <div>Date of Admission </div>
            </div>
          </div>
        </div>
        <div className="bg-green-900 h-[20%] flex items-center gap-2">
          <div className="w-[25%] bg-red-400 h-[100%]">a</div>
          <div className="w-[25%] bg-red-400 h-[100%]">a</div>
          <div className="w-[25%] bg-red-400 h-[100%]">a</div>
          <div className="w-[25%] bg-red-400 h-[100%]">a</div>
        </div>
      </div> */}
    </>
  );
};

export default StudentDashboard;
