// Import required modules

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import database from './db/database.js';
import userRoutes from './routes/userRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import kycRoutes from './routes/kycRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js'
import cookieParser from 'cookie-parser';
import touristRoutes from "./routes/touristRoutes.js"; // Import other routes as needed
import dashRoutes from "./routes/dashRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";


// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to database
database(); // Make sure this function initializes your database connection

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CORS configuration (allow all origins, methods, and headers)
app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
}));


// CORS configuration
var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};


// Handling preflight requests (OPTIONS method)
app.options("*", cors());


// Routes
app.use("/api/review",reviewRoutes);
app.use("/api/user", userRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/tourist", touristRoutes);
app.use("/api/dash", dashRoutes);
app.use("/api/profile", profileRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the app if needed for testing or other modules
export { app };
