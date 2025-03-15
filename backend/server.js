const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ------------------------ MONGODB CONNECTION ------------------------

mongoose
  .connect(
    "mongodb+srv://prasanth:gZJTty2bOoaLAV77@cluster0.uwh3g.mongodb.net/venueManagement?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// ------------------------ VENUE BOOKING SCHEMA ------------------------

const venueSchema = new mongoose.Schema({
  venue: { type: String, required: true },
  facultyId: { type: String, required: true },
  purpose: { type: String, required: true },
  fromDate: { type: String, required: true }, // Format: YYYY-MM-DD
  fromTime: { type: String, required: true }, // Format: HH:mm (24-hour)
  toTime: { type: String, required: true },
});

const Venue = mongoose.model("Venue", venueSchema);

// ------------------------ BOOK A VENUE ------------------------

app.post("/api/bookVenue", async (req, res) => {
  try {
    const { venue, facultyId, purpose, fromDate, fromTime, toTime } = req.body;

    // ✅ Validate request
    if (!venue || !facultyId || !purpose || !fromDate || !fromTime || !toTime) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    console.log("🔍 Received Booking Request:", req.body);

    // ✅ Ensure date is in correct format (YYYY-MM-DD)
    const formattedDate = fromDate.split("-").join("-");

    // ✅ Check if the venue is already booked in the same time range
    const existingBooking = await Venue.findOne({
      venue,
      fromDate: formattedDate,
      $or: [
        { fromTime: { $lte: toTime }, toTime: { $gte: fromTime } } // Time Overlapping Fix
      ],
    });

    if (existingBooking) {
      console.log("Venue Already Booked:", existingBooking);
      return res.status(409).json({ message: "Venue is already booked for this time slot!" });
    }

    // ✅ Save the new booking
    const newBooking = new Venue({ venue, facultyId, purpose, fromDate: formattedDate, fromTime, toTime });
    await newBooking.save();

    console.log("Booking Successful:", newBooking);
    res.status(201).json({ message: "Venue booked successfully!" });
  } catch (error) {
    console.error(" Error Booking Venue:", error);
    res.status(500).json({ error: " Failed to book venue." });
  }
});

// ------------------------ GET ALL BOOKINGS ------------------------

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Venue.find();
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error Fetching Bookings:", err);
    res.status(500).json({ error: " Failed to fetch booking history." });
  }
});

// ------------------------ CHECK VENUE AVAILABILITY ------------------------

app.get("/api/checkAvailability", async (req, res) => {
  let { date, fromTime, toTime } = req.query;

  try {
    if (!date || !fromTime || !toTime) {
      return res.status(400).json({ error: "❌ All parameters are required!" });
    }

    // ✅ Ensure date is in correct format (YYYY-MM-DD)
    const formattedDate = date.split("-").join("-");

    // ✅ List of all venues
    const allVenues = [
      "Main Auditorium", "Vedhanayagam Auditorium", "SF Seminar Hall 1",
      "SF Seminar Hall 2", "SF Seminar Hall 3", "EEE Seminar Hall",
      "ECE Seminar Hall", "Textile Seminar Hall", "Biotech Seminar Hall",
      "CSE Lab 1", "CSE Lab 2", "CSE Lab 3", "CSE Lab 4", "CSE Lab 5",
      "IT Lab 1", "IT Lab 2", "IT Lab 3", "IT Lab 4", "IT Lab 5",
      "AIML Lab 1", "AIML Lab 2", "AIML Lab 3", "AIML Lab 4", "AIML Lab 5",
      "CSBS Lab 1", "CSBS Lab 2", "ISE Lab 1", "ISE Lab 2"
    ];

    // ✅ Find booked venues on this date and time range
    const bookedVenues = await Venue.find({
      fromDate: formattedDate,
      $or: [{ fromTime: { $lte: toTime }, toTime: { $gte: fromTime } }], // Fixed time conflict logic
    }).select("venue");

    const bookedVenueNames = bookedVenues.map((booking) => booking.venue);

    // ✅ Mark venues as available or booked
    const venueStatus = allVenues.map((venue) => ({
      name: venue,
      status: bookedVenueNames.includes(venue) ? "booked" : "available",
    }));

    res.status(200).json(venueStatus);
  } catch (error) {
    console.error("Error Checking Venue Availability:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ------------------------ START SERVER ------------------------

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
