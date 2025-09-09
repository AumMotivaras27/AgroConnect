import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CropsPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function CropsPage() {
  const [crops, setCrops] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 search
  const [filterType, setFilterType] = useState("all"); // 🔎 filter type
  const [priceRange, setPriceRange] = useState([0, 1000]); // 💰 filter price

  const navigate = useNavigate();
  const buyer_username = localStorage.getItem("username");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/crops/")
      .then((res) => res.json())
      .then((data) => setCrops(data))
      .catch((err) => console.error("Error fetching crops:", err));
  }, []);

  const increaseQty = (cropId) => {
    setQuantities((prev) => ({
      ...prev,
      [cropId]: (prev[cropId] || 0) + 1,
    }));
  };

  const decreaseQty = (cropId) => {
    setQuantities((prev) => ({
      ...prev,
      [cropId]: Math.max(0, (prev[cropId] || 1) - 1),
    }));
  };

  const buyNow = (crop) => {
    if (!buyer_username) {
      alert("⚠ Please login as Buyer first.");
      return;
    }
    if (userRole !== "Buyer") {
      alert("❌ Only Buyers can buy products!");
      return;
    }

    const qty = quantities[crop.cropid] || 1;
    const order = {
      crop: crop.crop_type,
      quantity: qty,
      price: crop.price_per_kg,
    };
    localStorage.setItem("order", JSON.stringify(order));
    navigate("/payment");
  };

  // 🔎 filtering logic
  const filteredCrops = crops.filter((crop) => {
    const matchesSearch =
      crop.crop_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.price_per_kg.toString().includes(searchQuery);

    const matchesFilter =
      filterType === "all"
        ? true
        : filterType === "description"
        ? crop.description.toLowerCase().includes(searchQuery.toLowerCase())
        : filterType === "price"
        ? crop.price_per_kg >= priceRange[0] &&
          crop.price_per_kg <= priceRange[1]
        : true;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <Navbar />
      <div className="crops-page-container">
        <h2>Available Crops</h2>

        {/* 🔍 Search + Filter */}
        <div className="filters-container">
          <input
            type="text"
            placeholder="Search crops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All</option>
            <option value="description">Filter by Description</option>
            <option value="price">Filter by Price</option>
          </select>

          {filterType === "price" && (
            <div className="price-filter">
              <label>Min ₹</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number(e.target.value), priceRange[1]])
                }
              />
              <label>Max ₹</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
              />
            </div>
          )}
        </div>

        {/* Crops Grid */}
        <div className="crops-grid">
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <div key={crop.cropid} className="crop-card">
                <img
                  src={crop.image || "http://127.0.0.1:8000/media/crops/7.jpg"}
                  alt={crop.crop_type}
                />
                <h3>{crop.crop_type}</h3>
                <p>Price: ₹{crop.price_per_kg} per kg</p>
                <p>{crop.description}</p>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(crop.cropid)}>-</button>
                  <span>{quantities[crop.cropid] || 0}</span>
                  <button onClick={() => increaseQty(crop.cropid)}>+</button>
                </div>

                <button onClick={() => buyNow(crop)} className="buy-btn">
                  Buy Now
                </button>
              </div>
            ))
          ) : (
            <p>No crops found matching your search/filter.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
