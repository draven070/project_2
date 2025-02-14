import express from "express";
import {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
} from "../controllers/hotel.controllers.js"; // Ensure the '.js


const router = express.Router();

// Controller functions (you need to implement these)

// Routes
router.get("/get", getAllHotels);
router.post("/create", createHotel);
router.get("/:id", getHotelById);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

export default router;
