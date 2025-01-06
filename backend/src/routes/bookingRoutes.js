import express from "express";
import { acceptBookingRequest } from "../controllers/bookingControllers.js";

const router = express.Router();

// Guide accepts a booking request
router.post("/accept/:bookingId", acceptBookingRequest);

export default router;
