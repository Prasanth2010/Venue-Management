const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express App
const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // To handle CORS issues

// MongoDB Connection URI
const mongoURI = "mongodb+srv://prasanth:gZJTty2bOoaLAV77@cluster0.uwh3g.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Schema and Model
const VenueSchema = new mongoose.Schema({
  name: String,
  location: String,
});
const Venue = mongoose.model("Venue", VenueSchema);

// Define Routes
app.post("/api/venues", async (req, res) => {
  const { name, location } = req.body;

  try {
    const newVenue = new Venue({ name, location });
    await newVenue.save();
    res.status(201).json({ message: "Venue created successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create venue" });
  }
});

app.get("/api/venues", async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch venues" });
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
