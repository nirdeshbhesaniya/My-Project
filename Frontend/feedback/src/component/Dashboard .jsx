import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setUserEmail(storedEmail);
      fetchUserFeedbacks(storedEmail);
    } else {
      setError("❌ No email found. Please log in again.");
    }
  }, []);

  const fetchUserFeedbacks = async (email) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/feedback/${email}`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      setError("⚠️ Unable to fetch feedbacks. Please try again later.");
    }
  };

  return (
    
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-gray-800 text-white shadow-xl rounded-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-400 mb-6">📋 Your Feedback</h1>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-500 text-white rounded-lg shadow-md text-center"
          >
            <p className="font-semibold">{error}</p>
          </motion.div>
        )}

        {/* No Feedback Message */}
        {!error && feedbacks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-700 rounded-lg text-center text-gray-300"
          >
            <p className="text-lg font-semibold">🚀 No feedback found!</p>
            <p className="text-sm mt-2">
              You haven't received any feedback yet. Start engaging with others to get valuable insights!
            </p>
          </motion.div>
        )}

        {/* Feedback List */}
        {feedbacks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 mt-4"
          >
            {feedbacks.map((fb, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-gray-700 rounded-lg shadow-md border border-gray-600"
              >
                <p className="text-sm text-gray-400">
                  <strong>📩 Your Email:</strong> {userEmail}
                </p>
                <p className="text-sm text-gray-400">
                  <strong>✉️ Sender:</strong> {fb.senderEmail}
                </p>
                <p className="mt-2 text-white">
                  <strong>💬 Feedback:</strong> {fb.feedback}
                </p>
                <p className="mt-2 text-indigo-300">
                  <strong>🤖 AI Response:</strong> {fb.response}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
