import React from "react";
import "../styles/LandingPage.css";

function LandingPage() {
  return (
    <div className="container">
      <div className="middle-holder">
          <h1>Your Trusted Dental Care Partner</h1>
          <p>Welcome to our dental care center, where you can enjoy the best dental experience.</p>
          <div className="button-container">
          <button className="button">Book Application</button>
          <button className="button">View Doctors</button>
          </div>
      </div>
      

      <div className="doctors-holder">
        <button className="button">Meet Doctors</button>
      </div>
      
    </div>
  );
}

export default LandingPage;
