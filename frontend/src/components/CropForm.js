import React, { useState } from "react";
import "./CropForm.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function CropForm() {
  const [formData, setFormData] = useState({
    crop_type: "",
    description: "",
    price_per_kg: "",
    contact_number: "",
    image: null,
  });

  const farmerName = localStorage.getItem("username");
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!farmerName) {
      alert("Farmer name not found. Please login first.");
      return;
    }

    for (let key in formData) {
      if (!formData[key]) {
        alert(`Please fill the ${key} field.`);
        return;
      }
    }

    const data = new FormData();
    data.append("farmer_name", farmerName);
    data.append("crop_type", formData.crop_type);
    data.append("description", formData.description);
    data.append("price_per_kg", parseFloat(formData.price_per_kg));
    data.append("contact_number", formData.contact_number);
    data.append("image", formData.image);

    fetch("http://127.0.0.1:8000/crops/", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        if (!res.ok) return res.json().then(err => { throw err });
        return res.json();
      })
      .then((result) => {
        alert("Crop submitted successfully!");
        setFormData({
          crop_type: "",
          description: "",
          price_per_kg: "",
          contact_number: "",
          image: null,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        if (error.detail) alert("Error: " + error.detail);
        else alert("Server error. Try again later.");
      });
  };

  return (
    <div>
      <Navbar/>
      <div className="crop-form-wrapper">
        <div className="crop-form-card">
          <h2 className="crop-form-heading">Submit Your Crop</h2>
          <form className="crop-form" onSubmit={handleSubmit}>
            <select name="crop_type" value={formData.crop_type} onChange={handleChange} required>
              <option value="">Select Crop Type</option>
              <option value="cereal">Cereal</option>
              <option value="fruit">Fruit</option>
              <option value="vegetable">Vegetable</option>
              <option value="pulse">Pulse</option>
              <option value="seed">Seed</option>
            </select>

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="price_per_kg"
              placeholder="Price per Kg"
              value={formData.price_per_kg}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="contact_number"
              placeholder="Contact Number"
              value={formData.contact_number}
              onChange={handleChange}
              required
            />

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />

            <button type="submit" className="crop-submit-btn">Submit Crop</button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
