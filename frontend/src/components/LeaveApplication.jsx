import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import close from "../assets/close.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LeaveApplication = ({ setIsLeaveApplicationOpen }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);

  const onSubmit = async (data) => {
    // Check for validation errors
    if (!data.reason || !data.startDate || !data.endDate || !file) {
      toast.error("Please fill all the required fields and upload a letter.");
      return;
    }

    const formData = new FormData();
    formData.append("reason", data.reason);
    formData.append("startDateStr", data.startDate);
    formData.append("endDateStr", data.endDate);
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
      // Show success toast
      toast.success("Leave application submitted successfully!");
      // Optionally, close the modal
      setIsLeaveApplicationOpen(false);
    } catch (error) {
      console.error(
        "Error occurred while applying for leave:",
        error.response ? error.response.data : error.message
      );
      // Show error toast
      toast.error("Failed to submit leave application. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    toast.success("File uploaded successfully!");
  };

  return (
    <div className="flex flex-col w-[100%] h-[100%]">
      <div
        onClick={() => setIsLeaveApplicationOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl w-7 h-7 cursor-pointer flex items-center justify-center"
      >
        <img src={close} alt="close" />
      </div>
      <div className="h-[15%] w-[100%]  flex items-center bg-[#E0FEF8] justify-center rounded-t-xl">
        <div className="font-bold text-[3.7rem] text-[#036970] ">
          Leave Application
        </div>
      </div>
      <div className="h-[85%] w-[100%] flex flex-col z-[3] border bg-white border-[#E0FEF8] border-t-0 rounded-b-xl">
        <div className="flex h-[80%] w-[100%] mt-[3%]">
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
          <div className="h-[100%] w-[75%]">
            <div className="h-[20%] flex items-center justify-start ml-[4%]">
              <input
                {...register('reason', { required: "Reason is required" })}
                className="h-[58%] rounded-[8px] pl-[10px] w-[35%] border border-[#b1b3b1] "
                type="text"
                placeholder="Enter Reason"
              />
              {errors.reason && <p className="text-red-500 text-xs">{errors.reason.message}</p>}
            </div>
            <div className="h-[20%] flex items-center justify-start ml-[4%]">
              <input
                {...register('startDate', { required: "Start date is required" })}
                className="h-[58%] rounded-[8px] px-[10px] w-[35%] border border-[#b1b3b1] "
                type="date"
              />
              {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>}
            </div>
            <div className="h-[20%] flex items-center justify-start ml-[4%]">
              <input
                {...register('endDate', { required: "End date is required" })}
                className="h-[58%] rounded-[8px] px-[10px] w-[35%] border border-[#b1b3b1] "
                type="date"
              />
              {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate.message}</p>}
            </div>
            <div className="h-[40%] flex items-center justify-start ml-[4%]">
              <div className="flex items-center justify-center w-1/2 h-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-xs text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[20%] mb-5 items-center justify-center w-[100%]">
          <a
            onClick={handleSubmit(onSubmit)}
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
            <span className="absolute flex items-center justify-center w-full h-full text-[#036970] transition-all duration-300 transform group-hover:translate-x-full ease">
              Apply
            </span>
            <span className="relative invisible">Apply</span>
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LeaveApplication;
