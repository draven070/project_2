import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Define the file path for storing hotel data
const filePath = path.join(__dirname, "../data/hotel.json");

// Load existing hotels
let hotels = [];
if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf8");
    hotels = JSON.parse(data);
}

// Multer Storage Config for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/data/images/"); // Save in the images folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});

const upload = multer({ storage });

// **POST /api/hotels** → Add a new hotel
router.post("/", upload.single("image"), (req, res) => {
    const { hotel_name, location, website, rating, price_range } = req.body;

    if (!hotel_name || !location || !website || !rating || !price_range || !req.file) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const newHotel = {
        hotel_name,
        location,
        website,
        image: `/public/data/images/${req.file.filename}`, // Store the image path
        rating,
        price_range,
    };

    hotels.push(newHotel);

    // Save updated hotel data to JSON file
    fs.writeFile(filePath, JSON.stringify(hotels, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Error saving hotel data" });
        }
        res.status(201).json({ message: "Hotel added successfully!", hotel: newHotel });
    });
});

export default router;
