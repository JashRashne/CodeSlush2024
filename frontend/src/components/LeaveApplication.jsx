import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import close from "../assets/close.png";
const LeaveApplication = ({ setIsLeaveApplicationOpen }) => {
  const { register, handleSubmit } = useForm();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [file, setFile] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("reason", title);
    formData.append("startDateStr", start);
    formData.append("endDateStr", end);
    formData.append("file", file); // file input

    try {
      const response = await axios.post(
        "http://localhost:8000/apply-leave",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response data:", response.data);
    } catch (error) {
      console.error(
        "Error occurred while applying for leave:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleStartChange = (e) => {
    setStart(e.target.value);
  };

  const handleEndChange = (e) => {
    setEnd(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className=" flex flex-col w-[100%] h-[100%] ">
      <div
        onClick={() => {
          setIsLeaveApplicationOpen(false);
        }}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl w-7 h-7 cursor-pointer flex items-center justify-center"
      >
        <img src={close} alt="close" />
      </div>
      <div className="h-[15%] w-[100%]  flex items-center bg-[#E0FEF8] justify-center rounded-t-xl">
        <div className="font-bold text-[3.7rem] text-[#036970] ">
          Leave Application
        </div>
      </div>
      <div className="h-[85%]  w-[100%] flex flex-col z-[3] border bg-white border-[#E0FEF8] border-t-0 rounded-b-xl">
        <div className="flex h-[80%] w-[100%] mt-[3%] ">
          <div className="h-[100%] w-[25%] flex flex-col">
            <div className="font-semibold text-[#036970] text-[20px] h-[20%] flex items-center justify-end mr-[4%]">
              Enter Reason:
            </div>
            <div className="font-semibold text-[#036970] text-[20px] h-[20%] flex items-center justify-end mr-[4%]">
              Enter Start Date:
            </div>
            <div className="font-semibold text-[#036970] text-[20px] h-[20%] flex items-center justify-end mr-[4%]">
              Enter End Date:
            </div>
            <div className="font-semibold text-[#036970] text-[20px] h-[20%] flex items-center justify-end mr-[4%]">
              Upload Letter:
            </div>
          </div>
          <div className="h-[100%] w-[75%] ">
            <div className="h-[20%] flex items-center justify-start ml-[4%]">
              <input
                className="h-[58%] rounded-[8px] pl-[10px] w-[35%] border border-[#b1b3b1] border-[1px]"
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Enter Reason"
              />
            </div>
            <div className="h-[20%] flex items-center justify-start ml-[4%]">
              <input
                className="h-[58%] rounded-[8px] px-[10px] w-[35%] border border-[#b1b3b1] border-[1px]"
                type="date"
                value={start}
                onChange={handleStartChange}
              />
            </div>
            <div className="h-[20%] flex items-center justify-start ml-[4%]">
              <input
                className="h-[58%] rounded-[8px] px-[10px] w-[35%] border border-[#b1b3b1] border-[1px]"
                type="date"
                value={end}
                onChange={handleEndChange}
              />
            </div>
            <div className="h-[40%] flex items-center justify-start ml-[4%] ">
              <div class="flex items-center justify-center w-1/2 h-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  "
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-xs text-gray-500 ">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 ">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[20%] mb-5  items-center justify-center w-[100%]">
          <a
            onClick={handleSubmit}
            className="mt-[20px] bg-[#E0FEF8] relative inline-flex items-center justify-center p-4 px-[6] py-3 overflow-hidden font-medium text-[#036970] transition duration-300 ease-out border-2 border-[#036970] rounded-full shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#E0FEF8] group-hover:translate-x-0 ease">
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <div className="absolute flex items-center justify-center w-full h-full text-[#036970] transition-all duration-300 transform group-hover:translate-x-full ease">
              SCHEDULE
            </div>
            <span className="relative invisible">SCHEDULE</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;
