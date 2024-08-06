import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-3xl font-bold">Image Maker</div>
        <div>
          <img src="../public/logo.png" alt="Logo" className="h-16 w-40" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;