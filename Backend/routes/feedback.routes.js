import express from "express";
import { submitFeedback, getAllFeedback, getFeedbackByEmail } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", submitFeedback); // Submit feedback
router.get("/", getAllFeedback); // Get all feedback (Admin)
router.get("/:email", getFeedbackByEmail); // Get feedback by email

export default router;
