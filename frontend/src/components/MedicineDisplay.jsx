import React, { useEffect, useState } from "react";
import axios from "axios";

const MedicineDisplay = () => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/due-medications"
        );
        setMedications(response.data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedications();
  }, []);

  return (
    <div className="justify-center h-[100%] flex flex-wrap gap-[0.4rem] w-[100%]">
      {medications.map((med, index) => (
        <div
          key={index}
          className="w-[90%] h-[50%] bg-amber-600 rounded-xl flex justify-between items-center px-2 text-white text-[01rem] font-medium "
        >
          <h1>{med.medName}</h1>
          <p>{med.dosage}</p>
        </div>
      ))}
    </div>
  );
};

export default MedicineDisplay;
