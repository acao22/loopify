import React from "react";
import { Link } from "react-router-dom";

const ThankYouScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-400 to-green-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Thank You for Voting!</h1>
      <p className="text-lg mb-8">Your input helps us create better playlists for everyone.</p>
      <Link
        to="/"
        className="bg-white text-green-600 font-semibold py-2 px-6 rounded-3xl shadow-lg hover:bg-gray-100"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default ThankYouScreen;
