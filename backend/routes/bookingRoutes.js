const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking"); 

// API to get booked venues for a specific date & time
router.get("/bookings", async (req, res) => {
  try {
    const { fromDate, toDate, fromTime, toTime } = req.query;

    // Fetch all booked venues within the given date & time range
    const bookedVenues = await Booking.find({
      $or: [
        {
          fromDate: { $lte: toDate },
          toDate: { $gte: fromDate },
          fromTime: { $lte: toTime },
          toTime: { $gte: fromTime },
        },
      ],
    });

    // Extract only booked venue names
    const bookedVenueNames = bookedVenues.map((booking) => booking.venue);

    res.json({ bookedVenues: bookedVenueNames });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
