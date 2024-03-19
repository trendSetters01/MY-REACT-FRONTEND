import React, { useState, useRef, useContext, useEffect } from "react";
import SpinAndWin from "react-spin-game";
import "react-spin-game/dist/index.css";
import Confetti from "react-confetti";
import { algodClient } from "../../algorand/config.js";
import { PeraWalletContext } from "../PeraWalletContext";
import axios from "axios";
import { optIn } from "../../algorand/opt-in.js";
import { send } from "../../algorand/transactionHelpers/send.js";

const freeSpinGifts = [
  ["PHNTM", "#391379"],
  ["TACOS", "orange"],
  ["VOI", "#e83be8"],
  ["AKITA", "#64e9b1"],
  ["PHNTM", "#391379"],
  ["TACOS", "orange"],
  ["VOI", "#e83be8"],
  ["AKITA", "#64e9b1"],
];
let count = 0;

export default function SpinTheWheel({ accountAddress }) {
  const [result, setResult] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [winReceipt, setWinReceipt] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [rewardAccountBalance, setRewardAccountBalance] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  const [message, setMessage] = useState(null);
  const ref = useRef(null);

  const peraWallet = useContext(PeraWalletContext);
  const API_BASE_URL = "https://phantoms-api.onrender.com/api/v1"; // Replace with your backend URL

  const getRandomResult = () => {
    const randomIndex = Math.floor(Math.random() * freeSpinGifts.length);
    return freeSpinGifts[randomIndex][0]; // Assuming you want to use the first element (name) as the result
  };

  const handleClaimReward = async () => {
    setShowLoader(true);
    try {
      const winConfirmationTx = await send(
        accountAddress,
        accountAddress,
        0,
        "0", // '0' for ALGO
        `Phantom Pals Win Confirmation receipt for ${accountAddress}: Spin the Wheel Game won ${result}`
      );
      let optInTxn = await optIn(accountAddress, "1279721720");
      if (result === "AKITA") {
        optInTxn = await optIn(accountAddress, "523683256");
      }
      if (result === "TACOS") {
        optInTxn = await optIn(accountAddress, "329110405");
      }
      if (result === "VOI") {
        optInTxn = await optIn(accountAddress, "1392374998");
      }
      // reward distribution logic
      setMessage(
        "Initiating opt-in request..., please watch for wallet popup."
      );
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
          setMessage(setMessage("Opt in transaction sent successfully!"));
        } else {
          setWinReceipt(`${txId}`);
          const checkTx = txId;
          setTimeout(async () => {
            setMessage(
              "Initiating reward distribution..., please watch for wallet popup."
            );
            try {
              const response = await axios.post(
                `${API_BASE_URL}/send-spin-the-wheel-rewards`,
                {
                  asset: result,
                  to: accountAddress,
                  winReceipt: checkTx,
                }
              );
              const txId = response?.data?.txn?.txId;
              const statucCode = response?.data?.statusCode;
              if (statucCode === 429) {
                setTransactionId(txId);
                setShowLoader(false);
                txId && setTransactionId(txId);
                setMessage(`Only one reward per wallet address.`);
              } else if (statucCode === 200) {
                console.log("Reward distribution txn:", txId);
                setTransactionId(txId);
                setShowLoader(false);
                txId && setTransactionId(txId);
                setMessage(`Reward distribution completed`);
              }
            } catch (error) {
              console.error("Error recording participant:", error);
            }
          }, 5000);
        }
        count++;
        setTransactionId(`${txId}}`);
      }
    } catch (error) {
      console.error("Error handling game win:", error);
    }
  };

  useEffect(() => {
    if (count === 0) {
      setResult(getRandomResult());
    }
    count++;
  });

  useEffect(() => {
    if (accountAddress) {
      checkEligibility();
      checkRewardAccountBalance();
    }
  }, [accountAddress]);

  const checkEligibility = async () => {
    setShowLoader(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/check-participant`, {
        to: accountAddress,
      });
      const statucCode = response?.data?.statusCode;
      if (statucCode === 429) {
        setMessage(
          `Only one spin per wallet address, per day. Please Try again tomorrow!`
        );
        setGameOver(true);
      }
      setShowLoader(false);
    } catch (err) {
      console.log("Error checking eligibility:", err);
      setMessage(
        `Sorry sonething went wrong, please try again later or contact us on discord or email us at support@phantomshub.com.`
      );
      setGameOver(true);
      setShowLoader(false);
    }
  };

  const checkRewardAccountBalance = async () => {
    setShowLoader(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/check-reward-account-balance`
      );
      if (response?.data?.statusCode === 200) {
        setRewardAccountBalance(true);
      }
      if (response?.data?.statusCode === 400) {
        setGameOver(true);
        setRewardAccountBalance(false);
      }
    } catch (err) {
      console.log("Error checking reward account balance:", err);
      setRewardAccountBalance(false);
      setGameOver(true);
    }
  };

  return (
    <div
      style={{
        wordWrap: "break-word",
        maxHeight: "100vh",
        minHeight: "70vh",
        maxWidth: "100vw",
        minWidth: "100vw",
      }}
      className="flex flex-col items-center gap-4 justify-center text-white"
    >
      {!accountAddress && (
        <h1 className="animate-pulse text-white">
          Connect your wallet to participate.
        </h1>
      )}
      {accountAddress && (
        <>
          {showConfetti && (
            <Confetti width={window.width} height={window.height} />
          )}
          <div
            className="pt-4"
            style={{ maxHeight: "100vh", maxWidth: "100vw" }}
          >
            <SpinAndWin
              ref={ref}
              hideButton={true}
              result={result}
              data={freeSpinGifts}
              minTime={5000}
            />
          </div>
          <div className="flex flex-col items-center justify-center pb-4">
            {/* Game Messages */}
            {message && <p className="mt-4 mb-4 px-12 py-2">{message}</p>}
            {!rewardAccountBalance && (
              <p className="mt-2 mb-4 px-12 py-2">
                We apologize for the incovinience but currently our reward
                account wallet is running low in balance. We will refill it
                soon. Thanks for your patience.
              </p>
            )}
            {transactionId && (
              <div className="flex flex-col items-center justify-center">
                <a
                  href={`https://allo.info/tx/${winReceipt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 mt-4 text-white hover:underline"
                  style={{ wordBreak: "break-word" }}
                >
                  Phantom Pals Win Confirmation receipt- txID: {winReceipt}
                </a>
                <p className="p-2" style={{ wordBreak: "break-word" }}>
                  keep this for your records or to claim your reward later
                  through the discord channel if anything goes wrong.
                </p>
              </div>
            )}
            {showLoader && (
              <span className="m-2 loading loading-spinner loading-lg text-white">
                <div className="flex justify-center pb-4">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 ..."
                    style={{ border: "5px solid white" }}
                    viewBox="0 0 24 24"
                  ></svg>
                  Processing ...
                </div>
              </span>
            )}
            {transactionId && (
              <a
                href={`https://allo.info/tx/${transactionId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 mt-4 text-black hover:underline"
                style={{ wordBreak: "break-word" }}
              >
                Transaction ID: {transactionId}
              </a>
            )}
            <button
              className="bg-gradient-to-r from-red-400 to-red-800 px-8 py-4 rounded mx-2"
              disabled={gameOver}
              onClick={() => {
                setGameOver(true);
                ref.current.handleSpin();
                setTimeout(() => {
                  setShowConfetti(true);
                  if (accountAddress) {
                    handleClaimReward();
                  }
                }, 3000);
                setTimeout(() => {
                  setShowConfetti(false);
                }, 13000);
              }}
            >
              Spin
            </button>
          </div>
        </>
      )}
    </div>
  );
}
