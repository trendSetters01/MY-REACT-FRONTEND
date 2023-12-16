import React, { useState, useContext, useRef } from "react";
import { algodClient } from "../../algorand/config.js";
import checkTransactionStatus from "../../algorand/checkTransactionStatus.js";
import { PeraWalletContext } from "../PeraWalletContext";
import { send } from "../../algorand/transactionHelpers/send.js";

export default function DepositComponent({ onDepositSuccess, accountAddress }) {
  const [depositAmount, setDepositAmount] = useState(""); // Default deposit amount
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  const peraWallet = useContext(PeraWalletContext);
  const phantomsHoldingAddress =
    "XGJS5VTFTVB3MJDQGXH4Y4M6NYDYEK4OZFF6NIVUTIBS52OTLW2N5CYM2Y"; // Address to send deposits to

  const waitForConfirmation = (txId) => {
    return new Promise((resolve) => {
      checkTransactionStatus(txId, resolve);
    });
  };

  const handleDeposit = async () => {
    if (depositAmount !== "3") {
      setStatus("Please enter a valid deposit amount. (3 ALGO Required)");
      setTimeout(() => {
        setDepositAmount("");
        setNote("");
        setStatus("");
      }, 5000);
      return;
    }

    try {
      setStatus("Initiating deposit...");
      const txn = await send(
        accountAddress,
        phantomsHoldingAddress,
        parseFloat(depositAmount) * 1000000,
        "0", // '0' for ALGO
        note
      );

      const signedTx = await peraWallet.signTransaction([txn]);
      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();

      console.log("Transaction ID:", txConfirmation.txId);

      setStatus("Deposit pending...");

      // Wait for transaction confirmation
      const isConfirmed = await waitForConfirmation(txConfirmation.txId);
      if (isConfirmed) {
        setStatus("Deposit confirmed.");
        console.log("Deposit confirmed.");
        onDepositSuccess();
      } else {
        setStatus("Deposit failed.");
      }
    } catch (error) {
      console.error("Deposit error:", error);
      setStatus("Deposit failed.");
    }

    setTimeout(() => {
      setDepositAmount("");
      setNote("");
      setStatus("");
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-4">Deposit Algo to Play</h1>
      <p className="mb-4 w-80">
        Get ready to join the fun and have a chance to win exciting prizes.
      </p>
      <label className="form-control w-full max-w-xs">
        <input
          type="text"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
          placeholder="3 ALGO Required"
          className="mt-4 input input-bordered w-full max-w-xs text-black"
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (optional)"
          className="mt-4 input input-bordered w-full max-w-xs text-black"
        />
      </label>
      <button
        onClick={handleDeposit}
        className="mt-4 input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md"
      >
        Deposit
      </button>
      <p>{status}</p>
    </div>
  );
}
