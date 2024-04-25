import { React } from "react";
import { PeraWalletProvider } from "./components/PeraWalletProvider"; // Import the provider

import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <PeraWalletProvider>
      <Navbar />
    </PeraWalletProvider>
  );
}

export default App;
