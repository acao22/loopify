import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import { MagnifyingGlass, ArrowRight } from "phosphor-react";
import { Autocomplete, TextField } from "@mui/material";
import Footer from "./Footer";

const HomePage = () => {
  const playlists = [
    { title: "hitting the gym", bgColor: "bg-orange-500" },
    {
      title: "getting over a three week-long situationship",
      bgColor: "bg-blue-400",
    },
    { title: "walking 30 minutes to trader joe’s", bgColor: "bg-green-300" },
    { title: "locking in before 11:59 PM deadline", bgColor: "bg-teal-600" },
  ];

  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  return (
    <div className="bg-gradient-to-b-custom min-h-screen font-gabarito">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <header className="text-white p-6">
        <h1 className="text-7xl font-bold text-center mt-40 mb-2 font-dynapuff">
          loopify
        </h1>
        <p className="text-center text-xl text-[#2E5D09] font-semibold">
          discover new loops of sound
        </p>
        <div className="flex justify-center mt-4 items-center space-x-4">
          {/* Material-UI Autocomplete for Search */}
          <div className="relative w-2/5 font-gabarito">
            <Autocomplete
              options={playlists.map((playlist) => playlist.title)}
              getOptionLabel={(option) => option}
              onChange={(event, value) => setSelectedPlaylist(value || "")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search for playlist category"
                  variant="standard" // No default outline
                  InputLabelProps={{
                    shrink: true, // Ensures the placeholder behaves correctly
                  }}
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true, // Removes the underline
                    startAdornment: (
                      <div className="pr-2">
                        <MagnifyingGlass size={20} weight="bold" />
                      </div>
                    ),
                  }}
                  sx={{
                    bgcolor: "white",
                    borderRadius: "30px",
                    padding: "6px 8px", // Matches the original padding
                    "& .MuiInputBase-root": {
                      fontSize: "16px", // Matches original font size
                      height: "35px", // Adjust height to match the original
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    },
                    "& .MuiInputBase-input": {
                      padding: "10px 0", // Matches padding inside the input
                    },
                  }}
                />
              )}
              style={{ width: "100%" }}
              disableClearable // Prevents clear icon from showing
              popupIcon={null} // Removes the dropdown arrow
            />
          </div>

          {/* Vote Button */}
          <Link
            to={
              selectedPlaylist
                ? `/vote/${encodeURIComponent(selectedPlaylist)}`
                : "#"
            }
            onClick={(e) => {
              if (!selectedPlaylist) e.preventDefault();
            }}
          >
            <button
              className={`py-3 px-6 rounded-3xl shadow-lg flex items-center space-x-2 font-semibold ${
                selectedPlaylist
                  ? "bg-[#76B247] text-white hover:bg-[#2E5D09] cursor-pointer"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed"
              }`}
              disabled={!selectedPlaylist}
            >
              <span>Vote</span>
              <ArrowRight size={20} weight="bold" />
            </button>
          </Link>
        </div>
      </header>

      {/* Playlist Section */}
      <section className="text-white p-6 px-20">
        <p className="text-left mb-4 text-xl">
          Help us crowdsource more vibes. Select the best songs for...
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.title}
              title={playlist.title}
              imageUrl="/squidtentacle.png"
              bgColor={playlist.bgColor}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// PlaylistCard Component
const PlaylistCard = ({ title, imageUrl, bgColor }) => {
  return (
    <Link
      to={`/vote/${encodeURIComponent(title)}`}
      className={`${bgColor} p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-150 mb-8`}
    >
      <div>
        <img src={imageUrl} alt={title} className="w-full rounded-lg mb-4" />
        <p className="text-center">{title}</p>
      </div>
    </Link>
  );
};

export default HomePage;
