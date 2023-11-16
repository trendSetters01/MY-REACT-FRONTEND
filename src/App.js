import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Home from "./components/Home";
import DisplayAccountInformation from "./components/DisplayAccountInformation";
import DisplayPhantomv1 from "./components/DisplayPhantomv1";
import DisplayPhantomv2 from "./components/DisplayPhantomv2";

function App() {
  const [connectedAccountAddress, setConnectedAccountAddress] = useState(null);
  const phantomV1Address =
    "IWY24Q6GUUIMJITMTR3FDO4Q54UCBPPPIWJUQ57CWLASPRHFHXTXIQUQYA";
  const phantomV2Address =
    "YI7APPJQ6P2CLKW5E7YZ5NFMC4KBGES2EXN72ADUNX2BNQPKOOMIBVHWJU";
  return (
    <div
      className="App bg-cover bg-center"
      style={{ backgroundImage: "url('./codioful-formerly-gradienta-G084bO4wGDA-unsplash.jpg')" }}
    >
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
            element={<DisplayPhantomv1 accountAddress={phantomV1Address} />}
          />
          <Route
            path="/phantom-v2"
            element={<DisplayPhantomv2 accountAddress={phantomV2Address} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
