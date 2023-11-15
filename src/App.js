import React, { useState } from "react";
import PeraWalletButton from "./components/PeraWalletButton";
import DisplayAccountInformation from "./components/DisplayAccountInformation"; // Import the component
import DisplayPhantomv1 from "./components/DisplayPhantomv1"; // Import the component
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";

function App() {
  const [connectedAccountAddress, setConnectedAccountAddress] = useState(null);
  const phantomAddress =
    "IWY24Q6GUUIMJITMTR3FDO4Q54UCBPPPIWJUQ57CWLASPRHFHXTXIQUQYA";
  return (
    <div className="App">
      {/* <Home />
      <header className="App-header">
        <PeraWalletButton onConnect={setConnectedAccountAddress} />
        {connectedAccountAddress && (
          <DisplayAccountInformation accountAddress={connectedAccountAddress} />
        )}
        {!connectedAccountAddress && (
          <DisplayPhantomv1 accountAddress={phantomAddress} />
        )}
      </header> */}
      <Router>
      <div className="App">
        <nav style={{fontSize: '32px'}}>
          <Link to="/">Home |</Link>
          {/* <Link to="/account-info"> Account Information |</Link> */}
          <Link to="/phantomv1"> Phantom V1</Link>
        </nav>

        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/account-info" element={connectedAccountAddress ? <DisplayAccountInformation accountAddress={connectedAccountAddress} /> : <PeraWalletButton onConnect={setConnectedAccountAddress} />} /> */}
            <Route path="/phantomv1" element={<DisplayPhantomv1 accountAddress={phantomAddress} />} />
          </Routes>
        </header>
      </div>
    </Router>
    </div>
  );
}

export default App;
