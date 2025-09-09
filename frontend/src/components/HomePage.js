import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const articlesData = [
  {
    id: 1,
    title: "Organic Farming: Benefits & Techniques",
    img: "https://healthiersteps.com/wp-content/uploads/2022/02/organic-farming-benefits.jpg",
    summary: "Discover how organic farming can improve soil health and yield nutritious crops.",
    content: `Organic farming promotes biodiversity, improves soil health, and avoids synthetic chemicals. Techniques include crop rotation, composting, and integrated pest management.`,
    author: "Jay.",
    date: "March 1, 2025",
    tips: ["Use natural fertilizers", "Rotate crops regularly", "Avoid synthetic pesticides"],
  },
  {
    id: 2,
    title: "Effective Irrigation Tips for Small Farms",
    img: "https://fthmb.tqn.com/1nUtqBYAVnI1ITnApV4wnPBwQok=/2032x1478/filters:fill(auto,1)/GettyImages-179420216-572a78a55f9b58c34c7ca7de.jpg",
    summary: "Learn cost-effective irrigation strategies to maximize water efficiency.",
    content: `Proper irrigation planning increases yields while conserving water. Methods like drip irrigation, rainwater harvesting, and scheduling irrigation during cooler parts of the day are effective for small farms.`,
    author: "Meet.",
    date: "March 5, 2025",
    tips: ["Install drip systems", "Collect rainwater", "Irrigate early morning or evening"],
  },
  {
    id: 3,
    title: "Crop Rotation & Soil Fertility",
    img: "https://ik.imagekit.io/tractorkarvan/tr:f-webp/images/Blogs/Crop/Crop-Rotation-Blog__1_.jpg",
    summary: "Understand the benefits of crop rotation in maintaining soil fertility and reducing pests.",
    content: `Crop rotation maintains soil nutrients, prevents disease buildup, and controls weeds.`,
    author: "Om.",
    date: "March 10, 2025",
    tips: ["Alternate legume and cereal crops", "Monitor soil nutrients", "Plan rotations annually"],
  }
];

const HomePage = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();
  
  return (
      <>
      <Navbar/>
      <div>
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Agro Connect 🌱</h1>
            <p>Your trusted source for farming guidance, news, and crop care.</p>
            <button className="cta-btn" onClick={() => navigate("/crops")}>Explore Crops</button>
          </div>
        </section>

        <section className="features">
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6" alt="Crops" />
            <h3>Crops</h3>
            <p>Learn about different crops, planting seasons, and best practices.</p>
            <button className="feature-btn" onClick={() => navigate("/crops")}>View Crops</button>
          </div>
          <div className="feature-card">
            <img src="https://tse3.mm.bing.net/th/id/OIP.mf-0h1VJQzDlsYCZu-ll0gHaE8?w=1000&h=667&rs=1&pid=ImgDetMain&o=7&rm=3" alt="News" />
            <h3>News</h3>
            <p>Stay updated with the latest agricultural developments worldwide.</p>
            <button className="feature-btn" onClick={() => navigate("/news")}>View News</button>
          </div>
          <div className="feature-card">
            <img src="https://images.unsplash.com/photo-1517256064527-09c73fc73e38" alt="Help & Tips" />
            <h3>Help & Tips</h3>
            <p>Explore helpful farming techniques, tips, and best practices.</p>
            <button className="feature-btn" onClick={() => navigate("/help-tips")}>View Tips</button>
          </div>
        </section>

        <section className="articles">
          <h2>Latest Articles 📖</h2>
          <div className="article-list">
            {articlesData.map(article => (
              <div key={article.id} className="article-card" onClick={() => setSelectedArticle(article)}>
                <img src={article.img} alt={article.title} />
                <h4>{article.title}</h4>
                <p>{article.summary}</p>
              </div>
            ))}
          </div>
        </section>

        {selectedArticle && (
          <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <span className="modal-close" onClick={() => setSelectedArticle(null)}>&times;</span>
              <h2>{selectedArticle.title}</h2>
              <img src={selectedArticle.img} alt={selectedArticle.title} />
              <p className="modal-author-date"><strong>Author:</strong> {selectedArticle.author} | <strong>Date:</strong> {selectedArticle.date}</p>
              <p className="modal-description">{selectedArticle.content}</p>
              <h4>Tips:</h4>
              <ul>
                {selectedArticle.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          </div>
        )}

        <section className="events">
          <h2>Upcoming Events 🌾</h2>
          <ul>
            <li>Farmers’ Expo 2025 – March 15th, Delhi</li>
            <li>Organic Agriculture Workshop – April 5th, Bangalore</li>
            <li>AgriTech Innovations Conference – May 10th, Hyderabad</li>
          </ul>
        </section>
      </div>
      <Footer/>
    </>
  
  );
};

export default HomePage;
