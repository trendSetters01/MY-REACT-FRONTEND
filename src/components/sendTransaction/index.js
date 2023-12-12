import React, { useState, useContext } from "react";
import { PeraWalletContext } from "../PeraWalletContext"; // Import the context
import { send } from "../../algorand/transactionHelpers/send.js"; // This is a hypothetical helper function to construct the transaction object
import { algodClient } from "../../algorand/config.js";

export default function SendTransaction({ accountAddress }) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [assetId, setAssetId] = useState(""); // '0' for ALGO, other values for ASAs
  const [note, setNote] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(null);

  const peraWallet = useContext(PeraWalletContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTransactionStatus("Processing...");
    const effectiveAssetId = assetId.trim() === "" ? "0" : assetId; // Defaults to '0' if assetId is empty

    // Convert ALGO to microALGOs if no assetId is provided
    const convertedAmount =
      effectiveAssetId === "0" ? parseFloat(amount) * 1000000 : amount;
    try {
      const txn = await send(
        accountAddress,
        recipient,
        convertedAmount,
        effectiveAssetId,
        note
      );
      const signedTx = await peraWallet.signTransaction([txn]);

      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();
      console.log("Transaction ID:", txConfirmation.txId);
      setTransactionStatus("Transaction successful");
      // Clear the input fields on successful transaction
      setRecipient("");
      setAmount("");
      setAssetId("");
      setNote("");
    } catch (error) {
      console.error("Transaction failed", error);
      setTransactionStatus("Transaction failed");
    } finally {
      setTimeout(() => {
        setTransactionStatus(null);
      }, 5000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit}>
        {!accountAddress && (
          <h1 className="animate-pulse text-white mt-4">
            Connect your wallet to send assets.
          </h1>
        )}
        {accountAddress && (
          <div>
            <h1 className="text-2xl font-bold text-white mt-4">
              {transactionStatus && <p>{transactionStatus}</p>}
            </h1>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                {/* <span className="label-text text-white">Recipient Address</span> */}
              </div>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Enter recipient address"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                {/* <span className="label-text text-white">Amount</span> */}
              </div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                {/* <span className="label-text text-white">Asset ID</span> */}
              </div>
              <input
                type="text"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                placeholder="Asset ID (Ignore for ALGO)"
                className="input input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                {/* <span className="label-text">Note</span> */}
              </div>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note (optional)"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <button
              type="submit"
              className="bg-gradient-to-r from-gray-500 to-blue-500 hover:from-gray-200 hover:to-blue-700 rounded-md mt-4 mb-4 w-full max-w-xs"
            >
              <h1 className="text-2xl font-bold text-white">Send</h1>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
