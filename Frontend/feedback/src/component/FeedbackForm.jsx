import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setSenderEmail(storedEmail);
    } else {
      console.error("❌ No email found in localStorage");
    }
  }, []);

  const submitFeedback = async () => {
    if (!senderEmail.trim()) {
      toast.error("❌ Sender email is missing. Please log in again.");
      return;
    }

    if (!feedback.trim()) {
      toast.error("❌ Feedback cannot be empty.");
      return;
    }

    setLoading(true);
    setShowResponse(false);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderEmail, recipientEmail, feedback }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit feedback");
      }

      setResponse(data.response);
      toast.success("✅ Feedback submitted successfully!");

      setFeedback("");
      setRecipientEmail("");
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      setResponse("Failed to submit feedback. Please try again.");
      toast.error("❌ Failed to submit feedback.");
    }

    setLoading(false);
    setShowResponse(true);
  };

  return (
    <div className="flex flex-grow justify-center items-center bg-gradient-to-br from-slate-900 to-gray-800 p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-xl shadow-lg rounded-3xl p-10 w-full max-w-lg text-center border border-gray-600"
      >
        <h2 className="text-3xl font-bold text-white mb-4">💬 Share Your Feedback</h2>
        <p className="text-gray-300 text-sm mb-6">
          Your feedback helps improve the college experience!
        </p>

        <div className="space-y-5">
          {/* Sender Email (Disabled - Auto-filled from localStorage) */}
          <div className="text-left">
            <label className="block text-gray-400 text-sm mb-1">Your Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-400 cursor-not-allowed"
              value={senderEmail}
              disabled
            />
          </div>

          {/* Recipient Email (Optional) */}
          <div className="text-left">
            <label className="block text-gray-400 text-sm mb-1">Recipient Email (Optional)</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recipient email (optional)"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>

          {/* Feedback Textarea */}
          <div className="text-left">
            <label className="block text-gray-400 text-sm mb-1">Your Feedback</label>
            <textarea
              className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your feedback here..."
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            className={`w-full py-3 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={submitFeedback}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>

        {/* AI Response Section */}
        {showResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-5 bg-gray-800 text-white rounded-xl border border-gray-700 shadow-md"
          >
            <h3 className="text-lg font-semibold text-blue-400">💡 AI Suggestion:</h3>
            <p className="text-gray-300">{response}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default FeedbackForm;
