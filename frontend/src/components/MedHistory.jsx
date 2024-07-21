import React, { useEffect, useState } from "react";
import axios from "axios";
const MedHistory = () => {
  const [medHist, setMedHist] = useState([]);
  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await axios.get("http://localhost:8000/get-medHist");
        setMedHist(response.data);
      } catch (error) {
        console.error("Error fetching medications:", error);
      }
    };

    fetchMedicalHistory();
    console.log(medHist);
  }, []);

  return (
    <div className=" justify-center h-[100%] flex flex-wrap gap-[0.4rem] w-[100%]">
      {medHist.map((hist, index) => (
        <div
          key={index}
          className="w-[90%] text-white text-lg  h-[2.5rem] rounded-xl flex justify-between px-2 items-center "
        >
          <div>{hist.reason}</div>
          <div>
            {new Date(hist.dateOfAdmission).toLocaleString().split(",")[0]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedHistory;
