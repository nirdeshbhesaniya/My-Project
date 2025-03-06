import express from "express";
import { registerStudent } from "../controllers/user.controller.js";
import { loginStudent } from "../controllers/authController.js";
const router = express.Router();

// Student registration route
router.post("/register", registerStudent);
router.post("/login",loginStudent);


export default router;
