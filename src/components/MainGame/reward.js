// Component to handle reward distribution
import React, { useState, useContext, useEffect } from "react";
import { algodClient } from "../../algorand/config.js";
import countPhntmNfts from "../../algorand/countPHNTMNFTs.js";
import { send } from "../../algorand/transactionHelpers/sendReward.js";
import { optIn } from "../../algorand/opt-in.js";
import { getRandomNFTAssetId } from "../../algorand/transactionHelpers/getRandomNFTAssetId.js";

import { PeraWalletContext } from "../PeraWalletContext";

export default function RewardComponent({ accountAddress }) {
  const [status, setStatus] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [assetID, setAssetID] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const [showMsg, setShowMsg] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);
  const [showRewardButton, setshowRewardButton] = useState(true);
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

  async function handleGameWin() {
    setshowRewardButton(false);
    setShowLoader(true);
    try {
      const nftCount = await countPhntmNfts(accountAddress);
      const rewardAmount = calculateRewards(BASE_PHNTM_REWARD, nftCount);
      const totalPhantomTokenConversion = 1; //parseFloat(rewardAmount) * 100000000;

      setNftCount(nftCount);
      setRewardAmount(rewardAmount);

      const assetID = await getRandomNFTAssetId(phantomsHoldingAddress);
      setAssetID(assetID);

      const optInTxn = await optIn(
        accountAddress, //"1276228104"
        assetID
      );
      // reward distribution logic
      setStatus("Initiating opt-in request..., please watch for wallet popup.");
      const signedTx = await peraWallet.signTransaction([optInTxn]);

      for (const signedTxnGroup of signedTx) {
        const { txId } = await algodClient
          .sendRawTransaction(signedTxnGroup)
          .do();

        console.log(`txns signed successfully! - txID: ${txId}`);
        setStatus("IOpt in transaction sent successfully!");
        setTransactionId(txId);
      }


      setTimeout(async () => {
        setStatus("Initiating reward distribution..., please watch for wallet popup.");
       const txConfirmation = await send(
          phantomsHoldingAddress,
          accountAddress,
          totalPhantomTokenConversion,
          assetID,
          "Thank you for playing the game! check us out https://phantoms-ashy.vercel.app/"
        );

        setShowLoader(false);
        txConfirmation && setTransactionId(txConfirmation.txId);
        setStatus(`Reward distribution completed`);

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
