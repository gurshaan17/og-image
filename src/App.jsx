// src/App.js

import React, { useState } from "react";
import ImageMaker from "./ImageMaker";
import Navbar from "./Navbar";


function App() {
  return (
    <div className="App">
      <Navbar/>

      <ImageMaker/>

    </div>
  );
}

export default App;