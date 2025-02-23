import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../data/hotel.json");

// DELETE hotel by name and location
router.delete("/", (req, res) => {
    const { hotel_name, location } = req.body; // Get hotel_name & location from request body

    if (!hotel_name || !location) {
        return res.status(400).json({ error: "Hotel name and location are required" });
    }

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading hotel data" });
        }

        let hotels = JSON.parse(data);

        // Check if the hotel exists
        const hotelExists = hotels.some((hotel) => hotel.hotel_name === hotel_name && hotel.location === location);
        if (!hotelExists) {
            return res.status(404).json({ error: "Hotel not found" });
        }

        // Filter out the deleted hotel
        const updatedHotels = hotels.filter((hotel) => !(hotel.hotel_name === hotel_name && hotel.location === location));

        // Write the new list back to JSON file
        fs.writeFile(filePath, JSON.stringify(updatedHotels, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Error saving hotel data" });
            }
            res.status(200).json({ message: "Hotel deleted successfully" });
        });
    });
});

export default router;
