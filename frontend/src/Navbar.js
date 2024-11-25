import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 flex justify-between items-center p-4 text-white">
      <Link to="/">
        <h1 className="text-3xl font-dynapuff font-bold">loopify</h1>
      </Link>
      <Link to="/profile">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLXuM2b4djVbMt63hftHrWFFMeQmccyytKlQ&s"
          alt="Profile"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      </Link>
    </nav>
  );
};

export default Navbar;
