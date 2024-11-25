import React from "react";

function Footer() {
  return (
    <footer className="bg-[#2E5D09] text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Loopify. All rights reserved.
        </p>
        <p className="text-xs">
          Made with ❤️ by the Loopify team.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
