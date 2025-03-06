import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateResponse = async (userInput) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Properly formatted prompt for better AI response
    const prompt = `
Analyze the following user feedback and generate a relevant AI response:

Feedback: "${userInput}"

Response Guidelines:
- Acknowledge the feedback.
- Provide meaningful insights or suggestions.
- If the feedback is positive, express appreciation.
- If the feedback is negative, offer constructive solutions.

Generate a clear and concise response.
`;


    const result = await model.generateContent(prompt);

    // Extract the response text properly
    const response = await result.response.text();
    
    return response || "AI response unavailable.";
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "⚠️ AI response unavailable. Please try again later.";
  }
};
