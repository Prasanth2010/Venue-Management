import React, { useEffect } from 'react';
import Sidebar from "../components/Sidebar"; 
import '../styles/Home.css';

function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
    <Sidebar />
    <div className="content">
    <h1 className="welcome">Welcome to BIT Venue Booking</h1>
    <h1 className="happy">Book your Venues</h1>
    </div>
    
  </div>
  );
}




export default Home;
