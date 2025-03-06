import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <h2 className="text-lg font-semibold text-blue-500">Mystery Message</h2>
        <div className="flex justify-center space-x-6 mt-2">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/feedback" className="hover:underline">Feedback</Link>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-xl hover:text-gray-300" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-xl hover:text-gray-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-xl hover:text-gray-300" />
          </a>
        </div>
        <p className="text-sm mt-2">© {new Date().getFullYear()} Mystery Message. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
