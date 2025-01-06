import express from "express";
import { getUserNotifications } from "../controllers/notificationControllers.js";

const router = express.Router();

// Get notifications for a user
router.get("/:userId/notifications", getUserNotifications);

export default router;
