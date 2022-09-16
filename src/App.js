/* eslint-disable no-unused-vars */
import React, {useState} from "react"
import Header from "./Components/Header";
import Meme from "./Components/Meme";
import Canvas from "./Components/Canvas";
import WindowTracker from "./Components/WindowTracker"


function App() {
  
  return (
    <div className="App">
      <Header />
      <Canvas />
      {/* <Meme /> */}
    </div>
    
  );
}

export default App;
