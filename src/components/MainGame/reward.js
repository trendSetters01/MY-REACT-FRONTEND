// Component to handle reward distribution
import React, { useState, useContext, useRef } from "react";
import { algodClient } from "../../algorand/config.js";
import countPhntmNfts from "../../algorand/countPHNTMNFTs.js";
import { send } from "../../algorand/transactionHelpers/send.js";
import { optIn } from "../../algorand/opt-in.js";
import { checkOptIn } from "../../algorand/transactionHelpers/checkOptInStatus.js";

import { PeraWalletContext } from "../PeraWalletContext";

export default function RewardComponent({ accountAddress }) {
  const [status, setStatus] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const [showMsg, setShowMsg] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [showRewardButton, setshowRewardButton] = useState(true);
  const [nftCount, setNftCount] = useState(0);
  const [boostMultiplier, setBoostMultiplier] = useState(1);
  const BASE_PHNTM_REWARD = 0;

  const peraWallet = useContext(PeraWalletContext);

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

  async function handleOptIn() {
    setStatus("Opt-in Processing...");
    try {
      const txn = await optIn(accountAddress, "1276228104");
      const signedTx = await peraWallet.signTransaction([txn]);
      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();
      console.log("Transaction ID:", txConfirmation.txId);
      setStatus(
        "Opt-in successful, please wait for the rewards txn to be prompted."
      );
    } catch (error) {
      console.log("Couldn't sign Opt-in txn", error);
      setStatus("Opt-in failed");
    }
  }

  async function handleGameWin() {
    setshowRewardButton(false);
    try {
      const nftCount = await countPhntmNfts(accountAddress);
      const rewardAmount = calculateRewards(BASE_PHNTM_REWARD, nftCount);
      const totalPhantomTokenConversion = 1; //parseFloat(rewardAmount) * 100000000;
      const phntmTokenAddress =
        "JUXKRQVHDITUMMZHIOH2JVNEOGZJXKPS2DHS5OSH6MAE36RIV2FXKRKV2Q"; // PHNTM token address

      setNftCount(nftCount);
      setRewardAmount(rewardAmount);

      // reward distribution logic
      setStatus("Initiating reward distribution...");
      await handleOptIn();

      setTimeout(async () => {
        const optInStatus = await checkOptIn(accountAddress, "1276228104");
        console.log("Opt-in status:", optInStatus);
        if (optInStatus) {
          const txn = await send(
            phntmTokenAddress,
            accountAddress,
            totalPhantomTokenConversion,
            "1276228104", // for phntm thnx token
            "Thank you for testing the game!"
          );

          const signedTx = await peraWallet.signTransaction([txn]);
          const txConfirmation = await algodClient
            .sendRawTransaction(signedTx)
            .do();

          console.log("Transaction ID:", txConfirmation.txId);
          setTransactionId(txConfirmation.txId);
          setStatus(`Reward distribution completed`);
          if (rewardAmount > 0) {
            setShowMsg(true);
          }
        } else {
          setStatus("Opt-in failed");
        }

        setTimeout(() => {
          setNftCount(0);
          setRewardAmount(0);
          setShowMsg(false);
          setStatus("");
          setTransactionId(null);
          setBoostMultiplier(1);
        }, 5000);
      }, 10000);
    } catch (error) {
      console.error("Error handling game win:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mb-4">
      <button
        onClick={handleGameWin}
        className="mt-4 input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md"
        disabled={!showRewardButton}
      >
        Claim Reward
      </button>
      <p>{status}</p>
      {transactionId && (
        <a
          href={`https://algoexplorer.io/tx/${transactionId}`}
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
