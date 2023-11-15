import React, { useState } from "react";
import PeraWalletButton from "./components/PeraWalletButton";
import DisplayAccountInformation from "./components/DisplayAccountInformation"; // Import the component
import DisplayPhantomv1 from "./components/DisplayPhantomv1"; // Import the component
import "./App.css";

function App() {
  const [connectedAccountAddress, setConnectedAccountAddress] = useState(null);
  const phantomAddress =
    "IWY24Q6GUUIMJITMTR3FDO4Q54UCBPPPIWJUQ57CWLASPRHFHXTXIQUQYA";
  return (
    <div className="App">
      <header className="App-header">
        <PeraWalletButton onConnect={setConnectedAccountAddress} />
        {connectedAccountAddress && (
          <DisplayAccountInformation accountAddress={connectedAccountAddress} />
        )}
       {!connectedAccountAddress && <DisplayPhantomv1 accountAddress={phantomAddress} />}
      </header>
    </div>
  );
}

export default App;
