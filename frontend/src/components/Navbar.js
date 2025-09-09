import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const css = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
      .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: linear-gradient(90deg, #2e7d32, #1b5e20);
        padding: 16px 28px;
        position: sticky;
        top: 0;
        z-index: 1000;
        font-family: 'Poppins', Arial, sans-serif;
        box-shadow: 0 4px 14px rgba(0,0,0,0.25);
      }
      .navbar-logo a {
        color: white;
        text-decoration: none;
        font-size: 1.9rem;
        font-weight: 700;
      }
      .navbar-links {
        list-style: none;
        display: flex;
        gap: 28px;
        margin: 0;
        padding: 0;
      }
      .navbar-links li a, .navbar-links li span {
        color: white;
        text-decoration: none;
        font-size: 1.4rem;
        font-weight: 500;
        cursor: pointer;
      }
      .navbar-links li a:hover {
        color: #c8e6c9;
      }
      .navbar-username {
        color: #e8f5e9;
        font-weight: 600;
        font-size: 1.4rem;
      }
      .navbar-logout {
        color: #fff;
        font-weight: 500;
        font-size: 1.1rem;
        cursor: pointer;
      }
      .navbar-logout:hover {
        color: #ffebee;
      }
    `;
    const style = document.createElement("style");
    style.setAttribute("data-navbar", "injected");
    style.textContent = css;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);

    const onStorage = () => setUsername(localStorage.getItem("username"));
    window.addEventListener("storage", onStorage);
    window.addEventListener("auth-change", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("auth-change", onStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Agro Connect 🌱</Link>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tips">Helps & Tips</Link></li>
        <li><Link to="/crops">Crops</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/crop-recommendation">Crop Recommendation</Link></li>

        {username ? (
          <>
            <li className="navbar-username">👤 {username}</li>
            <li><span className="navbar-logout" onClick={handleLogout}>Logout</span></li>
          </>
        ) : (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
