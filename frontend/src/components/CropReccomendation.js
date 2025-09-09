import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CropReccomendation.css";
import Navbar from "./Navbar";

export default function CropRecommendation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  const [result, setResult] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    console.log("Found username in storage:", username);

    if (!username) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/login");
      return;
    }

    try {
      const payload = { ...formData, username };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/crop/recommend/",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Crop API response:", response.data);
      setResult(response.data.recommended_crop);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      setResult("⚠️ Something went wrong. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <>
      <Navbar />
      <div className="crop-container">
        <h2>Crop Recommendation System</h2>
        {/* ⚡ method="post" added, but preventDefault ensures only axios runs */}
        <form onSubmit={handleSubmit} method="post">
          <input type="number" name="N" placeholder="Nitrogen (N)" onChange={handleChange} required />
          <input type="number" name="P" placeholder="Phosphorus (P)" onChange={handleChange} required />
          <input type="number" name="K" placeholder="Potassium (K)" onChange={handleChange} required />
          <input type="number" name="temperature" placeholder="Temperature (°C)" onChange={handleChange} required />
          <input type="number" name="humidity" placeholder="Humidity (%)" onChange={handleChange} required />
          <input type="number" step="0.1" name="ph" placeholder="Soil pH" onChange={handleChange} required />
          <input type="number" name="rainfall" placeholder="Rainfall (mm)" onChange={handleChange} required />
          <button type="submit">Recommend Crop</button>
        </form>

        {result && <h3>🌱 Recommended Crop: {result}</h3>}
      </div>
    </>
  );
}
