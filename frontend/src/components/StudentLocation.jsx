import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentDashboard = () => {
  const [email, setEmail] = useState("55.juhideore@gmail.com"); // Hardcoded email for testing
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const handleSendLocation = async () => {
    const location = {
      latitude: "37.7749",
      longitude: "111",
    }; // Example location
    try {
      console.log(email, location);
      const response = await axios.post(
        "http://localhost:8000/send-location-alert",
        {
          email,
          location,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setError("Error sending location");
    }
  };

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const handleError = (error) => {
      console.error("Error fetching location:", error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      <h1>Student Dashboard</h1>
      {error && <p>{error}</p>}
      {location ? (
        <>
          <p>
            Your current location: {location.latitude}, {location.longitude}
          </p>
          <button onClick={handleSendLocation}>Send Location</button>
        </>
      ) : (
        <p>Fetching your location...</p>
      )}
    </div>
  );
};

export default StudentDashboard;
