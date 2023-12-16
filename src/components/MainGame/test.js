import React, { useState, useEffect } from "react";
import RewardComponent from "./reward.js";
import Confetti from "react-confetti";

export default function TestGame({ accountAddress }) {
  // Example deck initialization
  const initialDeck = [
    // { name: "Guardian", attack: 2, defense: 1, ability: "protect" },
    // { name: "Harbinger", attack: 1, defense: 5, ability: "drawTwo" },
    // { name: "Enchanter", attack: 3, defense: 3, ability: "boost" },
    { name: "Berserker", attack: 1, defense: 1, ability: "unblockable" },
    { name: "Sage", attack: 3, defense: 2, ability: "negate" },
    { name: "Paladin", attack: 2, defense: 1, ability: "restoreTwo" },
    // Add more cards as needed
  ];

  const [players, setPlayers] = useState([
    {
      name: "You",
      hand: [...initialDeck],
      shields: 5,
      drawCard: function () {
        const randomIndex = Math.floor(Math.random() * initialDeck.length);
        const drawnCard = initialDeck[randomIndex];
        return drawnCard;
      },
      attack: (playerIndex, attackPower, defensePower) => {
        players[playerIndex].shields -= attackPower;
        if (playerIndex === 0) {
          players[playerIndex + 1].shields += defensePower;
        } else {
          players[playerIndex - 1].shields += defensePower;
        }
      },
    },
    {
      name: "AI",
      hand: [...initialDeck],
      shields: 5,
      drawCard: function () {
        const randomIndex = Math.floor(Math.random() * initialDeck.length);
        const drawnCard = initialDeck[randomIndex];
        return drawnCard;
      },
      attack: (playerIndex, attackPower, defensePower) => {
        players[playerIndex].shields -= attackPower;
        if (playerIndex === 0) {
          players[playerIndex + 1].shields += defensePower;
        } else {
          players[playerIndex - 1].shields += defensePower;
        }
      },
    },
  ]);
  const [currentTurn, setCurrentTurn] = useState(0); // Index of the current player
  const [selectedCard, setSelectedCard] = useState(null); // State for selected card
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [winner, setWinner] = useState(null);
  const [turnCount, setTurnCount] = useState(0); // State for tracking the number of turns
  const [gameButton, setGameButton] = useState("Start Game");

  const aiSelectCard = (hand) => {
    const randomIndex = Math.floor(Math.random() * hand.length);
    return randomIndex; // AI selects a card at random
  };

  const checkEndGame = () => {
    // Check if any player's shields are 0 or below
    players.forEach((player, index) => {
      if (player.shields <= 0) {
        setGameOver(true);
        setWinner(players[(index + 1) % players.length].name);
        return;
      }
    });

    // Check if turn count exceeds 24
    if (turnCount >= 24) {
      setGameOver(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      setGameButton("Thanks for playing the Game");
      // Determine the winner based on who has the most shields
      const winnerPlayer = players.reduce((prev, current) =>
        prev.shields > current.shields ? prev : current
      );
      setWinner(winnerPlayer.name);
    }
  };

  const handleCardClick = (playerIndex, cardIndex) => {
    const player = players[playerIndex];
    // const selectedCard = player.hand[cardIndex];

    // Only allow the current player to play a card
    if (currentTurn !== playerIndex || player.shields <= 0) return;

    try {
      if (playerIndex === 0) {
        player.attack(
          playerIndex + 1,
          player.hand[cardIndex].attack,
          player.hand[cardIndex].defense
        );
      } else {
        player.attack(
          playerIndex - 1,
          player.hand[cardIndex].attack,
          player.hand[cardIndex].defense
        );
      }
      player.hand.splice(cardIndex, 1);
      console.log("Before Drawing card", player.hand);
      if (player.hand.length < 2) {
        player.hand.push(player.drawCard(cardIndex));
      }
      if (player.hand[cardIndex].ability === "drawTwo") {
        player.hand.push(player.drawCard(cardIndex));
      }
      console.log("Drawing card", player.hand);

      // Replenish the hand of the player who just played
      // players[playerIndex].replenishHand();

      // Switch turns and replenish the hand of the next player
      const nextPlayerIndex = (playerIndex + 1) % players.length;
      console.log("Next Player Index", currentTurn, nextPlayerIndex);
      setCurrentTurn(nextPlayerIndex);
      setTurnCount((prevCount) => prevCount + 1); // Increment turn count
      // players[nextPlayerIndex].replenishHand();

      // Update the state to reflect these changes
      setPlayers([...players]);

      // Check for endgame condition (e.g., if opponent's shields are 0)
      checkEndGame();
    } catch (error) {}
  };

  useEffect(() => {
    if (currentTurn === 1 && !gameOver) {
      const cardIndex = aiSelectCard(players[1].hand);
      handleCardClick(1, cardIndex);
    }
  }, [currentTurn, players, gameOver, turnCount]);

  return (
    // Add a closing parenthesis and semicolon here
    <div
      style={{ height: "80vh" }}
      className="flex flex-col items-center justify-center"
    >
      {!accountAddress && (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl bg-light rounded-lg p-4 text-white">
          <div>
            <h1 className="text-4xl text-center font-bold text-white mb-2">
              Welcome To Cards RPG!
            </h1>
            {/* <p className="mb-2 w-96">
              An evolving auto play rpg. You will play against an AI. If you
              win, you will be rewarded with 1 Reedemable NFT, for future
              prizes.
            </p> */}
          </div>
        </div>
      )}
      <div className="flex flex-col items-center text-white bg-gray-900">
        {showConfetti && winner === "You" && (
          <Confetti width={window.width} height={window.height} />
        )}
        <h1 className="mb-2">Test Card Game</h1>
        <h1 className="mb-2">( Best of 24 rounds )</h1>
        <div>
          {!gameOver &&
            players.map((player, playerIndex) => (
              <div
                className="flex flex-col items-center justify-center"
                key={playerIndex}
              >
                <h2>
                  {player.name} - Shields: {player.shields}
                </h2>
                <div className="flex flex-row items-center justify-center">
                  {player.hand.map((card, cardIndex) => (
                    <button
                      key={cardIndex}
                      onClick={() => handleCardClick(playerIndex, cardIndex)}
                      className={`border m-2 p-2 ${
                        // player.name === "AI"
                        //   ? "bg-red-500"
                        //   :
                        currentTurn === playerIndex
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                      disabled={gameOver}
                      // disabled={player.name === "AI" || gameOver}
                    >
                      {card?.name} (Attack: {card?.attack}, Defense:
                      {card?.defense})
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </div>
        {turnCount < 24 && (
          <div className="flex flex-col items-center text-white">
            {/* <div>Current Turn: {players[currentTurn].name}</div> */}
            <div className="mb-2">Round Count: {turnCount}</div>
          </div>
        )}
        {gameOver && (
          <div class="flex flex-col items-center text-white">
            <div className="mb-2">Game Over !</div>
            <div className="mb-2">Winner: {winner}</div>
            {winner === "You" && (
              <RewardComponent
                accountAddress={accountAddress}
                onRewardSuccess={() => setGameOver(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
