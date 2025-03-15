import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/available-venues">Available Venues</Link>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/signin">Sign In</Link>
      )}
    </nav>
  );
};

export default Navbar;
