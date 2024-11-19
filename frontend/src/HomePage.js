import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gradient-to-b from-[#4D9B0E] to-[#1A3505] min-h-screen">
      {/* Header Section */}
      <header className="text-white p-6">
        <h1 className="text-7xl font-bold text-center mt-30 mb-4">loopify</h1>
        <p className="text-center text-lg">discover new loops of sound</p>
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Search for playlist category"
            className="p-3 w-2/3 rounded-lg text-gray-800"
          />
        </div>
      </header>

      {/* Vote Button */}
      <div className="flex justify-center">
          <Link to="/workeridinterface">
            <button className="bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-green-600">
              Vote
            </button>
          </Link>
        </div>

      {/* Playlist Section */}
      <section className="text-white p-6">
        <p className="text-center mb-4">Help us crowdsource more vibes. Select the best songs for...</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Playlist Cards */}
          <PlaylistCard
            title="hitting the gym"
            imageUrl="/squidtentacle.png"
            bgColor="bg-orange-500"
          />
          <PlaylistCard
            title="getting over a three week-long situationship"
            imageUrl="/squidtentacle.png"
            bgColor="bg-blue-400"
          />
          <PlaylistCard
            title="walking 30 minutes to trader joe’s"
            imageUrl="/squidtentacle.png"
            bgColor="bg-green-300"
          />
          <PlaylistCard
            title="locking in before 11:59 PM deadline"
            imageUrl="/squidtentacle.png"
            bgColor="bg-teal-600"
          />
        </div>
      </section>
    </div>
  );
};

// PlaylistCard Component
const PlaylistCard = ({ title, imageUrl, bgColor }) => {
  return (
    <div className={`${bgColor} p-4 rounded-lg shadow-lg`}>
      <img src={imageUrl} alt={title} className="w-full rounded-lg mb-4" />
      <p className="text-center">{title}</p>
    </div>
  );
};

export default HomePage;
