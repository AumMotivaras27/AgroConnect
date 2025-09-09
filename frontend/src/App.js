import { Navigate } from "react-router-dom";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import NewsPage from './components/NewsPage';
import Paymentpage from './components/Paymentpage';
import CropForm from './components/CropForm';
import CropsPage from './components/CropsPage';
import HelpTipsPage from './components/HelpTipsPage';
import Login from './components/Login';
import CropReccomendation from "./components/CropReccomendation";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/payment" element={<Paymentpage />} />
        <Route path="/crops-form" element={<CropForm />} />
        <Route path="/crops" element={<CropsPage />} />
        <Route path="/tips" element={<HelpTipsPage />} />
        <Route path="/crop-recommendation" element={<CropReccomendation />} />
      </Routes>
    </Router>
  );
}
export default App