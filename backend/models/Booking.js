const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  facultyId: { type: String, required: true },
  purpose: { type: String, required: true },
  noOfDays: { type: Number, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  fromTime: { type: String, required: true },
  toTime: { type: String, required: true },
  venue: { type: String, required: true },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
