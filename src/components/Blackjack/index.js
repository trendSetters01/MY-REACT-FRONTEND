import React, { useState, useContext, useRef, useEffect } from "react";
import { algodClient } from "../../algorand/config.js";
import checkTransactionStatus from "../../algorand/checkTransactionStatus.js";
import { PeraWalletContext } from "../PeraWalletContext";
import { send } from "../../algorand/transactionHelpers/send.js";
import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";

export default function Blackjack({ accountAddress }) {
  const [deck, setDeck] = useState([]);
  const [dealer, setDealer] = useState({ cards: [], count: 0 });
  const [player, setPlayer] = useState({ cards: [], count: 0 });
  const [inputValue, setInputValue] = useState("");
  const [currentBet, setCurrentBet] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [message, setMessage] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [phntmTokenBalance, setPhntmTokenBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [betWith, setBetWith] = useState("ALGO"); // 'ALGO' or 'PHNTM'
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [isWinner, setIsWinner] = useState(false); // New state for winner

  const peraWallet = useContext(PeraWalletContext);
  const phantomsHoldingAddress =
    "XGJS5VTFTVB3MJDQGXH4Y4M6NYDYEK4OZFF6NIVUTIBS52OTLW2N5CYM2Y"; // Address to send deposits to

  const waitForConfirmation = (txId) => {
    return new Promise((resolve) => {
      checkTransactionStatus(txId, resolve);
    });
  };

  const handleDeposit = async () => {
    try {
      const bet = parseFloat(inputValue);
      setMessage("Processing your deposit. Please wait...");
      const txn = await send(
        accountAddress,
        phantomsHoldingAddress,
        betWith === "ALGO" ? bet * 1000000 : bet * 100000000, // ( / 1e8).toFixed(8)
        betWith === "ALGO" ? "0" : "1279721720", // '0' for ALGO
        `Deposit to Phantoms Holding`
      );

      const signedTx = await peraWallet.signTransaction([txn]);
      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();

      console.log("Transaction ID:", txConfirmation.txId);

      setMessage("Deposit pending...");

      // Wait for transaction confirmation
      const isConfirmed = await waitForConfirmation(txConfirmation.txId);

      if (isConfirmed) {
        setMessage("Deposit confirmed.");
        setCurrentBet(bet);
        setMessage(`Amount deposited: ${bet} ${betWith}`);
        setGameOver(false);

        // Start game with new deck
        const newDeck = generateDeck();
        shuffleDeck(newDeck);
        dealCards(newDeck);
      } else {
        setMessage("Deposit failed.");
      }
    } catch (error) {
      console.error("Deposit error:", error);
      setMessage("Deposit failed.");
    }
  };

  // Generate a deck of cards
  const generateDeck = () => {
    const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
    const suits = ["♦", "♣", "♥", "♠"];
    const newDeck = [];
    for (let i = 0; i < cards.length; i++) {
      for (let j = 0; j < suits.length; j++) {
        newDeck.push({ number: cards[i], suit: suits[j] });
      }
    }
    return newDeck;
  };

  // Deal cards to player and dealer
  const dealCards = (newDeck) => {
    const playerCard1 = newDeck.pop();
    const dealerCard1 = newDeck.pop();
    const playerCard2 = newDeck.pop();
    const dealerCard2 = newDeck.pop();

    const playerStartingHand = [playerCard1, playerCard2];
    const dealerStartingHand = [dealerCard1, dealerCard2];

    setPlayer({
      cards: playerStartingHand,
      count: getCount(playerStartingHand),
    });
    setDealer({ cards: dealerStartingHand, count: getCount([dealerCard1]) });
    setDeck(newDeck);
  };

  // Get the total count of the cards
  const getCount = (cards) => {
    const rearranged = [];
    cards.forEach((card) => {
      if (card.number === "A") {
        rearranged.push(card);
      } else if (card.number) {
        rearranged.unshift(card);
      }
    });

    return rearranged.reduce((total, card) => {
      if (card.number === "J" || card.number === "Q" || card.number === "K") {
        return total + 10;
      } else if (card.number === "A") {
        return total + 11 <= 21 ? total + 11 : total + 1;
      } else {
        return total + card.number;
      }
    }, 0);
  };

  // Start a new game
  const startNewGame = () => {
    const newDeck = generateDeck();
    shuffleDeck(newDeck);
    dealCards(newDeck);
    setCurrentBet(null);
    setGameOver(false);
    setMessage(null);
  };

  // Shuffle the deck
  const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
  };

  // Player hits a card
  const hit = () => {
    if (!gameOver) {
      if (currentBet) {
        const newDeck = [...deck];
        const playerHand = [...player.cards, newDeck.pop()];
        setPlayer({ cards: playerHand, count: getCount(playerHand) });
        setDeck(newDeck);

        if (getCount(playerHand) > 21) {
          setGameOver(true);
          setMessage("Bust! Dealer wins.");
          setInputValue("");
        }
      } else {
        setMessage("Please place bet.");
      }
    } else {
      setMessage("Game over! Please start a new game.");
    }
  };

  // Player stands
  const stand = () => {
    if (!gameOver) {
      let newDeck = [...deck];
      let dealerHand = [...dealer.cards];
      while (getCount(dealerHand) < 17) {
        dealerHand.push(newDeck.pop());
      }

      setDealer({ cards: dealerHand, count: getCount(dealerHand) });
      setDeck(newDeck);
      checkWinner(dealerHand, player.cards);
    } else {
      setMessage("Game over! Please start a new game.");
    }
  };

  // Check the winner
  // Updated checkWinner function
  const checkWinner = (dealerHand, playerHand) => {
    const playerCount = getCount(playerHand);
    const dealerCount = getCount(dealerHand);

    if (dealerCount > 21) {
      // setWallet(wallet + currentBet * 2);
      setMessage("Dealer busts! You win!");
      setIsWinner(true); // Set player as winner
    } else if (playerCount > dealerCount) {
      // setWallet(wallet + currentBet * 2);
      setMessage("You win!");
      setIsWinner(true); // Set player as winner
    } else if (playerCount < dealerCount) {
      setMessage("Dealer wins!");
      setIsWinner(false);
    } else {
      // setWallet(wallet + currentBet);
      setMessage("Push.");
      setIsWinner(false);
    }
    setGameOver(true);
    setInputValue("");
  };

  // Place a bet
  const placeBet = async () => {
    const betAmount = parseFloat(inputValue);
    const algoBalance = accountData ? accountData.amount / 1e6 : 0;
    const phntmBalance = phntmTokenBalance ? phntmTokenBalance / 1e8 : 0;

    if (betWith === "ALGO" && betAmount < 2) {
      setMessage("Min deposit is 2 ALGO.");
      return;
    } else if (betWith === "PHNTM" && betAmount < 0.2) {
      setMessage("Min deposit is 0.2 PHNTM.");
      return;
    } else if (betWith === "ALGO" && betAmount > algoBalance) {
      setMessage("Insufficient ALGO balance.");
      return;
    } else if (betWith === "PHNTM" && betAmount > phntmBalance) {
      setMessage("Insufficient PHNTM balance.");
      return;
    } else if (betAmount <= 0 || isNaN(betAmount)) {
      setError("Invalid bet amount.");
      setMessage("Invalid bet amount.");
      return;
    }

    await handleDeposit();
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    startNewGame();

    if (accountAddress) {
      fetchAccountData();
    }
  }, [accountAddress]);

  useEffect(() => {
    setPhntmTokenBalance(
      accountData?.assets?.find((a) => a["asset-id"] === 1279721720)?.amount
    );
  }, [accountData]);

  const fetchAccountData = async () => {
    setLoading(true);
    try {
      const response = await getUserTokenHolding(accountAddress);
      const data = response;
      if (data.account) {
        setAccountData(data.account);
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (err) {
      setError("Error fetching account data. Please try again.");
      setLoading(false);
    }
  };

  const copyLink = async () => {
    const copyText = `${accountAddress}`;
    await navigator.clipboard.writeText(copyText);
  };

  // Add a function to handle reward claiming
  const handleClaimReward = () => {
    setRewardClaimed(true);
    setCurrentBet(null);
    const rewardAmount = currentBet * 2; // Example reward calculation
    setMessage(`Reward claimed: ${rewardAmount} ${betWith}`);
  };

  return (
    <div
      style={{ minHeight: "80vh", overflow: "hidden" }}
      className="bg-gradient-to-r from-teal-600 to-cyan-300 container mx-auto flex flex-col items-center justify-center p-4 text-white"
    >
      <h1 className="text-3xl text-center mb-2 text-white bg-gradient-to-r from-black to-teal-600 px-4 py-2">
        Blackjack (Not Yet Available)
      </h1>
      {/* Wallet and Bet */}
      <div
        style={{ width: "48em" }}
        className="flex flex-col items-center justify-center shadow-lg p-4"
      >
        {!currentBet && !gameOver && (
          <div
            style={{ wordWrap: "break-word", width: "23em" }}
            className="border border-gray-600 rounded shadow-lg p-4 mb-4 bg-gradient-to-r from-orange-400 to-orange-600 text-black"
          >
            <p>
              <strong>Address:</strong>
              <span>
                <div onClick={copyLink} className="cursor-pointer mt-2 mb-2">
                  <p>{accountData?.address}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-3 w-3 text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
              </span>
            </p>
            <p>
              <strong className="mr-2">Balances:</strong>
            </p>
            <p className="mt-2 mb-2">
              <span>ALGO: {(accountData?.amount / 1e6).toFixed(6)}</span>
            </p>
            <p className="mb-4">
              <span>PHNTM: {(phntmTokenBalance / 1e8).toFixed(8)}</span>
            </p>
            <p className="mb-4 font-bold shadow-lg text-white text-lg border border-gray-600 p-4">
              <span>
                Win gets your deposit back and rewards in $ALGO or $PHNTM
              </span>
            </p>
          </div>
        )}

        {/* Buttons */}
        {currentBet && (
          <div className="flex justify-center mt-4 mb-4 border border-gray-600 rounded shadow-lg p-4">
            {/* <button
              className="bg-gradient-to-r from-blue-400 to-blue-800 px-4 py-2 rounded mx-2"
              onClick={startNewGame}
              disabled={!gameOver}
            >
              New Game
            </button> */}
            <button
              className="bg-gradient-to-r from-red-400 to-red-800 px-4 py-2 rounded mx-2"
              onClick={hit}
              disabled={!currentBet || gameOver}
            >
              Hit
            </button>
            <button
              className="bg-gradient-to-r from-yellow-400 to-yellow-800 px-4 py-2 rounded mx-2"
              onClick={stand}
              disabled={!currentBet || gameOver}
            >
              Stand
            </button>
          </div>
        )}
        {/* Bet selection */}
        {!currentBet && !gameOver && (
          <div className="mb-4 flex flex-col items-center">
            <div className="flex">
              <button
                className={`px-4 py-2 rounded mx-2 ${
                  betWith === "ALGO"
                    ? "text-white bg-gradient-to-r from-black to-gray-500"
                    : "text-black"
                }`}
                onClick={() => setBetWith("ALGO")}
              >
                Deposit ALGO
              </button>
              <button
                className={`px-4 py-2 rounded mx-2 ${
                  betWith === "PHNTM"
                    ? "text-white bg-gradient-to-r from-black to-gray-500"
                    : "text-black"
                }`}
                onClick={() => setBetWith("PHNTM")}
              >
                Deposit PHNTM
              </button>
            </div>
            <input
              type="text"
              className="mt-4 mb-4 border-2 border-gray-300 rounded px-4 py-2 mr-2 bg-gray-200 text-black"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={`Enter ${betWith} amount`}
            />
            <button
              className="bg-gradient-to-r from-green-500 to-white px-4 py-2 rounded text-black"
              onClick={placeBet}
              disabled={true}
            >
              Deposit to play!
            </button>
          </div>
        )}
        <div
          style={{ maxHeight: "25em", maxWidth: "32em" }}
          className={`mt-4 flex flex-col items-center bg-gradient-to-r ${
            message === error
              ? "from-red-400 to-red-800"
              : "from-orange-400 to-orange-600"
          } ${currentBet && "border border-gray-600 rounded shadow-lg p-4"}`}
        >
          {/* Game Messages */}
          {message && <p className="mt-4 mb-4 px-12 py-2">{message}</p>}
          {/* Player's Hand - shown only when there's a bet */}
          {currentBet && (
            <div className="mt-4 mb-4">
              <p className="mb-2">Your Hand ({player.count})</p>
              <div
                style={{ maxWidth: "20em" }}
                className="flex overflow-auto overflow-y-hidden"
              >
                {player.cards.map((card, index) => (
                  <div key={index} className="card mx-1">
                    <p className="mb-2">
                      {card.number} {card.suit}
                    </p>
                    {/* <p className="mb-2"></p> */}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Dealer's Hand - shown only when there's a bet */}
          {currentBet && (
            <div className="mb-4">
              <p className="mb-2">Dealer's Hand ({dealer.count})</p>
              <div className="flex overflow-auto overflow-y-hidden">
                {dealer.cards.map((card, index) => (
                  <div key={index} className="card mx-1">
                    <p className="mb-2">
                      {card.number ? `${card.number} ${card.suit}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Reward Claim Button */}
        {gameOver && isWinner && (
          <button
            onClick={handleClaimReward}
            className="bg-gradient-to-r from-green-500 to-white px-4 py-2 rounded text-black mt-4"
            disabled={rewardClaimed}
          >
            Claim Reward
          </button>
        )}
        {/* Additional game UI as needed */}
      </div>
    </div>
  );
}
