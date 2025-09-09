// import React, { useState } from "react";
// import "./HelpTipsPage.css";

// const farmingTips = [
//   "Rotate crops regularly to maintain soil fertility.",
//   "Use organic compost to enrich the soil naturally.",
//   "Keep tools and equipment clean to prevent diseases.",
//   "Practice intercropping for better yield.",
//   "Maintain proper spacing between plants.",
//   "Use cover crops to prevent soil erosion.",
//   "Monitor pest activity regularly.",
//   "Harvest crops at the right time for quality.",
//   "Use mulching to retain soil moisture.",
//   "Plan crop cycles seasonally for optimal growth."
// ];

// const irrigationTips = [
//   "Use drip irrigation for water efficiency.",
//   "Collect and store rainwater for dry seasons.",
//   "Irrigate early in the morning or late evening to reduce evaporation.",
//   "Check soil moisture before watering.",
//   "Use mulching to retain soil moisture.",
//   "Avoid overwatering to prevent root rot.",
//   "Ensure proper drainage in fields.",
//   "Use water sensors to optimize irrigation.",
//   "Repair leaks in irrigation channels promptly.",
//   "Schedule irrigation according to crop needs."
// ];

// const fertilizerTips = [
//   "Test soil before applying fertilizers.",
//   "Use nitrogen-rich fertilizers for leafy crops.",
//   "Apply phosphorus for root development.",
//   "Add potassium for fruiting and flowering crops.",
//   "Avoid over-fertilizing to prevent soil degradation.",
//   "Use organic manure whenever possible.",
//   "Follow recommended doses based on crop type.",
//   "Split fertilizer application for efficiency.",
//   "Store fertilizers in a dry place to maintain quality.",
//   "Combine organic and inorganic fertilizers wisely."
// ];

// const faqs = [
//   { q: "What is the best time to plant crops?", a: "It depends on the crop and local climate. Generally, plant in early season for optimal growth." },
//   { q: "How often should I irrigate my crops?", a: "It depends on soil type, crop, and weather. Always check soil moisture before watering." },
//   { q: "Can I use chemical fertilizers with organic farming?", a: "Organic farming avoids synthetic chemicals, so stick to natural fertilizers." },
//   { q: "How to prevent pest attacks?", a: "Use integrated pest management: crop rotation, companion planting, and natural predators." },
//   { q: "Is mulching necessary?", a: "Yes, it helps retain soil moisture and controls weeds." },
//   { q: "How to improve soil fertility naturally?", a: "Use compost, green manure, and crop rotation to enhance nutrients." },
//   { q: "When to harvest crops?", a: "Harvest when crops reach maturity, usually indicated by color, texture, and size." },
//   { q: "Can I grow multiple crops together?", a: "Yes, intercropping is beneficial if crops don’t compete for nutrients." },
//   { q: "How to store harvested crops?", a: "Keep them in dry, cool, and ventilated storage to prevent spoilage." },
//   { q: "What are the common irrigation mistakes?", a: "Overwatering, watering at wrong times, and ignoring soil type are common mistakes." }
// ];

// // Accordion Section for tips
// const AccordionSection = ({ title, items, isOpen, onClick }) => {
//   return (
//     <div className="accordion-section">
//       <div className="accordion-title" onClick={onClick}>
//         <h3>{title}</h3>
//         <span>{isOpen ? "−" : "+"}</span>
//       </div>
//       {isOpen && (
//         <div className="accordion-content">
//           <ul>
//             {items.map((item, index) => (
//               <li key={index}>{item}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// // FAQ Section with single-open functionality
// const FAQSection = ({ faqs, openIndex, setOpenIndex }) => {
//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="faq-section">
//       <h2>❓ Frequently Asked Questions</h2>
//       {faqs.map((faq, index) => (
//         <div key={index} className="faq-item">
//           <div className="faq-question" onClick={() => toggleFAQ(index)}>
//             {faq.q}
//             <span>{openIndex === index ? "−" : "+"}</span>
//           </div>
//           {openIndex === index && (
//             <div className="faq-answer">
//               {faq.a}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// const HelpTipsPage = () => {
//   const [openAccordion, setOpenAccordion] = useState(null);
//   const [openFAQ, setOpenFAQ] = useState(null);

//   return (
//     <div className="help-tips-page">
//       <section className="help-hero">
//         <h1>🌾 Help & Tips for Farmers</h1>
//         <p>Quick farming advice, irrigation guidance, soil tips, and FAQs to boost your agricultural skills.</p>
//       </section>

//       <section className="tips-section">
//         <AccordionSection
//           title="💡 Quick Farming Tips"
//           items={farmingTips}
//           isOpen={openAccordion === "farming"}
//           onClick={() => setOpenAccordion(openAccordion === "farming" ? null : "farming")}
//         />
//         <AccordionSection
//           title="💧 Irrigation Advice"
//           items={irrigationTips}
//           isOpen={openAccordion === "irrigation"}
//           onClick={() => setOpenAccordion(openAccordion === "irrigation" ? null : "irrigation")}
//         />
//         <AccordionSection
//           title="🌱 Fertilizer & Soil Tips"
//           items={fertilizerTips}
//           isOpen={openAccordion === "fertilizer"}
//           onClick={() => setOpenAccordion(openAccordion === "fertilizer" ? null : "fertilizer")}
//         />

//         <FAQSection faqs={faqs} openIndex={openFAQ} setOpenIndex={setOpenFAQ} />
//       </section>
//     </div>
//   );
// };

// export default HelpTipsPage;



import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./HelpTipsPage.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const farmingTips = [
  "Rotate crops regularly to maintain soil fertility.",
  "Use organic compost to enrich the soil naturally.",
  "Keep tools and equipment clean to prevent diseases.",
  "Practice intercropping for better yield.",
  "Maintain proper spacing between plants.",
  "Use cover crops to prevent soil erosion.",
  "Monitor pest activity regularly.",
  "Harvest crops at the right time for quality.",
  "Use mulching to retain soil moisture.",
  "Plan crop cycles seasonally for optimal growth."
];

const irrigationTips = [
  "Use drip irrigation for water efficiency.",
  "Collect and store rainwater for dry seasons.",
  "Irrigate early in the morning or late evening to reduce evaporation.",
  "Check soil moisture before watering.",
  "Use mulching to retain soil moisture.",
  "Avoid overwatering to prevent root rot.",
  "Ensure proper drainage in fields.",
  "Use water sensors to optimize irrigation.",
  "Repair leaks in irrigation channels promptly.",
  "Schedule irrigation according to crop needs."
];

const fertilizerTips = [
  "Test soil before applying fertilizers.",
  "Use nitrogen-rich fertilizers for leafy crops.",
  "Apply phosphorus for root development.",
  "Add potassium for fruiting and flowering crops.",
  "Avoid over-fertilizing to prevent soil degradation.",
  "Use organic manure whenever possible.",
  "Follow recommended doses based on crop type.",
  "Split fertilizer application for efficiency.",
  "Store fertilizers in a dry place to maintain quality.",
  "Combine organic and inorganic fertilizers wisely."
];

const faqs = [
  { q: "What is the best time to plant crops?", a: "It depends on the crop and local climate. Generally, plant in early season for optimal growth." },
  { q: "How often should I irrigate my crops?", a: "It depends on soil type, crop, and weather. Always check soil moisture before watering." },
  { q: "Can I use chemical fertilizers with organic farming?", a: "Organic farming avoids synthetic chemicals, so stick to natural fertilizers." },
  { q: "How to prevent pest attacks?", a: "Use integrated pest management: crop rotation, companion planting, and natural predators." },
  { q: "Is mulching necessary?", a: "Yes, it helps retain soil moisture and controls weeds." },
  { q: "How to improve soil fertility naturally?", a: "Use compost, green manure, and crop rotation to enhance nutrients." },
  { q: "When to harvest crops?", a: "Harvest when crops reach maturity, usually indicated by color, texture, and size." },
  { q: "Can I grow multiple crops together?", a: "Yes, intercropping is beneficial if crops don’t compete for nutrients." },
  { q: "How to store harvested crops?", a: "Keep them in dry, cool, and ventilated storage to prevent spoilage." },
  { q: "What are the common irrigation mistakes?", a: "Overwatering, watering at wrong times, and ignoring soil type are common mistakes." }
];


const AccordionSection = ({ title, items, isOpen, onClick }) => (
  <div className="accordion-section">
    <div className="accordion-title" onClick={onClick}>
      <h3>{title}</h3>
      <span>{isOpen ? "−" : "+"}</span>
    </div>
    {isOpen && (
      <div className="accordion-content">
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);


const FAQSection = ({ faqs, openIndex, setOpenIndex }) => {
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="faq-section">
      <h2>❓ Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <div className="faq-question" onClick={() => toggleFAQ(index)}>
            {faq.q} <span>{openIndex === index ? "−" : "+"}</span>
          </div>
          {openIndex === index && <div className="faq-answer">{faq.a}</div>}
        </div>
      ))}
    </div>
  );
};

const HelpTipsPage = () => {
  const { section } = useParams();
  const [openAccordion, setOpenAccordion] = useState(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  
  useEffect(() => {
    if (section === "quick-farming") setOpenAccordion("farming");
    else if (section === "irrigation") setOpenAccordion("irrigation");
    else if (section === "fertilizer") setOpenAccordion("fertilizer");
    else setOpenAccordion(null);
  }, [section]);

  return (
    <div>
      <Navbar/>
      <div className="help-tips-page">
        <section className="help-hero">
          <h1>🌾 Help & Tips for Farmers</h1>
          <p>Quick farming advice, irrigation guidance, soil tips, and FAQs to boost your agricultural skills.</p>
        </section>


        <section className="tips-section">
          <AccordionSection
            title="💡 Quick Farming Tips"
            items={farmingTips}
            isOpen={openAccordion === "farming"}
            onClick={() => setOpenAccordion(openAccordion === "farming" ? null : "farming")}
          />
          <AccordionSection
            title="💧 Irrigation Advice"
            items={irrigationTips}
            isOpen={openAccordion === "irrigation"}
            onClick={() => setOpenAccordion(openAccordion === "irrigation" ? null : "irrigation")}
          />
          <AccordionSection
            title="🌱 Fertilizer & Soil Tips"
            items={fertilizerTips}
            isOpen={openAccordion === "fertilizer"}
            onClick={() => setOpenAccordion(openAccordion === "fertilizer" ? null : "fertilizer")}
          />


          <FAQSection faqs={faqs} openIndex={openFAQ} setOpenIndex={setOpenFAQ} />
        </section>
      </div>


     <Footer/>
    </div>
  );
};

export default HelpTipsPage;
