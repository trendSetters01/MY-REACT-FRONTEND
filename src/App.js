import { React } from "react";
import { PeraWalletProvider } from "./components/PeraWalletProvider"; // Import the provider

import Navbar from "./components/Navbar";

function App() {
  return (
    <PeraWalletProvider>
      <div
        className={`bg-cover bg-center bg-gradient-to-r from-teal-600 to-purple-600`}
        style={{
          overflow: "auto",
        }}
      >
        <Navbar />
      </div>
    </PeraWalletProvider>
  );
}

export default App;
