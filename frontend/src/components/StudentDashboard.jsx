import React from "react";
import RoomOccupancy from "./RoomOccupancy";
import ActivitySummary from "./ActivitySummary";
import AvatarCanvas from "./Avatar/AvatarCanvas";

const StudentDashboard = () => {
  return (
    <>
      <div className="container w-[100%] flex flex-col h-[100%] ">
        <div className="header-wrapper flex justify-between items-center  w-[100%] h-[10.5%] px-2">
          <h1 className="text-5xl flex items-center justify-center pl-6 font-semibold">
            HELLO USER
          </h1>
          <div>
            hj
            <img />
          </div>
        </div>

        <div className="h-[90%] flex flex-col gap-[0.8rem] py-2">
          <div className="row-1 h-2/5 flex gap-[2rem] items-center justify-center ">
            <div className="row-1-elements medicine-tracker w-[30%] h-[100%] overflow-hidden rounded-[1.8rem]  bg-gray-200">
              <div className="w-[100%] h-[27.5%] text-xl flex  items-center justify-center">
                <h1 className="w-[87.5%] font-semibold">Medicine Tracker</h1>
              </div>
              <div className="h-[100%] scroll-smooth overflow-scroll scrollbar-hide  ">
                <div className="justify-center h-[100%] flex flex-wrap gap-[0.4rem] w-[100%]">
                  <div className="w-[87.5%] h-[24.5%] bg-white rounded-xl "></div>
                  <div className="w-[87.5%] h-[24.5%] bg-white rounded-xl "></div>
                  <div className="w-[87.5%] h-[24.5%] bg-white rounded-xl "></div>
                  <div className="w-[87.5%] h-[24.5%] bg-white rounded-xl "></div>{" "}
                  <div className="w-[87.5%] h-[24.5%] bg-white rounded-xl "></div>
                  <div className="w-[87.5%] h-[24.5%] bg-white rounded-xl "></div>
                  <div className="w-[87.5%] h-[24.5%] bg-white rounded-xl "></div>
                  <div className="w-[87.5%] h-[24.5%] bg-white rounded-xl "></div>
                  <div className="w-[87.5%] h-[24.5%] bg-white rounded-xl "></div>
                  <div className="w-[87.5%] h-[24.5%] bg-white rounded-xl "></div>
                  <div className="w-[87.5%] h-[24.5%] bg-white rounded-xl "></div>
                  <div className="w-[87.5%] h-[24.5%] bg-white rounded-xl "></div>
                </div>
              </div>
            </div>
            <div className="row-1-elements w-[30%] h-[100%] rounded-[1.8rem] p-2 bg-gray-200">
              <AvatarCanvas />
            </div>
            <div className="row-1-elements w-[30%] h-[100%] overflow-hidden rounded-[1.8rem] p-2 bg-gray-200">
              <div className="w-[100%] h-[27.5%]  text-xl  flex  items-center justify-center">
                <h1 className="w-[87.5%] font-semibold">Medicine History</h1>
              </div>{" "}
              <div className="h-[100%] scroll-smooth overflow-scroll scrollbar-hide  ">
                <div className="  items-center h-auto flex flex-col gap-[0.2rem] mb-[4rem]">
                  <div className="w-[90%] h-[2.5rem] rounded-xl flex justify-between px-2 items-center ">
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
                </div>
              </div>
            </div>
          </div>
          <div className="row-2 h-1/5 gap-[2rem] flex items-center justify-center">
            <div className="row-2-elements w-[20%] h-[100%] rounded-md bg-purple-500 flex items-center justify-center ">
              Sick Shield
            </div>
            <div className="row-2-elements w-[20%] h-[100%] rounded-md bg-purple-500 flex items-center justify-center ">
              Leave Lever
            </div>
            <div className="row-2-elements w-[20%] h-[100%] rounded-md bg-purple-500 flex items-center justify-center ">
              Room Radar
            </div>

            <div className="row-2-elements w-[20%] h-[100%] rounded-md bg-purple-500 flex items-center justify-center ">
              Stress SOS
            </div>
          </div>
          <div className="row-3 h-2/5 flex items-center justify-center gap-[1.2rem] ">
            <div className="row-3-elements w-[48%] rounded-[1.8rem] bg-red-200 h-[100%] ">
              <ActivitySummary />
            </div>
            <div className="row-3-elements w-[48%] rounded-[1.8rem] bg-white h-[100%] p-2">
              <RoomOccupancy />
            </div>
          </div>
        </div>
      </div>
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
