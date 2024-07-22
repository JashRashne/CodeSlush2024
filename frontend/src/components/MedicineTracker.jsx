import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import close from "../assets/close.png";
import "react-toastify/dist/ReactToastify.css";

const MedicineTracker = ({ setIsSetMedicinesOpen }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    // Check if any required fields are empty
    if (
      !data.medName ||
      !data.startDate ||
      !data.dosage1 ||
      !data.dosage2 ||
      !data.dosage3 ||
      !data.days ||
      !data.time1 ||
      !data.time2 ||
      !data.time3
    ) {
      // Show error toast
      toast.error("Please fill in all fields.");
      return;
    }

    // Combine dosage parts into a single string with hyphens
    const dosage = `${data.dosage1}-${data.dosage2}-${data.dosage3}`;
    // Combine times into an array
    const times = [data.time1, data.time2, data.time3];
    const newMedication = {
      medName: data.medName,
      startDate: data.startDate,
      dosage,
      days: data.days,
      times,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/set-medication",
        newMedication
      );
      console.log(response.data);
      // Clear the form
      reset();
      // Show success toast
      toast.success("Medication saved successfully!");
    } catch (error) {
      console.log(error);
      // Show error toast
      toast.error("Failed to save medication. Please try again.");
    }
  };

  return (
    <div className="relative bg-green-100 h-[100%] p-4 rounded-lg shadow-lg w-full ">
      <img
        src={close}
        alt="close"
        onClick={() => setIsSetMedicinesOpen(false)}
        className="absolute top-3 right-3 w-5 h-5 cursor-pointer "
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center h-[14%] flex items-center justify-center">
        Medicine Tracker
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="medName"
              className="block text-sm font-medium text-gray-700"
            >
              Medicine Name
            </label>
            <input
              type="text"
              id="medName"
              {...register("medName")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              {...register("startDate")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="dosage1"
            className="block text-sm font-medium text-gray-700"
          >
            Dosage
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <input
              type="number"
              id="dosage1"
              {...register("dosage1")}
              placeholder="Part 1"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              id="dosage2"
              {...register("dosage2")}
              placeholder="Part 2"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="number"
              id="dosage3"
              {...register("dosage3")}
              placeholder="Part 3"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="days"
            className="block text-sm font-medium text-gray-700"
          >
            Days
          </label>
          <input
            type="text"
            id="days"
            {...register("days")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <div className="flex justify-around">
            <label
              htmlFor="time1"
              className="block text-sm font-medium text-gray-700"
            >
              Time 1
            </label>
            <label
              htmlFor="time2"
              className="block text-sm font-medium text-gray-700"
            >
              Time 2
            </label>
            <label
              htmlFor="time3"
              className="block text-sm font-medium text-gray-700"
            >
              Time 3
            </label>
          </div>

          <div className="flex space-x-2">
            <input
              type="time"
              id="time1"
              {...register("time1")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="time"
              id="time2"
              {...register("time2")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="time"
              id="time3"
              {...register("time3")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MedicineTracker;
