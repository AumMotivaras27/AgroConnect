import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Paymentpage.css";

export default function PaymentPage() {
  const [order, setOrder] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
    }
  }, []);

  if (!order) {
    return <h2>No order details found. Please go back and select a crop.</h2>;
  }

  const total = order.quantity * order.price;

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=merchant@upi&pn=AgriStore&am=${total}&cu=INR`;

  const handleConfirm = () => {
    if (!isChecked) {
      alert("⚠️ Please confirm payment before proceeding.");
      return;
    }

    alert("✅ Payment Successful!");
    localStorage.removeItem("order"); 
    navigate("/crops"); 
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p><strong>Crop:</strong> {order.crop}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Price per unit:</strong> ₹{order.price}</p>
        <p><strong>Total:</strong> ₹{total}</p>
      </div>

      <div className="payment-card">
        <h3>Scan to Pay</h3>
        <img src={qrUrl} alt="QR Code for Payment" className="qr-code" />
        <p>Scan this QR code with your UPI app to complete payment</p>

        <div className="confirm-section">
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />{" "}
            I have completed the payment
          </label>
          <br />
          <button
            onClick={handleConfirm}
            className="confirm-btn"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  );
}
