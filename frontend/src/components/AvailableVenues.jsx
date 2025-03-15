import React, { useState } from "react";
import '../styles/AvailableVenues.css';
import Sidebar from "../components/Sidebar";

const AvailableVenues = () => {
  const [date, setDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [venues, setVenues] = useState([]);

  const checkAvailability = async () => {
    if (!date || !fromTime || !toTime) {
      alert("Please select date and time.");
      return;
    }

    // Convert date from YYYY-MM-DD to DD-MM-YYYY before sending request
    const formattedDate = date.split("-").reverse().join("-");

    try {
      const response = await fetch(
        `http://localhost:5000/api/checkAvailability?date=${formattedDate}&fromTime=${fromTime}&toTime=${toTime}`
      );
      const data = await response.json();
      setVenues(data);
    } catch (error) {
      console.error("Error fetching venue availability:", error);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="content">
        <span className="form-container">
          <div className="che">
            <h2 className="title">Check Venue Availability</h2>
            <center>
              <table>
                <tr>
                  <td>Date </td>
                  <td>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <td>From Time </td>
                  <td>
                    <input type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <td>To Time </td>
                  <td>
                    <input type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} />
                  </td>
                </tr>
              </table>
              <button className="glow-on-hover" type="button" onClick={checkAvailability}>
                Check
              </button>
            </center>
          </div>
        </span>
        <span className="list-container">
          <ul className="lists">
            {venues.map((venue, index) => (
              <li key={index} style={{ color: venue.status === "booked" ? "red" : "green" }}>
                {venue.name} - {venue.status.toUpperCase()}
              </li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
};

export default AvailableVenues;