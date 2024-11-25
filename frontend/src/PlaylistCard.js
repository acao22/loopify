import React from "react";

const PlaylistCard = ({ title, imageUrl, bgColor }) => {
  return (
    <div className={`${bgColor} p-4 rounded-lg shadow-lg`}>
      <img src={imageUrl} alt={title} className="w-full rounded-lg mb-4" />
      <p className="text-center">{title}</p>
    </div>
  );
};

export default PlaylistCard;
