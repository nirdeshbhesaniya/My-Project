import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../component/Card";
import AOS from "aos";
import "aos/dist/aos.css";

const sampleFeedbacks = [
  "Great initiative! Helps students voice their opinions anonymously.",
  "The cafeteria food needs improvement!", 
  "Professors are really helpful, but some classes feel rushed.",
];

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-indigo-600 mb-6" data-aos="fade-down">
        Mystery Message
      </h1>
      <p className="text-lg text-gray-700 mb-4 text-center max-w-md" data-aos="fade-up">
        Share your honest feedback anonymously and help improve our college community!
      </p>

      {/* Submit Feedback Button */}
      <Link 
        to="/feedback" 
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg mb-6 transition-all shadow-md"
        data-aos="zoom-in"
      >
        Submit Feedback
      </Link>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4" data-aos="fade-left">
        Recent Messages
      </h2>

      {/* Feedback Cards with Animation */}
      <div className="w-full max-w-md space-y-4">
        {sampleFeedbacks.map((feedback, index) => (
          <div 
            key={index} 
            className="shadow-md border border-gray-300 p-4 rounded-lg bg-white"
            data-aos="fade-up" 
            data-aos-delay={index * 200} // Delays animation for each card
          >
            <p className="text-gray-700">{feedback}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
