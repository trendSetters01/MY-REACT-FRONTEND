import React, { useState } from "react";
import { PeraWalletProvider } from "./components/PeraWalletProvider"; // Import the provider

import Navbar from "./components/Navbar";
function App() {
  return (
    <PeraWalletProvider>
      <div
        className="App bg-cover bg-center"
        style={{
          backgroundImage:
            "url('./codioful-formerly-gradienta-G084bO4wGDA-unsplash.jpg')",
        }}
      >
        <Navbar />
      </div>
    </PeraWalletProvider>
  );
}

export default App;
