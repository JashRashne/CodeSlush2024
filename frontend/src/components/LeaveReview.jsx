import axios from "axios";
import React, { useEffect, useState } from "react";

const LeaveReview = () => {
  const [leaves, setLeaves] = useState([]);
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:8000/fetch-leaves");
        console.log(response.data);
        setLeaves(response.data); // Access the data property
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };

    fetchLeaves();
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      <h1>Leave Review</h1>
      {leaves.map((leave, index) => (
        <div key={index}>
          <h1>{leave.reason}</h1>
          <h1>{leave.student.fullName}</h1>
        </div>
      ))}
    </>
  );
};

export default LeaveReview;
