import { cosSim } from '../utils/cosineSimilarity.js'; // Correct import
import express from "express";
import hotels from "../data/hotel.json" assert { type: "json" }; // Import JSON

const router = express.Router();

// Fetch recommended hotels based on location similarity
router.get('/', (req, res) => {
  const { location } = req.query;

  if (!location) {
      return res.status(400).json({ error: 'Location is required' });
  }

  console.log("Location received:", location); // Debugging
  console.log("Hotels data available:", hotels.length); // Debugging

  const recommendedHotels = cosSim(location, hotels);
  console.log("Recommendations generated:", recommendedHotels); // Debugging

  res.json(recommendedHotels);
});

export default router;
