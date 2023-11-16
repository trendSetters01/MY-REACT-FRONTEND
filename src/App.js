import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./components/Home";
import DisplayAccountInformation from "./components/DisplayAccountInformation";
import DisplayPhantomv1 from "./components/DisplayPhantomv1";

function App() {
  const [connectedAccountAddress, setConnectedAccountAddress] = useState(null);
  const phantomAddress =
    "IWY24Q6GUUIMJITMTR3FDO4Q54UCBPPPIWJUQ57CWLASPRHFHXTXIQUQYA";
  return (
    <div className="dark:bg-gray-700">
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/account-info"
            element={
              <DisplayAccountInformation
                setConnectedAccountAddress={setConnectedAccountAddress}
                accountAddress={connectedAccountAddress}
                connectedAccountAddress={connectedAccountAddress}
              />
            }
          />
          <Route
                path="/phantom-v1"
                element={<DisplayPhantomv1 accountAddress={phantomAddress} />}
              />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
