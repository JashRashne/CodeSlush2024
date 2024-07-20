import React, { useState } from "react";
import axios from "axios";

const PatientInfo = () => {
  const [patientEmail, setPatientEmail] = useState("");
  const [patientFullName, setPatientFullName] = useState("");
  const [dateOfAdmission, setDateOfAdmission] = useState("");
  const [dateOfDischarge, setDateOfDischarge] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/share-patient-info",
        {
          patientEmail,
          dateOfAdmission,
          dateOfDischarge,
          reason,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error sharing patient info");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Share Patient Info</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="patient-email"
          >
            Patient Email:
          </label>
          <input
            type="email"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
            required
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="patient-full-name"
          >
            Patient Full Name:
          </label>
          <input
            type="text"
            value={patientFullName}
            onChange={(e) => setPatientFullName(e.target.value)}
            required
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="date-of-admission"
          >
            Date of Admission:
          </label>
          <input
            type="date"
            value={dateOfAdmission}
            onChange={(e) => setDateOfAdmission(e.target.value)}
            required
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="date-of-discharge"
          >
            Date of Discharge:
          </label>
          <input
            type="date"
            value={dateOfDischarge}
            onChange={(e) => setDateOfDischarge(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>
        <div className="mb-4">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="reason"
          >
            Reason for Admission:
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Share Info
        </button>
      </form>
      {message && <p className="text-gray-600">{message}</p>}
    </div>
  );
};

export default PatientInfo;
