import React, { useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div
      className="App bg-cover bg-center"
      style={{
        backgroundImage:
          "url('./codioful-formerly-gradienta-G084bO4wGDA-unsplash.jpg')",
      }}
    >
      <Navbar />
    </div>
  );
}

export default App;
