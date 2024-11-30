import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./TimeslotForm.css";
import PaymentForm from "../PaymentForm/PaymentForm"; // Import PaymentForm component
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

Modal.setAppElement("#root"); // Specify your app root element

const TimeslotForm = ({ isOpen, onRequestClose, timeslot, date }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State to show PaymentForm
  const navigate = useNavigate(); // Initialize useNavigate

  // Pre-fill name and email if the user is logged in
  useEffect(() => {
    const username = sessionStorage.getItem("username");
    const userEmail = sessionStorage.getItem("email");
    if (username) {
      setName(username);
      if (userEmail) {
        setEmail(userEmail);
      }
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      name,
      email,
      phone,
      vehicleModel,
      vehicleNumber,
      timeslot,
      date,
    };

    try {
      const response = await fetch(
        "http://localhost/Backend/api2.php?action=add_booking",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        alert("Booking is Proceeded!");
        onRequestClose(); // Close the booking form
       // Show the payment form
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Booking is proceeded.");
      setShowPaymentForm(true); // Redirect to the error page
    }
  };

  const handlePaymentClose = () => {
    setShowPaymentForm(false); // Hide payment form after payment
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-header">
          <h2>Book Timeslot: {timeslot}</h2>
          <button onClick={onRequestClose} className="close-button">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength="10"
              pattern="\d{10}"
              required
            />
          </div>
          <div className="form-group">
            <label>Vehicle Model:</label>
            <input
              type="text"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Vehicle Number:</label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Submit Booking
          </button>
        </form>
      </Modal>

      {showPaymentForm && (
        <Modal
          isOpen={showPaymentForm}
          onRequestClose={handlePaymentClose}
          className="Modal"
          overlayClassName="Overlay"
        >
          <PaymentForm />
        </Modal>
      )}
    </>
  );
};

export default TimeslotForm;