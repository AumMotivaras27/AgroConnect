import React, { useState, useEffect } from "react";
import "./NewsPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [category, setCategory] = useState("All");
  
  useEffect(() => {
    const allNews = [
      {
        id: 101,
        title: "Big Push for Green Revolution 2.0",
        description: "India announces mega reforms for sustainable agriculture.",
        fullText:
          "In a landmark announcement, the government introduced Green Revolution 2.0 focusing on eco-friendly practices, renewable energy in farming, and modern irrigation methods. This initiative will transform the agricultural sector in the coming decade.",
        date: "2025-08-16",
        category: "Government",
        image: "https://seepositive.in/wp-content/uploads/2023/09/artic_21815_30011432.jpg",
      },
      {
        id: 1,
        title: "Government launches new crop insurance scheme",
        description: "Farmers to benefit from subsidies and easier claim process.",
        fullText:
          "The government has launched a new crop insurance scheme that aims to support farmers during unpredictable climate changes. The scheme includes simplified claim processes, improved accessibility, and subsidized premium rates.",
        date: "2025-08-15",
        category: "Government",
        image: "https://www.ethika.co.in/wp-content/themes/ultrabootstrap-child/assets/crop-insurance/premium.webp",
      },
      {
        id: 2,
        title: "AI technology helping farmers predict weather patterns",
        description: "Machine learning improves yield forecasting.",
        fullText:
          "Artificial Intelligence (AI) is being integrated into agriculture to help farmers predict weather patterns and optimize crop yields. By analyzing historical climate data, soil conditions, and rainfall predictions, AI tools guide farmers to make better decisions.",
        date: "2025-08-14",
        category: "Technology",
        image: "https://tse1.mm.bing.net/th/id/OIP.N86TYcxim1Y3qFqZ2L3YXgHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        id: 3,
        title: "Monsoon rains improve crop prospects",
        description: "This year’s rainfall exceeds expectations.",
        fullText:
          "The Indian Meteorological Department has reported above-average monsoon rains, bringing relief to farmers in major crop-producing states. Experts believe this will boost rice, maize, and soybean production.",
        date: "2025-08-10",
        category: "Weather",
        image: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/04/16/672622-monsoon-farming.jpg",
      },
      {
        id: 4,
        title: "Organic farming gaining popularity",
        description: "Demand for chemical-free produce rises.",
        fullText:
          "More farmers are switching to organic farming as consumers increasingly prefer healthier, chemical-free foods. Government subsidies and awareness campaigns are fueling this trend.",
        date: "2025-08-08",
        category: "Crops",
        image: "https://tse3.mm.bing.net/th/id/OIP._NLtW1a1w3J8xoAmKgcv9QHaEO?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
      {
        id: 5,
        title: "Drone technology boosts crop monitoring",
        description: "Precision farming made easier with drones.",
        fullText:
          "Drones are being widely used for spraying fertilizers, pesticides, and monitoring crop health. This technology reduces costs and increases efficiency for farmers.",
        date: "2025-08-05",
        category: "Technology",
        image: "https://wp.technologyreview.com/wp-content/uploads/2016/07/fotolia88050102subscriptionmonthlym-7.jpg",
      },
      {
        id: 6,
        title: "Wheat export restrictions lifted",
        description: "New opportunities for farmers and traders.",
        fullText:
          "The government has lifted restrictions on wheat exports, allowing farmers to sell surplus produce globally. This is expected to benefit farmers financially.",
        date: "2025-08-03",
        category: "Government",
        image: "https://tse2.mm.bing.net/th/id/OIP.3PUgPRCPrDsF2gjQvvXwsQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
    ];


    setFeatured(allNews[0]);

    setNews(allNews.slice(1));
  }, []);

  const filteredNews = news.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <Navbar/>
      <div className="news-container">
        <h1>Agriculture News & Updates</h1>


        {featured && (
          <div className="featured-banner">
            <img src={featured.image} alt={featured.title} />
            <div className="featured-text">
              <h2>{featured.title}</h2>
              <p>{featured.description}</p>
              <button
                className="read-more"
                onClick={() => setSelectedArticle(featured)}
              >
                Read More
              </button>
            </div>
          </div>
        )}


        <div className="filter-section">
          <input
            type="text"
            placeholder="Search news..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="category-filters">
            {["All", "Government", "Technology", "Weather", "Crops"].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>


        <div className="news-grid">
          {filteredNews.map((article) => (
            <div key={article.id} className="news-card">
              <img src={article.image} alt={article.title} />
              <div className="news-content">
                <span className="news-date">{article.date}</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <button
                  className="read-more"
                  onClick={() => setSelectedArticle(article)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>


        {selectedArticle && (
          <div className="modal-overlay" onClick={() => setSelectedArticle(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button
                className="close-btn"
                onClick={() => setSelectedArticle(null)}
              >
                ✖
              </button>
              <img src={selectedArticle.image} alt={selectedArticle.title} />
              <h2>{selectedArticle.title}</h2>
              <span className="news-date">{selectedArticle.date}</span>
              <p>{selectedArticle.fullText}</p>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default NewsPage;
