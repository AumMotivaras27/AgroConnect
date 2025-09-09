import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import "./Signup.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobilenumber: "",
    password: "",
    role: "Farmer",
  });

  const [errors, setErrors] = useState({});
  const [showFarmerOptions, setShowFarmerOptions] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!formData.username.trim()) {
      formErrors.username = "Username is required";
      valid = false;
    } else if (formData.username.length < 3) {
      formErrors.username = "Username must be at least 3 characters";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      formErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Enter a valid email";
      valid = false;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.mobilenumber.trim()) {
      formErrors.mobilenumber = "Mobile number is required";
      valid = false;
    } else if (!mobileRegex.test(formData.mobilenumber)) {
      formErrors.mobilenumber = "Enter a valid 10-digit mobile number";
      valid = false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!formData.password.trim()) {
      formErrors.password = "Password is required";
      valid = false;
    } else if (!passwordRegex.test(formData.password)) {
      formErrors.password =
        "Password must be 6+ characters, include letters & numbers";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    fetch("http://127.0.0.1:8000/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) =>
        res.json().then((data) => ({ status: res.status, body: data }))
      )
      .then(({ status, body }) => {
        if (status !== 201 && status !== 200) {
          alert("Error: " + JSON.stringify(body));
          return;
        }

        localStorage.setItem("username", body.username || formData.username);
        localStorage.setItem("email", body.email || formData.email);
        localStorage.setItem("role", body.role || formData.role);

        alert("Signup successful!");

        if (body.role === "Farmer" || formData.role === "Farmer") {
          setShowFarmerOptions(true); // show buttons below form
        } else if (body.role === "Buyer" || formData.role === "Buyer") {
          navigate("/crops");
        } else if (body.role === "Admin" || formData.role === "Admin") {
          navigate("/admin-dashboard");
        }
      })
      .catch((err) => {
        console.error("Network error:", err);
        alert("Server error. Try again later.");
      });
  };

  return (
    <div>
      <Navbar />

      <div className="login-container">
        <div className="login-card">
          <h2 className="login-heading">Signup Form</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <span className="error">{errors.username}</span>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <input
              type="text"
              name="mobilenumber"
              placeholder="Mobile Number"
              value={formData.mobilenumber}
              onChange={handleChange}
            />
            {errors.mobilenumber && (
              <span className="error">{errors.mobilenumber}</span>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}

            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Farmer">Farmer</option>
              <option value="Buyer">Buyer</option>
            </select>

            <button type="submit" className="login-btn">
              Signup
            </button>
          </form>
          {showFarmerOptions && (
            <div className="farmer-options">
              <button onClick={() => navigate("/crops-form")}>Fill Crop Form</button>
              <button onClick={() => navigate("/")}>Go to Home</button>
            </div>
          )}
        </div>
      </div>
      
     <Footer/>
    </div>
  );
}
