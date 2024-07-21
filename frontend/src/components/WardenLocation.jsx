import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WardenDashboard = () => {
  const [email, setEmail] = useState("55.juhideore@gmail.com"); // Hardcoded email
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/students/${email}/mobile`
      );
      setMobileNumber(data.mobNo);

      const locationRes = await axios.get(
        `http://localhost:8000/api/v1/students/${email}/location`
      );
      setLocation(locationRes.data);
    } catch (err) {
      setError("Error fetching student data");
      setMobileNumber("");
      setLocation(null);
    }
  };

  const handleSendLocationAlert = async () => {
    try {
      const location = { latitude: 37.7749, longitude: -122.4194 }; // Example location
      const res = await axios.post("/api/v1/send-location-alert", {
        email,
        location,
      });
      console.log(res.data);
    } catch (error) {
      setError("Error sending location alert");
    }
  };

  return (
    <div>
      <h1>Warden Dashboard</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter student email"
      />
      <button onClick={handleFetch}>Fetch Student Data</button>
      <button onClick={handleSendLocationAlert}>Send Location Alert</button>
      {error && <p>{error}</p>}
      {mobileNumber && <p>Mobile Number: {mobileNumber}</p>}
      {location ? (
        <MapContainer
          center={[location.latitude, location.longitude]}
          zoom={13}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[location.latitude, location.longitude]}>
            <Popup>
              Student's Location: {location.latitude}, {location.longitude}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>No location data available</p>
      )}
    </div>
  );
};

export default WardenDashboard;
