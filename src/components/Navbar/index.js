import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "../Menu";
import Home from "../Home";
import DisplayAccountInformation from "../DisplayAccountInformation";
import DisplayPhantomv1 from "../DisplayPhantomv1";
import DisplayPhantomv2 from "../DisplayPhantomv2";
import SetAddress from "../SetAddress";
import OptInComponent from "../OptIn";
import Swap from "../swap";
import SendTransaction from "../sendTransaction";
import DestroyAsset from "../DestroyAsset";
import PeraWalletOptInOut from "../PeraWalletOptInOut";
import MintNFTARC3 from "../MintNFTARC3";
import MintNFTARC69 from "../MintNFTARC69";

export default function Navbar() {
  const [connectedAccountAddress, setConnectedAccountAddress] = useState(null);

  const phantomV1Address =
    "IWY24Q6GUUIMJITMTR3FDO4Q54UCBPPPIWJUQ57CWLASPRHFHXTXIQUQYA";
  const phantomV2Address =
    "YI7APPJQ6P2CLKW5E7YZ5NFMC4KBGES2EXN72ADUNX2BNQPKOOMIBVHWJU";
  return (
    <div>
      <Router>
        <Menu setConnectedAccountAddress={setConnectedAccountAddress} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/swap" element={<Swap />} />
          <Route
            path="/mint-nft-arc3"
            element={<MintNFTARC3 accountAddress={connectedAccountAddress} />}
          />
          <Route
            path="/mint-nft-arc69"
            element={<MintNFTARC69 accountAddress={connectedAccountAddress} />}
          />
          <Route
            path="/opt-in-out"
            element={
              <PeraWalletOptInOut accountAddress={connectedAccountAddress} />
            }
          />
          <Route
            path="/send-asset"
            element={
              <SendTransaction accountAddress={connectedAccountAddress} />
            }
          />
          <Route
            path="/destroy-asset"
            element={<DestroyAsset accountAddress={connectedAccountAddress} />}
          />
          <Route path="/opt-in/:assetId" element={<OptInComponent />} />
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
            path="/register-your-address"
            element={
              <SetAddress
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
