import React, { useState, useContext } from "react";
import { algodClient } from "../../algorand/config.js";
import checkTransactionStatus from "../../algorand/checkTransactionStatus.js";
import { PeraWalletContext } from "../PeraWalletContext";
import AssetScrolling from "../AssetScrolling/index.js";
import { send } from "../../algorand/transactionHelpers/send.js";

export default function DepositComponent({ onDepositSuccess, accountAddress }) {
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState("");
  const [showComponent, setShowComponent] = useState(false);

  const peraWallet = useContext(PeraWalletContext);

  const waitForConfirmation = (txId) => {
    return new Promise((resolve) => {
      checkTransactionStatus(txId, resolve);
    });
  };

  const handleDeposit = async () => {
    try {
      setDisabled(true);
      setStatus("Processing your deposit. Please wait...");
      const txn = await send(
        accountAddress,
        "JQONXCP7LYP2O2XQLOPBM6I67LBGCZGEZGHBRRBJBAJEWEIWIRIFZIPXIQ",
        2 * 1000000,
        "0", // '0' for ALGO
        `Phantoms Deposit: Cards RPG`
      );

      const signedTx = await peraWallet.signTransaction([txn]);
      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();

      // console.log("Transaction ID:", txConfirmation.txId);

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
      setDisabled(false);
      setStatus("");
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <AssetScrolling
        accountAddress={accountAddress}
        onImagesLoaded={() => setShowComponent(true)}
      />
      {showComponent && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl mt-2 mb-4">Deposit Algo to Play</h1>
          <p className="mb-4 w-80">
            Get ready to join the fun and have a chance to win phntm tokens!
            (Min 200 phntm rewarded on win)
          </p>
          <button
            onClick={handleDeposit}
            disabled={disabled}
            className="mt-4 input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md"
          >
            Deposit 2 ALGO to Play
          </button>
          <p>{status}</p>
        </div>
      )}
    </div>
  );
}
