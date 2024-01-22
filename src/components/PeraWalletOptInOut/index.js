import { useState, useContext } from "react";
import { PeraWalletContext } from "../PeraWalletContext/index.js";
import { optIn } from "../../algorand/opt-in.js";
import { optOut } from "../../algorand/opt-out.js";
import { algodClient } from "../../algorand/config.js";

export default function PeraWalletOptInOut({ accountAddress }) {
  const [activeTab, setActiveTab] = useState("optIn");
  const [optStatus, setOptStatus] = useState(null);
  const [assetId, setAssetId] = useState("");

  const peraWallet = useContext(PeraWalletContext);

  async function handleOptIn() {
    setOptStatus("Opt-in Processing...");
    try {
      const txn = await optIn(accountAddress, assetId);
      const signedTx = await peraWallet.signTransaction([txn]);
      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();
      console.log("Transaction ID:", txConfirmation.txId);
      setOptStatus("Opt-in successful");
      setAssetId("");
    } catch (error) {
      console.log("Couldn't sign Opt-in txn", error);
      setOptStatus("Opt-in failed");
    } finally {
      setTimeout(() => {
        setOptStatus(null);
      }, 5000);
    }
  }

  async function handleOptOut() {
    setOptStatus("Opt-out Processing...");
    try {
      const txn = await optOut(accountAddress, assetId);
      const signedTx = await peraWallet.signTransaction([txn]);
      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();
      console.log("Transaction ID:", txConfirmation.txId);
      setOptStatus("Opt-out successful");
    } catch (error) {
      console.log("Couldn't sign Opt-out txn", error);
      setOptStatus("Opt-out failed");
    } finally {
      setTimeout(() => {
        setOptStatus(null);
      }, 5000);
    }
  }

  return (
    <div
      style={{
        minHeight: "64vh",
        minWidth: "100vw",
        maxWidth: "100vw",
      }}
      className="flex flex-col items-center justify-center"
    >
      {!accountAddress && (
        <h1 className="animate-pulse text-white mt-4">
          Connect your wallet to manage assets.
        </h1>
      )}
      {accountAddress && (
        <div>
          <div role="tablist" className="tabs tabs-boxed text-white">
            <a
              role="tab"
              className={`tab ${activeTab === "optIn" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("optIn")}
            >
              Opt-in
            </a>
            <a
              role="tab"
              className={`tab ${activeTab === "optOut" ? "tab-active" : ""}`}
              onClick={() => setActiveTab("optOut")}
            >
              Opt-out
            </a>
          </div>
          <h1 className="text-2xl font-bold text-white mt-4">
            {optStatus && <p>{optStatus}</p>}
          </h1>
          <label className="form-control w-full max-w-xs">
            <input
              type="text"
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
              placeholder="Asset ID"
              className="input input-bordered w-full max-w-xs input-md"
            />
          </label>
          <div className="tab-content text-white">
            {activeTab === "optIn" && (
              <button
                onClick={handleOptIn}
                className="input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md mt-4 mb-4 w-full max-w-xs"
              >
                <h1 className="text-xl font-bold text-white">Opt-In</h1>
              </button>
            )}
            {activeTab === "optOut" && (
              <button
                onClick={handleOptOut}
                className="input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md mt-4 mb-4 w-full max-w-xs"
              >
                <h1 className="text-xl font-bold text-white">Opt-Out</h1>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
