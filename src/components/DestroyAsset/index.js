import React, { useState, useContext } from "react";
import { PeraWalletContext } from "../PeraWalletContext";
import { algodClient } from "../../algorand/config.js";
import { destroyAsset } from "../../algorand/destroyAsset.js";

export default function DestroyAsset({ accountAddress }) {
  const [assetId, setAssetId] = useState(null);
  const [status, setStatus] = useState(null);
  const [transactionId, setTransactionId] = useState(null);

  const peraWallet = useContext(PeraWalletContext);

  const handleDestroyAsset = async () => {
    setStatus(`Destroying Asset ${assetId} ...`);
    try {
      const singleTxnGroup = await destroyAsset(accountAddress, assetId);

      const signedTx = await peraWallet.signTransaction([singleTxnGroup]);
      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();

      setStatus(
        `Successfully Destroyed Asset ${assetId}, Transaction ID: ${txConfirmation.txId}`
      );
      setTransactionId(txConfirmation.txId);

      setTimeout(() => {
        setAssetId(null);
        setTransactionId(null);
        setStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Error destroying asset:", error);
      setStatus(`Failed to Destroy Asset ${assetId ? assetId : ""}.`);
      setTimeout(() => {
        setAssetId(null);
        setTransactionId(null);
        setStatus(null);
      }, 5000);
    }
  };

  return (
    <div
      style={{
        minHeight: "64vh",
        minWidth: "100vw",
        maxWidth: "100vw",
      }}
      className="flex flex-col items-center justify-center"
    >
      <div className="bg-light rounded-lg p-4">
        {!transactionId && (
          <div
            style={{ wordWrap: "break-word", width: "20em" }}
            className="border border-gray-600 rounded shadow-lg p-4 mb-4 bg-gradient-to-r from-black to-gray-600 text-black flex flex-col items-center justify-center"
          >
            <input
              type="text"
              value={assetId || ""}
              onChange={(e) => setAssetId(e.target.value)}
              placeholder="Enter Asset ID"
              className="input-md mt-4 mb-4"
            />
            <button
              disabled={!accountAddress}
              onClick={handleDestroyAsset}
              data-tip={
                !accountAddress
                  ? "Please connect your wallet to the app to interact."
                  : ""
              }
              className={`input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md mb-4  ${
                !accountAddress ? "tooltip tooltip-info" : ""
              }`}
            >
              Destroy Asset
            </button>
            {status && (
              <p className="text-lg font-semibold text-gray-300">{status}</p>
            )}
          </div>
        )}

        {transactionId && (
          <div className="ml-4 mt-20 w-80">
            {status && (
              <p className="text-lg font-semibold text-gray-300">{status}</p>
            )}
            <a
              href={`https://allo.info/tx/${transactionId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
              style={{ wordBreak: "break-word" }}
            >
              Transaction ID: {transactionId}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
