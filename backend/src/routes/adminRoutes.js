import express from "express";
import { getAllUsers, deleteUser, getAllTourist, deleteTourist } from "../controllers/adminControllers.js";

const router = express.Router();

router.get("/users", getAllUsers); // Get all users
router.get("/tourists",getAllTourist)
router.delete("/users/:id", deleteUser); // Delete user by ID
router.delete("/tourists/:id", deleteTourist); // Delete user by ID

export default router;
