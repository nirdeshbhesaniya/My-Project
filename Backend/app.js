import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import studentRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/user.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// Routes
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/feedback", feedbackRoutes);

export { app }