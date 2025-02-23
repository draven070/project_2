import {signupUser, loginUser, logoutUser, getAllUsers, getUserByemail 
} from "../controllers/userControllers.js";
import express from "express";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";
const router = express.Router();

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.get("/alluser",getAllUsers)
router.get("/users/:email",getUserByemail)
router.post("/logout",protectedRoutes,logoutUser);

export default router;