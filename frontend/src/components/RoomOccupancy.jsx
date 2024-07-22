import React, { useState, useEffect } from "react";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import close from "../assets/close.png";

// Register Chart.js components
Chart.register(BarElement, CategoryScale, LinearScale);

const RoomOccupancy = ({ setIsRoomOccupancyOpen }) => {
  const [count, setCount] = useState(0);
  const [libCount, setLibCount] = useState(0);

  const fetchCount = async () => {
    try {
      const request = await axios.get("http://localhost:8000/get-occupancy");
      const response = request.data;
      console.log(response[0].roomCount);
      // Example: Update library count here if response includes roomCount
      setLibCount(response[0].roomCount);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchCount();
    const intervalId = setInterval(() => {
      fetchCount();
    }, 5000); // Adjust interval time as needed (e.g., 5000ms for 5 seconds)
    return () => clearInterval(intervalId);
  }, []);

  const [chartLabel, setChartLabel] = useState("");

  const handleLibClick = () => {
    setChartLabel("LIBRARY");
    setMaxCount(20);
  };

  const handleSLClick = () => {
    setChartLabel("STUDENT LOUNGE");
    setCount(101);
    setMaxCount(120);
  };

  const handleRRClick = () => {
    setChartLabel("READING ROOM");
    setCount(35);
    setMaxCount(60);
  };

  const [maxCount, setMaxCount] = useState(20);

  const chartData = {
    labels: [chartLabel],
    datasets: [
      {
        label: "Count",
        data: chartLabel === "LIBRARY" ? [libCount] : [count],
        backgroundColor: "#94a7e0",
        hoverBackgroundColor: "#738fe6",
        borderColor: "rgb(11, 38, 82)",
        borderWidth: 1,
        barThickness: 200,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "x",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      y: {
        suggestedMax: maxCount,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <div
        onClick={() => setIsRoomOccupancyOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl w-7 h-7 cursor-pointer flex items-center justify-center"
      >
        <img src={close} className="float-right w-" />
      </div>
      <div className="w-[100%] h-[100%] flex">
        <div className="w-[30%]   px-2 h-full flex flex-col gap-[4rem] justify-center">
          <button
            className="w-[100%] h-[10%] py-2 text-sm font-medium text-center text-white bg-[#1f3255] rounded-lg hover:bg-blue-900  "
            onClick={handleLibClick}
          >
            Library
          </button>{" "}
          <button
            className="w-[100%] h-[10%]  py-2 text-sm font-medium text-center text-white bg-[#1f3255] rounded-lg hover:bg-blue-900  "
            onClick={handleRRClick}
          >
            Reading Room
          </button>{" "}
          <button
            className="w-[100%] h-[10%]  py-2 text-sm font-medium text-center text-white bg-[#1f3255] rounded-lg hover:bg-blue-900  "
            onClick={handleSLClick}
          >
            Students's Lounge
          </button>
        </div>
        {/* <div className="h-[100%] w-[20%] flex flex-col ">
        <div
          className="w-[100%] h-[25%] hover:bg-gray-50 hover:cursor-pointer flex"
          onClick={handleRRClick}
        >
          Reading Room
        </div>

        <div
          className="w-[100%] h-[25%] hover:bg-gray-50 hover:cursor-pointer flex"
          onClick={handleSLClick}
        >
          Students' Lounge
        </div>
      </div> */}
        <div className="w-[75%] px-[5%] py-[2%] flex items-center justify-center">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </>
  );
};

export default RoomOccupancy;
