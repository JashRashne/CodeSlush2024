import React, { useState } from "react";
import axios from "axios";
import close from "../assets/close.png";

function Alert({ setIsIsoAlertOpen }) {
  const [disease, setDisease] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/send-alerts", {
        disease,
      });
      setResponse(res.data.message);
    } catch (error) {
      setResponse("Failed to send alerts");
    }
  };

  const handleClose = () => {
    setIsIsoAlertOpen(false);
  };

  return (
    <div className="relative w-[600px] min-h-[300px] p-8 shadow-lg rounded-lg bg-white border border-[#A2C579] flex flex-col">
      <div
        onClick={handleClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 w-7 h-7 cursor-pointer flex items-center justify-center"
      >
        <img src={close} alt="close" />
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center text-[#016A70]">
        Send Alert to All Students
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-6 flex-grow"
      >
        <label
          className="block text-2xl font-medium text-[#016A70]"
          htmlFor="disease"
        >
          Disease Name
        </label>
        <input
          type="text"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          placeholder="Enter disease name"
          required
          className="p-3 w-full border rounded-2xl text-[#016A70] border-[#A2C579] bg-[#FFFFDD]"
        />
        <button
          type="submit"
          className="w-full py-3 px-5 rounded-md bg-[#D2DE32] text-[#016A70] font-semibold hover:bg-[#A2C579] transition duration-300 text-xl"
        >
          Send Alert
        </button>
      </form>
      {response && (
        <p className="mt-6 text-center text-[#016A70]">{response}</p>
      )}
    </div>
  );
}

export default Alert;
