import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "../Menu";
import Home from "../Home";
import DisplayAccountInformation from "../DisplayAccountInformation";
import DisplayPhantomv1 from "../DisplayPhantomv1";
import DisplayPhantomv2 from "../DisplayPhantomv2";
import Tabs from "../Tabs";
import SetAddress from "../SetAddress";
import OptInComponent from "../OptIn";
import Swap from "../swap";
import SendTransaction from "../sendTransaction";
import DestroyAsset from "../DestroyAsset";
import PeraWalletOptInOut from "../PeraWalletOptInOut";
import MintNFTARC3 from "../MintNFTARC3";
import MintNFTARC69 from "../MintNFTARC69";
import MainGame from "../MainGame";
import Blackjack from "../Blackjack";
import TokenPriceTicker from "../TokenPriceTicker";
import VestigeListing from "../VestigeListing";
import TokenInfo from "../TokenInfo";
import TinymanLPDeposits from "../TinymanLP";
import PHNTMStaking from "../PHNTMStaking";
import SpinTheWheel from "../SpinTheWheel";
import DisplayNFTs from "../DisplayBruceLeeNFT";
import SpecialDinnerPayment from "../Payments";
import Raffle from "../Raffle";
import Dashboard from "../Dashboard";
import OnRamp from "../OnRamp";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("arc3");
  const [connectedAccountAddress, setConnectedAccountAddress] = useState(null);
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const phantomV1Address =
    "IWY24Q6GUUIMJITMTR3FDO4Q54UCBPPPIWJUQ57CWLASPRHFHXTXIQUQYA";
  const phantomV2Address =
    "YI7APPJQ6P2CLKW5E7YZ5NFMC4KBGES2EXN72ADUNX2BNQPKOOMIBVHWJU";
  return (
    <Router>
      <TokenPriceTicker />
      <div
        className="drawer min-h-screen bg-base-200 lg:drawer-open"
      >
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <main className="drawer-content">
          <Menu setConnectedAccountAddress={setConnectedAccountAddress} />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/trade-phntm" element={<VestigeListing />} /> */}
            {/* <Route
            path="/bruce-lee-nft-polygon"
            element={<DisplayNFTs accountAddress={connectedAccountAddress} />}
          /> */}
            <Route path="/token-info" element={<TokenInfo />} />
            <Route
              path="/dashboard"
              element={<Dashboard accountAddress={connectedAccountAddress} />}
            />
            {/* <Route
              path="/tinyman-lp-deposits"
              element={<TinymanLPDeposits />}
            />
            <Route path="/phntm-staking" element={<PHNTMStaking />} /> */}
            {/* <Route
              path="/onramp"
              element={<OnRamp accountAddress={connectedAccountAddress} />}
            />
            <Route
              path="/swap"
              element={<Swap accountAddress={connectedAccountAddress} />}
            />
            <Route
              path="/spin-the-wheel"
              element={
                <SpinTheWheel accountAddress={connectedAccountAddress} />
              }
            /> */}
            {/* <Route
              path="/raffle"
              element={<Raffle accountAddress={connectedAccountAddress} />}
            />
            <Route
              path="/create-raffle"
              element={
                <RaffleCreator accountAddress={connectedAccountAddress} />
              }
            />
            <Route
              path="/raffle/:id/:title/:entryFee/:receiverAddress/:nftId/:imageURL"
              element={
                <RaffleViewer accountAddress={connectedAccountAddress} />
              }
            /> */}

            {/* <Route
              path="/phantoms-21"
              element={<Blackjack accountAddress={connectedAccountAddress} />}
            /> */}
            {/* <Route
              path="/cards-rpg"
              element={<MainGame accountAddress={connectedAccountAddress} />}
            /> */}
            {/* <Route
            path="/mint-nft"
            element={
              <div>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === "arc3" && (
                  <MintNFTARC3 accountAddress={connectedAccountAddress} />
                )}
                {activeTab === "arc69" && (
                  <MintNFTARC69 accountAddress={connectedAccountAddress} />
                )}
              </div>
            }
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
          <Route path="/dinner/pay" element={<SpecialDinnerPayment />} />
          <Route path="/merchandise/pay" element={<SpecialDinnerPayment />} /> */}
            {/* <Route path="/merchandise/pay" element={<MerchandisePayment  />} /> */}
            {/* <Route
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
          /> */}
            <Route
              path="/phantom-v1"
              element={<DisplayPhantomv1 accountAddress={phantomV1Address} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
