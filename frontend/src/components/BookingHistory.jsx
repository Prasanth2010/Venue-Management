import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BookingHistory.css"; // Ensure you have styles
import Sidebar from "../components/Sidebar";
function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get("http://localhost:5000/api/bookings"); // ✅ Fetch bookings
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching booking history:", err);
        setError("Failed to fetch booking history.");
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  return (
    <div className="booking-history-container">
      <Sidebar />
      <center><h2 className="tit">Booking History</h2></center>
      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table border="1" className="booking-table">
          <thead>
            <tr>
              <th className="tbone">Name</th>
              <th>Faculty ID</th>
              <th>Purpose</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>From Time</th>
              <th>To Time</th>
              <th>Venue</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="tbone">{booking.name}</td>
                <td>{booking.facultyId}</td>
                <td>{booking.purpose}</td>
                <td>{booking.fromDate}</td>
                <td>{booking.toDate}</td>
                <td>{booking.fromTime}</td>
                <td>{booking.toTime}</td>
                <td>{booking.venue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingHistory;
