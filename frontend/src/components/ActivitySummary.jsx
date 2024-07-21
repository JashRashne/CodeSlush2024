import React, { useState, useEffect } from "react";
import { easeIn, easeInOut, motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Assuming you get an object array in the form
const testArray = [
  {
    date: "07-07-2024",
    steps: 1234,
    workoutMins: 90,
    heartRate: 69,
  },
  {
    date: "08-07-2024",
    steps: 1234,
    workoutMins: 90,
    heartRate: 69,
  },
  {
    date: "09-07-2024",
    steps: 1234,
    workoutMins: 90,
    heartRate: 69,
  },
  {
    date: "10-07-2024",
    steps: 1234,
    workoutMins: 90,
    heartRate: 69,
  },
  {
    date: "11-07-2024",
    steps: 1234,
    workoutMins: 90,
    heartRate: 69,
  },
  {
    date: "12-07-2024",
    steps: 1234,
    workoutMins: 90,
    heartRate: 69,
  },
  {
    date: "13-07-2024",
    steps: 1234,
    workoutMins: 90,
    heartRate: 69,
  },
  {
    date: "14-07-2024",
    steps: 1234,
    workoutMins: 90,
    heartRate: 69,
  },
];

const stepsArray = testArray.map((obj) => obj.steps);
const heartRateArray = testArray.map((obj) => obj.heartRate);
const workoutMinsArray = testArray.map((obj) => obj.workoutMins);
const dateArray = testArray.map((obj) => obj.date);

const ActivitySummary = () => {
  const [selectedActivity, setSelectedActivity] = useState("steps");
  const [dataset, setDataset] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const changeActivity = (selectedOption) => {
    let newDataset = [];
    if (selectedOption === "steps") {
      newDataset = [
        {
          label: "Steps",
          data: stepsArray,
          fill: false,
          backgroundColor: "rgb(0, 0, 255)",
          borderColor: "rgb(0, 0, 255))",
        },
      ];
    } else if (selectedOption === "heartRate") {
      newDataset = [
        {
          label: "Heart Rate",
          data: heartRateArray,
          fill: false,
          backgroundColor: "rgb(0, 0, 255)",
          borderColor: "rgb(0, 0, 255))",
        },
      ];
    } else if (selectedOption === "workout") {
      newDataset = [
        {
          label: "Workout Minutes",
          data: workoutMinsArray,
          fill: false,
          backgroundColor: "rgb(0, 0, 255)",
          borderColor: "rgb(0, 0, 255)",
        },
      ];
    }
    setDataset(newDataset);
  };

  useEffect(() => {
    changeActivity(selectedActivity);
  }, [selectedActivity]);

  const data = {
    labels: dateArray,
    datasets: dataset,
    borderColor: "rgb(0, 0, 255)", // Set line color
    backgroundColor: "rgb(0, 0, 255)",
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  function sum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum = sum + array[i];
    }
    return sum;
  }
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDwVlyyOXFXTiUmy6kcxlfP8y8vfW5EBzc"
  );
  async function getSummary() {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt =
      "Give me summary of my activity data in exactly 100words telling how I did so well and also suggest me how to improve on my fitness in exactly 50 words. Hence , use a total of 150 words only: \n" +
      `Total steps: ${sum(stepsArray)} \n Average Workout Minutes per day: ${
        sum(workoutMinsArray) / workoutMinsArray.length
      } \n Average Heart Rate per day: ${
        sum(heartRateArray) / heartRateArray.length
      } \n do not use bullets. use plain text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    setText(response.text());
  }

  function handleCancel() {
    setIsModalOpen(false);
  }

  return (
    <div className="w-[100%] h-full flex">
      {/* <div className="h-full w-[100%] rounded-[1.8rem] flex flex-col p-2"> */}
      <div className="w-[80%] h-[100%] ">
        <Line data={data} options={options} />
      </div>
      <div className="w-[18%] px-2 h-full flex flex-col gap-[1rem] justify-center">
        <button
          className="w-[100%] px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800  "
          onClick={() => {
            setSelectedActivity("steps");
          }}
        >
          Steps
        </button>
        <button
          className="w-[100%] px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800  "
          onClick={() => {
            setSelectedActivity("workout");
          }}
        >
          Workout
        </button>
        <button
          className="w-[100%] px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800  "
          onClick={() => {
            setSelectedActivity("heartRate");
          }}
        >
          Heart Rate
        </button>
        <button
          className="w-[100%] px-3 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800  "
          onClick={() => {
            getSummary();
            setIsModalOpen(true);
          }}
        >
          Summary
        </button>
      </div>

      {/* <div className="h-full w-[30%] bg-red-200 flex flex-col">
        <div className="h-[10%] w-full bg-blue-200 flex items-center justify-center">
          Activity Log
        </div>
        <div className="w-full h-[90%] overflow-auto">
          {[...testArray].reverse().map((activityData) => {
            return (
              <div className="h-[30%] w-full bg-white flex p-3 flex-col">
                <div className="w-full h-[20%] bg-blue-200">
                  <span className="text-sm">{activityData.date}</span>
                </div>
                <div className="w-full h-[80%] bg-pink-200 flex">
                  <div className="h-full w-[38%] bg-purple-200 flex flex-col">
                    <div className="w-full h-[33.333%] flex items-center justify-end pr-1">
                      <i class="ri-walk-line text-xl"></i>
                    </div>
                    <div className="w-full h-[33.333%] flex items-center justify-end pr-1">
                      <i class="ri-heart-pulse-fill text-xl"></i>
                    </div>
                    <div className="w-full h-[33.333%] flex items-center justify-end pr-1">
                      <i class="ri-boxing-fill text-xl"></i>
                    </div>
                  </div>
                  <div className="h-full w-[62%]">
                    <div className="w-full h-[33.333%] flex items-center justify-start pl-1">
                      <span>{activityData.steps}</span>
                    </div>
                    <div className="w-full h-[33.333%] flex items-center justify-start pl-1">
                      <span>{activityData.heartRate}</span>
                    </div>
                    <div className="w-full h-[33.333%] flex items-center justify-start pl-1">
                      <span>{activityData.workoutMins}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}

      {isModalOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.01, ease: easeIn }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            // exit={{ opacity: 0, y: 0, scale: 0 }}
            transition={{ delay: 0.1, ease: easeInOut }}
            className="bg-white dark:bg-purple-200 p-6 rounded-[1.8rem] shadow-2xl h-[50vh] w-[50vw] relative"
          >
            <p>{text}</p>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 absolute bottom-4 right-4"
            >
              Cancel
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default ActivitySummary;
