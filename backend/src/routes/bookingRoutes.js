import express from "express";
import { acceptBooking } from "../controllers/bookingControllers.js";

const router = express.Router();

// Guide accepts a booking request
router.post("/accept/:bookingId", acceptBooking);

export default router;
