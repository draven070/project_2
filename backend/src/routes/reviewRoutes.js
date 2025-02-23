import { addReview} from "../controllers/reviewController.js";
import { protectedRoutes } from "../middlewares/protectedRoutes.js";
import express from "express";
import { getReviewsByGuideEmail } from "../controllers/reviewController.js";
const router = express.Router();
router.post("/add/:email",addReview);
router.get("/guide/:email", getReviewsByGuideEmail);
export default router;
