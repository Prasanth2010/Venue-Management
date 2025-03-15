import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getMongoClient } from "./services/mongo"; 
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import VenueBooking from "./components/VenueBooking";
import BookingHistory from "./components/BookingHistory";
import Settings from "./components/Settings";
import AvailableVenues from "./components/AvailableVenues"; 
import Logout from "./components/Logout";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  useEffect(() => {
    async function testConnection() {
      try {
        const mongoClient = await getMongoClient();
        const db = mongoClient.db("venueManagement");
        console.log("Connected to MongoDB:", db);
      } catch (error) {
        console.error("Connection test failed:", error);
      }
    }
    testConnection();
  }, []); 

  return (
    <Router>
    
      <div className="App">
        
        <Routes>
          
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/homeee" element={<Home />} />
          <Route path="/venue-booking" element={<VenueBooking />} />
          <Route path="/booking-history" element={<BookingHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/available-venues" element={<AvailableVenues />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
