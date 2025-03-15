import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css"; 


const Sidebar = () => {
  return (

    <div className="sidebar">
      <div className="sidebar-logo">Venue Management</div>
      <ul className="sidebar-menu">
        <li className="top"><Link to="/dashboard">🏠 Home</Link></li>
        <li className="top"><Link to="/venue-booking">📅 Bookings</Link></li>
        <li className="top"><Link to="/available-venues">📍 Venues</Link></li>
        <li className="top"><Link to="/booking-history">📜 History</Link></li>
        <li className="top"><Link to="/settings">📞 Contact</Link></li>
        {/*<li className="top"><Link to="/admin">🔑 Admin</Link></li>
        <li className="profile"><Link to="/profile">👤 Profile</Link></li>*/}
        <li className="logout"><Link to="/logout">🚪 Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
