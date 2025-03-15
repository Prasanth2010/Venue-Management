import React, { useState } from "react";
import "../styles/VenueBooking.css";
import Sidebar from "../components/Sidebar";


function VenueBooking() {
  // Define state variables
  const [name, setName] = useState("");
  const [facultyId, setFacultyId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [noOfDays, setNoOfDays] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [venue, setVenue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const bookingData = {
      name,
      facultyId,
      purpose,
      noOfDays,
      fromDate,
      toDate,
      fromTime,
      toTime,
      venue,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/venues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
  
      const data = await response.json();
      console.log("Response from server:", data);
  
      if (response.ok) {
        alert("Venue booked successfully!");
      } else {
        alert("Booking failed.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("An error occurred.");
    }
  };
  
  

  return (
    <div className="venue-booking-container">
      <Sidebar />
      <h2 className="topic">Venue Booking</h2>
      <form className="form" onSubmit={handleSubmit}>
        {/* Form fields */}
        <table className="table">
          <tr>
            <td>Name:</td>
            <td className="box">
              <input
                type="text"
                name="name"
                placeholder="Faculty Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="ipbox"
              />
            </td>
          </tr>
         
            <tr>
              <td>Id:</td>
              <td>
                <input
                  type="text"
                  name="facultyId"
                  placeholder="Faculty ID"
                  value={facultyId}
                  onChange={(e) => setFacultyId(e.target.value)}
                  required
                  className="ipbox"
                />
              </td>
            </tr>
            <tr>
              <td>Purpose:</td>
              <td>
                <input
                  type="text"
                  name="purpose"
                  placeholder="Purpose of venue"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  required
                  className="ipbox"
                />
              </td>
            </tr>
            <tr>
              <td>No of Days:</td>
              <td>
                <input
                  type="number"
                  name="noOfDays"
                  placeholder="Total no of days"
                  value={noOfDays}
                  onChange={(e) => setNoOfDays(e.target.value)}
                  required
                  className="ipbox"
                />
              </td>
            </tr>
            <tr>
              <td>From Date:</td>
              <td>
                <input
                  type="date"
                  name="fromDate"
                  placeholder="Booking Date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
                  className="ipbox"
                />
              </td>
            </tr>
            <tr>
              <td>To Date:</td>
              <td>
                <input
                  type="date"
                  name="toDate"
                  placeholder="Booking Date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                  className="ipbox"
                />
              </td>
            </tr>
            <tr>
              <td>From Time:</td>
              <td>
                <input
                  type="time"
                  name="fromTime"
                  placeholder="From Time"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                  required
                  className="ipbox"
                />
              </td>
            </tr>
            <tr>
              <td>To Time:</td>
              <td>
                <input
                  type="time"
                  name="toTime"
                  placeholder="To Time"
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                  required
                  className="ipbox"
                />
              </td>
            </tr>
            <tr>
              <td>Venues:</td>
              <td>
                <select
                  name="venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  required
                  className="ipbox"
                >
                  <option value="" disabled>
                    Select a Venue
                  </option>
                  <option value="Main Auditorium">Main Auditorium</option>
                  <option value="Vedhanayagam Auditorium">Vedhanayagam Auditorium</option>
                  <option value="SF Seminar Hall 1">SF Seminar Hall 1</option>
                  <option value="SF Seminar Hall 2">SF Seminar Hall 2</option>
                <option value="SF Seminar Hall 3">SF Seminar Hall 3</option>
                <option value="EEE Seminar Hall">EEE Seminar Hall</option>
                <option value="ECE Seminar Hall">ECE Seminar Hall</option>
                <option value="Textile Seminar Hall">Textile Seminar Hall</option>
                <option value="Biotech Seminar Hall">Biotech Seminar Hall</option>
                <option value="CSE Lab 1">CSE Lab 1</option>
                <option value="CSE Lab 2">CSE Lab 2</option>
                <option value="CSE Lab 3">CSE Lab 3</option>
                <option value="CSE Lab 4">CSE Lab 4</option>
                <option value="CSE Lab 5">CSE Lab 5</option>
                <option value="IT Lab 1">IT Lab 1</option>
                <option value="IT Lab 2">IT Lab 2</option>
                <option value="IT Lab 3">IT Lab 3</option>
                <option value="IT Lab 4">IT Lab 4</option>
                <option value="IT Lab 5">IT Lab 5</option>
                <option value="AIML Lab 1">AIML Lab 1</option>
                <option value="AIML Lab 2">AIML Lab 2</option>
                <option value="AIML Lab 3">AIML Lab 3</option>
                <option value="AIML Lab 4">AIML Lab 4</option>
                <option value="AIML Lab 5">AIML Lab 5</option>
                <option value="CSBS Lab 1">CSBS Lab 1</option>
                <option value="CSBS Lab 2">CSBS Lab 2</option>
                <option value="ISE Lab 1">ISE Lab 1</option>
                <option value="ISE Lab 2">ISE Lab 2</option>
                </select>
              </td>
            </tr>
          

        </table>
        <center>
          <button type="submit" className="btn">Book Venue</button>
        </center>
      </form>
    </div>
  );
}

export default VenueBooking;


