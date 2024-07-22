import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import close from "../assets/close.png";
const MedicineTracker = ({ setIsSetMedicinesOpen }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-red-200 w-[100%] h-[100%]">
      <div className="w-[100%] ">
        <img
          src={close}
          alt="close"
          onClick={() => setIsSetMedicinesOpen((prev) => !prev)}
          className="w-[1.8rem] cursor-pointer float-right"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 items-center">
          <div>
            <label
              htmlFor="medName"
              className="block text-sm font-medium text-gray-700"
            >
              Med Name
            </label>
            <input
              type="text"
              id="medName"
              {...register("medName")}
              className="block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>{" "}
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
              className=" block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <label
          htmlFor="dosage1"
          className="block text-sm font-medium text-gray-700"
        >
          Dosage Part 1
        </label>
        <div className="grid grid-cols-3 items-center ">
          <div>
            <input
              type="number"
              id="dosage1"
              {...register("dosage1")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>{" "}
          <div>
            <input
              type="number"
              id="dosage2"
              {...register("dosage2")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>{" "}
          <div>
            <input
              type="number"
              id="dosage3"
              {...register("dosage3")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="time1"
            className="block text-sm font-medium text-gray-700"
          >
            Time 1
          </label>
          <input
            type="time"
            id="time1"
            {...register("time1")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="time2"
            className="block text-sm font-medium text-gray-700"
          >
            Time 2
          </label>
          <input
            type="time"
            id="time2"
            {...register("time2")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="time3"
            className="block text-sm font-medium text-gray-700"
          >
            Time 3
          </label>
          <input
            type="time"
            id="time3"
            {...register("time3")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicineTracker;
