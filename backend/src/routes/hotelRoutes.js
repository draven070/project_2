import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load hotel data
const filePath = path.join(__dirname, '../data/hotel.json');
let hotels = [];

fs.readFile(filePath, 'utf8', (err, data) => {
    if (!err) {
        hotels = JSON.parse(data);
    } else {
        console.error("Error reading hotel data:", err); //Added error handling.
    }
});

// Fetch all hotels
router.get('/', (req, res) => {
    res.json(hotels);
});


export default router;