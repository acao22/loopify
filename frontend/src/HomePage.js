import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import { Link } from "react-router-dom";
import { MagnifyingGlass } from "phosphor-react";
import { Autocomplete, TextField } from "@mui/material";
import Footer from "./Footer";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const HomePage = () => {
  const [playlists, setPlaylists] = useState([
    { title: "hitting the gym", bgColor: "bg-orange-500" },
    {
      title: "getting over a three week-long situationship",
      bgColor: "bg-blue-400",
    },
    { title: "walking 30 minutes to trader joe’s", bgColor: "bg-green-300" },
    { title: "locking in before 11:59 PM deadline", bgColor: "bg-teal-600" },
  ]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");

  // Fetch playlists from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/playlists")
      .then((response) => setPlaylists(response.data))
      .catch((error) => console.error("Error fetching playlists:", error));
  }, []);

  // Add a new playlist
  const handleAddPlaylist = () => {
    if (newPlaylistTitle.trim()) {
      axios
        .post("http://localhost:5001/api/playlists", { title: newPlaylistTitle })
        .then((response) => {
          setPlaylists((prev) => [...prev, response.data.playlist]); // Update state with new playlist
          setNewPlaylistTitle("");
          setIsModalOpen(false);
        })
        .catch((error) => console.error("Error adding playlist:", error));
    }
  };

  return (
    <div className="bg-gradient-to-b-custom min-h-screen font-gabarito">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <header className="text-white p-6">
        <h1 className="text-7xl font-bold text-center mb-2 font-dynapuff">
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

          {/* Vote Button
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
          </Link> */}

          {/* Add Your Own Button */}
          <button
            className="py-3 px-6 rounded-3xl shadow-lg flex items-center space-x-2 font-semibold bg-[#76B247] text-white hover:bg-[#2E5D09] cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <span>Add Your Own</span>
          </button>

          {/* View Playlist Results Button */}
          <Link to="/playlists-results">
            <button className="py-3 px-6 rounded-3xl shadow-lg flex items-center space-x-2 font-semibold bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
              <span>View Playlist Results</span>
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

      {/* Add Playlist Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <Box
    className="bg-white p-8 rounded-2xl shadow-2xl mx-auto mt-20 w-11/12 sm:w-2/3 lg:w-1/3"
    sx={{
      outline: "none",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, opacity 0.3s ease",
      transform: isModalOpen ? "scale(1)" : "scale(0.95)",
      opacity: isModalOpen ? 1 : 0,
    }}
  >
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
      Add a New Playlist
    </h2>
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Enter playlist name"
      value={newPlaylistTitle}
      onChange={(e) => setNewPlaylistTitle(e.target.value)}
      className="mb-6"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "15px",
        },
        "& .MuiOutlinedInput-input": {
          padding: "14px",
        },
      }}
    />
    <div className="flex justify-center space-x-6 mt-6">
      <button
        className="py-3 px-6 rounded-full bg-gray-300 hover:bg-gray-400 text-black shadow-md transition duration-200"
        onClick={() => setIsModalOpen(false)}
      >
        Cancel
      </button>
      <button
        className="py-3 px-6 rounded-full bg-[#76B247] hover:bg-[#2E5D09] text-white shadow-md transition duration-200"
        onClick={handleAddPlaylist}
      >
        Add Playlist
      </button>
    </div>
  </Box>
</Modal>

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
