// Component to handle reward distribution
import React, { useState, useContext } from "react";
import { algodClient } from "../../algorand/config.js";
import countPhntmNfts from "../../algorand/countPHNTMNFTs.js";
import { send } from "../../algorand/transactionHelpers/send.js";
import { optIn } from "../../algorand/opt-in.js";
import { getRandomNFTAssetId } from "../../algorand/transactionHelpers/getRandomNFTAssetId.js";

import { PeraWalletContext } from "../PeraWalletContext";
import { autoOptOutRewardedAsset } from "../../algorand/opt-out.js";

export default function RewardComponent({ accountAddress }) {
  const [status, setStatus] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [assetID, setAssetID] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const [showMsg, setShowMsg] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [showRewardButton, setshowRewardButton] = useState(true);
  const [showOptInButton, setshowOptInButton] = useState(true);
  const [nftCount, setNftCount] = useState(0);
  const [boostMultiplier, setBoostMultiplier] = useState(1);
  const BASE_PHNTM_REWARD = 0;

  const peraWallet = useContext(PeraWalletContext);
  const phantomsHoldingAddress =
    "XGJS5VTFTVB3MJDQGXH4Y4M6NYDYEK4OZFF6NIVUTIBS52OTLW2N5CYM2Y";

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
      const assetID = await getRandomNFTAssetId(phantomsHoldingAddress);

      const txn = await optIn(
        accountAddress, //"1276228104"
        assetID
      );
      const signedTx = await peraWallet.signTransaction([txn]);
      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();
      console.log("Transaction ID:", txConfirmation.txId);
      setStatus(
        "Opt-in successful, please click the claim reward button to initiate the transfer process."
      );
      setshowOptInButton(false);
      setAssetID(assetID);
    } catch (error) {
      console.log("Couldn't sign Opt-in txn", error);
      setStatus("Opt-in failed");
      setAssetID(null);
    }
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

      // reward distribution logic
      setStatus("Initiating reward distribution...");
      const txn = await send(
        phantomsHoldingAddress,
        accountAddress,
        totalPhantomTokenConversion,
        assetID, //"1276228104", // for phntm thnx token
        "Thank you for testing the game!"
      );

      const signedTx = await peraWallet.signTransaction([txn]);
      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();

      console.log("Transaction ID:", txConfirmation.txId);

      setTimeout(async () => {
        // opt out of the rewarded asset if amount of that asset held is zero
        await autoOptOutRewardedAsset(assetID);
        setShowLoader(false);
        setTransactionId(txConfirmation.txId);
        setStatus(`Reward distribution completed`);

        if (rewardAmount > 0) {
          setShowMsg(true);
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
      <div class="flex flex-col items-center">
        <button
          style={{ paddingBottom: "4em" }}
          onClick={handleOptIn}
          className="mt-4 input-md bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-orange-400 hover:to-yellow-500 rounded-md"
          disabled={!showOptInButton}
        >
          <p>Opt In </p>
          <p>To Receive Reward</p>
        </button>
        
        {`${assetID}`.length > 0 && (
          <button
            onClick={handleGameWin}
            className="mt-4 input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md"
            disabled={!showRewardButton}
          >
            Claim Reward
          </button>
        )}
        {showLoader && (
          <span className="mt-4 loading loading-spinner loading-lg text-white">
            <div class="flex justify-center">
              <svg
                class="animate-spin h-5 w-5 mr-3 ..."
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
