import React, { useState } from "react";
import Consultation from "./Consultation";
import axios from "axios";
import close from "../assets/close.png";

const HelpAsk = ({ setIsStressSOSOpen }) => {
  const [responses, setResponses] = useState({
    feeling: "",
    stressLevel: "",
    support: {
      friends: false,
      family: false,
      others: false,
    },
    hobbies: "",
  });

  const [showConsultation, setShowConsultation] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setResponses((prevResponses) => ({
        ...prevResponses,
        support: {
          ...prevResponses.support,
          [name]: checked,
        },
      }));
    } else {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("User responses:", responses);

    await axios
      .post("http://localhost:8000/help-form", responses)
      .then((response) => {
        console.log(response.data);
        setShowConsultation(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (showConsultation) {
    return <Consultation />;
  }

  return (
    <div className="w-[98%] h-[98%] p-6 bg-white rounded-xl shadow-lg border border-[#016A70]">
      <h2 className="text-4xl font-bold mb-6 text-[#016A70] text-center">
        Mental Wellbeing Check
      </h2>
      <div
        onClick={() => {
          setIsStressSOSOpen(false);
        }}
        className="absolute top-10 right-10 text-gray-500 hover:text-gray-700 text-3xl w-7 h-7 cursor-pointer flex items-center justify-center"
      >
        <img src={close} alt="close" />
      </div>{" "}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg font-semibold text-[#016A70] mb-2">
            How are you feeling today?
          </label>
          <textarea
            name="feeling"
            value={responses.feeling}
            onChange={handleChange}
            rows="3"
            className="block w-full p-3 border border-[#016A70] rounded-lg shadow-sm focus:ring-[#D2DE32] focus:border-[#D2DE32] bg-white transition-all duration-300 resize-none"
          />
        </div>
        <div>
          <span className="block text-lg font-semibold text-[#016A70] mb-2">
            Are you experiencing any stress or anxiety?
          </span>
          <div className="flex space-x-4">
            {["low", "medium", "high"].map((level) => (
              <label key={level} className="flex items-center text-[#016A70]">
                <input
                  type="radio"
                  id={`stress${level.charAt(0).toUpperCase() + level.slice(1)}`}
                  name="stressLevel"
                  value={level}
                  checked={responses.stressLevel === level}
                  onChange={handleChange}
                  className="mr-2"
                />
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div>
          <span className="block text-lg font-semibold text-[#016A70] mb-2">
            Do you feel you have enough support from:
          </span>
          <div className="flex flex-wrap space-x-4">
            {["friends", "family", "others"].map((supportType) => (
              <label
                key={supportType}
                className="flex items-center text-[#016A70]"
              >
                <input
                  type="checkbox"
                  id={`support${
                    supportType.charAt(0).toUpperCase() + supportType.slice(1)
                  }`}
                  name={supportType}
                  checked={responses.support[supportType]}
                  onChange={handleChange}
                  className="mr-2"
                />
                {supportType.charAt(0).toUpperCase() + supportType.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-lg font-semibold text-[#016A70] mb-2">
            What activities or hobbies help you relax and unwind?
          </label>
          <textarea
            name="hobbies"
            value={responses.hobbies}
            onChange={handleChange}
            rows="3"
            className="block w-full p-3 border border-[#016A70] rounded-lg shadow-sm focus:ring-[#D2DE32] focus:border-[#D2DE32] bg-white transition-all duration-300 resize-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#016A70] text-white font-bold rounded-lg shadow-md hover:bg-[#D2DE32] focus:outline-none focus:ring-2 focus:ring-[#016A70] focus:ring-opacity-75 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default HelpAsk;
