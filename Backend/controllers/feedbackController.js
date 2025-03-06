import Feedback from "../model/feedback.model.js";
import { generateResponse } from "../config/openai.js";

// ✅ Submit Feedback (Based on Email)
export const submitFeedback = async (req, res) => {
  try {
    const { senderEmail, recipientEmail, feedback } = req.body;

    if (!senderEmail) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!feedback) {
      return res.status(400).json({ message: "Feedback cannot be empty" });
    }

    // Generate AI response using OpenAI
    const aiResponse = await generateResponse(feedback);

    // Save feedback in the database
    const newFeedback = new Feedback({ senderEmail, recipientEmail, feedback, response: aiResponse });
    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully!", response: aiResponse });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Feedback (For Admin)
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Feedback by Email
export const getFeedbackByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const feedbacks = await Feedback.find({ recipientEmail: email });

    if (!feedbacks.length) {
      return res.status(404).json({ message: "No feedback found for this email." });
    }

    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Server error" });
  }
};

