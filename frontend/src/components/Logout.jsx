import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session
    localStorage.removeItem("user"); // If you're storing user data in localStorage
    localStorage.removeItem("token"); // If you're using JWT tokens

    // Redirect to sign-in page
    navigate("/");
  }, [navigate]);

  return null;
};

export default Logout;
