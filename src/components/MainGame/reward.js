// Component to handle reward distribution
import React, { useState, useContext, useEffect } from "react";
import { algodClient } from "../../algorand/config.js";
import countPhntmNfts from "../../algorand/countPHNTMNFTs.js";
import { optIn } from "../../algorand/opt-in.js";
import { send } from "../../algorand/transactionHelpers/send.js";
import axios from "axios";
import { PeraWalletContext } from "../PeraWalletContext";

export default function RewardComponent({ accountAddress }) {
  const [status, setStatus] = useState("");
  const [winReceipt, setWinReceipt] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [showMsg, setShowMsg] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [showRewardButton, setshowRewardButton] = useState(true);
  const [nftCount, setNftCount] = useState(0);
  const [boostMultiplier, setBoostMultiplier] = useState(1);
  const BASE_PHNTM_REWARD = 0;

  const peraWallet = useContext(PeraWalletContext);
  const API_BASE_URL = "https://phantoms-api.onrender.com/api/v1"; // Replace with your backend URL

  function calculateRewards(baseReward, nftCount) {
    let multiplier = 1;
    if (nftCount >= 5) {
      multiplier = 1.5; // 50% more for 5 or more NFTs
    } else if (nftCount >= 3) {
      multiplier = 1.3; // 30% more for 3 or more NFTs
    } else if (nftCount >= 1) {
      multiplier = 1.1; // 10% more for 1 or more NFTs
    }
    setBoostMultiplier(multiplier);
    return baseReward * multiplier;
  }

  async function handleGameWin() {
    setshowRewardButton(false);
    setShowLoader(true);
    try {
      const nftCount = await countPhntmNfts(accountAddress);
      const rewardAmount = calculateRewards(BASE_PHNTM_REWARD, nftCount);
      const totalPhantomTokenConversion = 1; //parseFloat(rewardAmount) * 100000000;

      setNftCount(nftCount);
      setRewardAmount(rewardAmount);

      const winConfirmationTx = await send(
        accountAddress,
        accountAddress,
        0,
        "0", // '0' for ALGO
        `Phantoms Win Confirmation receipt for ${accountAddress}: Cards RPG`
      );
      const optInTxn = await optIn(
        accountAddress, //"1276228104"
        "1279721720"
      );
      // reward distribution logic
      setStatus("Initiating opt-in request..., please watch for wallet popup.");
      const signedTx = await peraWallet.signTransaction([
        optInTxn,
        winConfirmationTx,
      ]);
      let count = 0;
      for (const signedTxnGroup of signedTx) {
        const { txId } = await algodClient
          .sendRawTransaction(signedTxnGroup)
          .do();

        console.log(`txns signed successfully! - txID: ${txId}`);
        if (count === 0) {
          setStatus(setStatus("Opt in transaction sent successfully!"));
        } else {
          setWinReceipt(`${txId}`);
        }
        count++;
        setTransactionId(txId);
      }

      setTimeout(async () => {
        setStatus(
          "Initiating reward distribution..., please watch for wallet popup."
        );
        try {
          const response = await axios.post(`${API_BASE_URL}/send-rewards`, {
            to: accountAddress,
          });
          const txId = response?.data?.txn?.txId;
          console.log("Reward distribution txn:", txId);
          setTransactionId(txId);
          setShowLoader(false);
          txId && setTransactionId(txId);
          setStatus(`Reward distribution completed`);
        } catch (error) {
          console.error("Error recording participant:", error);
        }

        if (rewardAmount > 0) {
          setShowMsg(true);
        }

        setTimeout(() => {
          setNftCount(0);
          setRewardAmount(0);
          setShowMsg(false);
        }, 5000);
      }, 5000);
    } catch (error) {
      console.error("Error handling game win:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <div className="flex flex-col items-center">
        {transactionId && (
          <div className="flex flex-col items-center justify-center">
            <a
              href={`https://allo.info/tx/${winReceipt}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-green-500 hover:underline"
              style={{ wordBreak: "break-word" }}
            >
              Phantoms Win Confirmation receipt- txID: {winReceipt}
            </a>
            <p className="p-4 mt-4" style={{ wordBreak: "break-word" }}>
              keep this for your records or to claim your reward later through
              the discord channel if anything goes wrong.
            </p>
          </div>
        )}
        <button
          onClick={handleGameWin}
          className="mt-8 input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md"
          disabled={!showRewardButton}
        >
          Claim Reward
        </button>
        {showLoader && (
          <span className="mt-4 loading loading-spinner loading-lg text-white">
            <div className="flex justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 ..."
                style={{ border: "5px solid white" }}
                viewBox="0 0 24 24"
              ></svg>
              Processing ...
            </div>
          </span>
        )}

        <p className="p-4 mt-4">{status}</p>
      </div>
      {transactionId && (
        <a
          href={`https://allo.info/tx/${transactionId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-blue-500 hover:underline"
          style={{ wordBreak: "break-word" }}
        >
          Transaction ID: {transactionId}
        </a>
      )}
      <div>
        {showMsg && (
          <p>
            Congratulations! You won {rewardAmount} PHNTM tokens.
            {nftCount > 0 &&
              ` You received a ${((boostMultiplier - 1) * 100).toFixed(
                0
              )}% boost for holding ${nftCount} PHNTM NFT(s)!`}
          </p>
        )}
      </div>
    </div>
  );
}
