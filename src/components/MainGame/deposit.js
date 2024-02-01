import React, { useState, useContext } from "react";
import { algodClient } from "../../algorand/config.js";
import { PeraWalletContext } from "../PeraWalletContext";
import axios from "axios";
import AssetScrolling from "../AssetScrolling/index.js";
import { send } from "../../algorand/transactionHelpers/send.js";

export default function DepositComponent({ onDepositSuccess, accountAddress }) {
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState("");
  const [showComponent, setShowComponent] = useState(false);

  const peraWallet = useContext(PeraWalletContext);
  const API_BASE_URL = "https://phantoms-api.onrender.com/api/v1"; // Replace with your backend URL

  const handleDeposit = async () => {
    try {
      setDisabled(true);
      setStatus("Processing your deposit. Please wait...");

      const cardsRPGSendParams = await axios.get(`${API_BASE_URL}/cards-rpg-deposit`);
      const { receiver, amount, assetId, note } = cardsRPGSendParams?.data?.sendParams;
      const cardsRPGTxn = await send(accountAddress, receiver, amount, assetId, note);

      const cardsRPGSignedTx = await peraWallet.signTransaction([cardsRPGTxn]);
      const cardsRPGTxConfirmation = await algodClient
        .sendRawTransaction(cardsRPGSignedTx)
        .do();

      console.log("Transaction ID:", cardsRPGTxConfirmation.txId);

      setStatus("Deposit pending...");

      // Wait for transaction confirmation
      const response = await axios.post(`${API_BASE_URL}/check-deposit-tx`, {
        asset: "ALGO",
        txId: cardsRPGTxConfirmation.txId,
      });

      const { isConfirmed, correct } = response?.data;

      if (isConfirmed && correct) {
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
          <h1 className="text-4xl mt-2 mb-4 font-bold">Deposit Algo to Play</h1>
          <p className="mb-4 w-80 font-bold">
            Get ready to join the fun and have a chance to win phntm tokens!
            (Min 400 phntm rewarded on win)
          </p>
          <button
            onClick={handleDeposit}
            disabled={disabled}
            className="mt-4 input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md font-bold"
          >
            Deposit 2 ALGO to Play
          </button>
          <p>{status}</p>
        </div>
      )}
    </div>
  );
}
