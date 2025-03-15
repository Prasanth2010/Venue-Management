import React from "react";
import Sidebar from "../components/Sidebar";
import "../pages/Dashboard.css"; 
const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
      <Sidebar />
      <div className="content"><b className="b">
      <h1 className="welcome">Welcome to BIT Venue Booking</h1>
      <h1 className="happy">Book your Venues</h1></b>
      </div>
      
    </div>
    </div> 
    
    
  );
};

export default Dashboard;
