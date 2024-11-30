import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";

const PaymentForm = ({ closePayment }) => {
  const [username, setUsername] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleCardNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    if (input.length <= 16) {
      const formattedNumber = input.replace(/(.{4})/g, "$1 ").trim();
      setCardNumber(formattedNumber);
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate username
    if (username.trim() === "") {
      errors.username = "Cardholder name is required";
      isValid = false;
    }

    // Validate card number
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      errors.cardNumber = "Card number must be 16 digits";
      isValid = false;
    }

    // Validate expiry date
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)) {
      errors.expiryDate = "Expiry date must be in MM/YY format";
      isValid = false;
    }

    // Validate CVC
    if (cvc.length !== 3) {
      errors.cvc = "CVC must be 3 digits";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Show alert message on successful payment
    window.alert("Payment successful!");

    // Redirect to the User panel page
    window.location.href = "http://localhost:3000/User";
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to cancel the payment?")) {
      closePayment(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f2f2f2",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "30px",
          width: "400px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            backgroundColor: "#34d31c",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "30px",
            fontWeight: "bold",
            margin: "0 auto 20px",
          }}
        >
          <p>P</p>
        </div>
        <h2>Payment Gateway</h2>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          {/* Default Amount Display */}
          <div
            style={{
              marginTop: "20px",
              fontSize: "18px",
              color: "#333",
              fontWeight: "bold",
              backgroundColor: "#f9f9f9",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p>
              Reservation Amount: <span style={{ color: "#ff6b6b" }}>Rs. 500.00</span>
            </p>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "14px",
                color: "#333",
                marginBottom: "5px",
                textAlign: "left",
              }}
            >
              Cardholder Name:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {formErrors.username && (
              <p style={{ color: "#34d31c", fontSize: "12px", marginTop: "5px", textAlign: "left" }}>
                {formErrors.username}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "14px",
                color: "#333",
                marginBottom: "5px",
                textAlign: "left",
              }}
            >
              Card Number:
            </label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {formErrors.cardNumber && (
              <p style={{ color: "#34d31c", fontSize: "12px", marginTop: "5px", textAlign: "left" }}>
                {formErrors.cardNumber}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "14px",
                color: "#333",
                marginBottom: "5px",
                textAlign: "left",
              }}
            >
              Expiry (MM/YY):
            </label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {formErrors.expiryDate && (
              <p style={{ color: "#34d31c", fontSize: "12px", marginTop: "5px", textAlign: "left" }}>
                {formErrors.expiryDate}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                fontSize: "14px",
                color: "#333",
                marginBottom: "5px",
                textAlign: "left",
              }}
            >
              CVC:
            </label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "14px",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
            {formErrors.cvc && (
              <p style={{ color: "#34d31c", fontSize: "12px", marginTop: "5px", textAlign: "left" }}>
                {formErrors.cvc}
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                color: "white",
                backgroundColor: "#34d31c",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                flex: 1,
                margin: "0 5px",
              }}
            >
              Pay
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                color: "white",
                backgroundColor: "#aaa",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                flex: 1,
                margin: "0 5px",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
