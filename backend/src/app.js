// Import required modules
import express from "express";

import cors from "cors";
import cookieParser from "cookie-parser";



import userRoutes from "./routes/userRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import kycRoutes from "./routes/kycRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import touristRoutes from "./routes/touristRoutes.js";
import dashRoutes from "./routes/dashRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";



// Initialize Express app
const app = express();

// CORS configuration
app.use(cors(
  {
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }
))

// Json Parser configuration
app.use(express.json({
    limit: "16kb"
}))

// URL encoding configuration
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

// Serve static files from the "public" directory
app.use('/public', express.static('public'));


// Setting up cookie parser
app.use(cookieParser());


// Routes

app.use("/api/review", reviewRoutes);
app.use("/api/user", userRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/tourist", touristRoutes);
app.use("/api/dash", dashRoutes);
app.use("/api/profile", profileRoutes);
//
app.use("/api/hotel", hotelRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/notification", notificationRoutes);


// Export the app for testing or other uses
export { app };
