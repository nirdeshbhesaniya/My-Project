import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  senderEmail: { type: String, required: true },
  recipientEmail: { type: String }, // optional: only needed if feedback is directed to another user
  feedback: { type: String, required: true },
  response: { type: String },
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
