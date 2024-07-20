import React, { useState } from "react";
import axios from "axios";

function Alert() {
  const [disease, setDisease] = useState("");
  const [studentId, setStudentId] = useState(""); // Assume you get this from logged-in student data
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/send-alerts", {
        disease,
        studentId,
      });
      setResponse(res.data.message);
    } catch (error) {
      setResponse("Failed to send alerts");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 border border-gray-300 shadow-md">
      <h1 className="text-lg font-bold text-gray-800">
        Send Alert to All Students
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <br />
        <br />
        <label className="block mb-2 text-sm text-gray-700" htmlFor="disease">
          Disease Name
        </label>
        <input
          type="text"
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          placeholder="Enter disease name"
          required
          className="p-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded w-full mb-4"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Send Alert
        </button>
      </form>
      {response && <p className="text-gray-600 mt-4">{response}</p>}
    </div>
  );
}

export default Alert;
