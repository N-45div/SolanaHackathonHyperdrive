import React, { useState } from "react";
import "./index.css"; // Import a separate CSS file for styles

function IndexPopup() {
  const [data, setData] = useState("");
  const [dataa, setDataa] = useState("");
  const [datea, setDatea] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // State for success message

  const handleAddButtonClick = () => {
    // Perform any necessary actions here
    // For now, we'll just show a success message
    setShowSuccessMessage(true);

    // You can add logic to handle data submission or other actions here
  };

  return (
    <div className="popup-container">
      <h2 className="popup-title">Welcome to Trusty</h2>
      <div className="input-container">
        <input
          className="popup-input"
          onChange={(e) => setData(e.target.value)}
          value={data}
          placeholder="Add Wallet address"
        />
        <input
          className="popup-input"
          onChange={(e) => setDataa(e.target.value)}
          value={dataa}
          placeholder="Add Some nickname"
        />
        <input
          className="popup-input popup-password"
          onChange={(e) => setDatea(e.target.value)}
          value={datea}
          placeholder="Add password to Store"
        />
      </div>
      <button className="popup-button" onClick={handleAddButtonClick}>
        Add Now
      </button>
      {showSuccessMessage && (
        <div className="success-message">
          Added password successfully!
        </div>
      )}
    </div>
  );
}

export default IndexPopup;
