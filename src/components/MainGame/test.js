import React, { useState, useEffect } from "react";
import RewardComponent from "./reward.js";
import Confetti from "react-confetti";
import AIUrl from "../../images/c7d87778-7d09-4f27-98df-683065f9d9ef.webp";
import PlayerUrl from "../../images/405c177eb8e44ce2c32cf891b78f7125.webp";

export default function TestGame({ accountAddress }) {
  // Example full deck
  const fullDeck = [
    { name: "Guardian", attack: 2, defense: 1, ability: "protect" },
    { name: "Harbinger", attack: 1, defense: 5, ability: "drawTwo" },
    { name: "Enchanter", attack: 3, defense: 3, ability: "boost" },
    { name: "Berserker", attack: 1, defense: 1, ability: "unblockable" },
    { name: "Sage", attack: 3, defense: 2, ability: "negate" },
    { name: "Paladin", attack: 2, defense: 1, ability: "destroy" },
    { name: "Mystic", attack: 2, defense: 4, ability: "heal" },
    { name: "Warrior", attack: 4, defense: 2, ability: "rage" },
    { name: "Assassin", attack: 5, defense: 1, ability: "stealth" },
    { name: "Elementalist", attack: 3, defense: 3, ability: "elementalShift" },
    { name: "Archer", attack: 3, defense: 2, ability: "pierce" },
    { name: "Sorcerer", attack: 2, defense: 3, ability: "spellbind" },
    { name: "Necromancer", attack: 2, defense: 4, ability: "revive" },
    { name: "Druid", attack: 1, defense: 5, ability: "nature'sGift" },
    { name: "Knight", attack: 4, defense: 3, ability: "fortify" },
    { name: "Rogue", attack: 4, defense: 1, ability: "backstab" },
    { name: "Cleric", attack: 1, defense: 4, ability: "bless" },
    { name: "Summoner", attack: 3, defense: 2, ability: "summon" },
    { name: "Alchemist", attack: 2, defense: 2, ability: "transmute" },
    { name: "Valkyrie", attack: 3, defense: 3, ability: "skyStrike" },
    { name: "Monk", attack: 2, defense: 3, ability: "innerPeace" },
    { name: "Barbarian", attack: 5, defense: 2, ability: "frenzy" },
    { name: "Vampire", attack: 3, defense: 1, ability: "lifeDrain" },
    { name: "Wizard", attack: 2, defense: 2, ability: "arcaneBlast" },
    { name: "Templar", attack: 3, defense: 3, ability: "holyLight" },
    { name: "Shaman", attack: 2, defense: 4, ability: "spiritTalk" },
    { name: "Pirate", attack: 3, defense: 2, ability: "plunder" },
  ];

  // Shuffle Deck Function
  const shuffleDeck = (deck) => {
    let shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    return shuffledDeck;
  };

  // Shuffle the deck and distribute the cards
  const shuffledDeck = shuffleDeck(fullDeck);
  const playerCards = shuffledDeck.slice(0, 13);
  const AICards = shuffledDeck.slice(13, 26);

  // Example deck initialization
  const playerDeck = [...playerCards];
  const AIDeck = [...AICards];

  const [players, setPlayers] = useState([
    {
      name: "You",
      hand: [...playerDeck.slice(0, 2)],
      shields: 15,
      drawCard: function () {
        while (this.hand.length < 2) {
          const randomIndex = Math.floor(Math.random() * playerDeck.length);
          const drawnCard = playerDeck[randomIndex];
          this.hand.push(drawnCard);
        }
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
      name: "Annihilus",
      hand: [...AIDeck.slice(0, 2)],
      shields: 25,
      drawCard: function () {
        while (this.hand.length < 2) {
          const randomIndex = Math.floor(Math.random() * AIDeck.length);
          const drawnCard = AIDeck[randomIndex];
          this.hand.push(drawnCard);
        }
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
  const [gameOver, setGameOver] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [winner, setWinner] = useState(null);
  const [turnCount, setTurnCount] = useState(0); // State for tracking the number of turns
  const [gameButton, setGameButton] = useState("Start Game");

  const aiSelectCard = (hand) => {
    const randomIndex = Math.floor(Math.random() * hand.length);
    return randomIndex; // Annihilus selects a card at random
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
      // Replenish the hand
      player.drawCard();

      // Switch turns and replenish the hand of the next player
      const nextPlayerIndex = (playerIndex + 1) % players.length;
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

      // Generate a random delay between 1 to 5 seconds
      const delay = Math.random() * (3000 - 500) + 1000;

      setTimeout(() => {
        handleCardClick(1, cardIndex);
      }, delay);
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
            <h1 className="text-xl text-center font-bold text-white">
              Welcome To Cards RPG!
            </h1>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center text-white bg-gray-900">
        {showConfetti && winner === "You" && (
          <Confetti width={window.width} height={window.height} />
        )}
        <h1 className="text-xl mb-4">Defend the shield of the Phantoms!</h1>
        <h1 className="mb-2">( Best of 24 rounds )</h1>
        <div>
          {gameOver &&
            players.map((player, playerIndex) => (
              <div>
                {playerIndex === 0 && winner === "You" && (
                  <div
                    className={`transition duration-500 ease-in-out ${
                      currentTurn === playerIndex
                        ? "transform scale-110 mb-2 mt-2"
                        : ""
                    } ${
                      playerIndex === 0
                        ? "bg-yellow-500 rounded-sm px-2 py-1 shadow-lg"
                        : "bg-purple-500 rounded-sm px-2 py-1 shadow-lg"
                    }`}
                  >
                    <div className="mt-2 items-center">
                      <img
                        src={`${playerIndex === 0 ? PlayerUrl : AIUrl}`}
                        alt="Player Image"
                        className={`max-w-xs rounded-lg h-28 sm:h-28 md:h-24 lg:h-24`}
                      />
                    </div>
                    <h2 className="text-md font-bold">{`${
                      playerIndex === 0 ? "You" : "Annihilus"
                    }`}</h2>
                    <p className="text-2xl">
                      Shields:{" "}
                      {playerIndex === 0
                        ? players[0].shields
                        : players[1].shields}
                    </p>
                  </div>
                )}
                {playerIndex === 1 && winner === "Annihilus" && (
                  <div
                    className={`transition duration-500 ease-in-out ${
                      currentTurn === playerIndex
                        ? "transform scale-110 mb-2 mt-2"
                        : ""
                    } ${
                      playerIndex === 0
                        ? "bg-yellow-500 rounded-sm px-2 py-1 shadow-lg"
                        : "bg-purple-500 rounded-sm px-2 py-1 shadow-lg"
                    }`}
                  >
                    <div className="mt-2 items-center">
                      <img
                        src={`${playerIndex === 0 ? PlayerUrl : AIUrl}`}
                        alt="Player Image"
                        className={`max-w-xs rounded-lg h-28 sm:h-28 md:h-24 lg:h-24`}
                      />
                    </div>
                    <h2 className="text-md font-bold">{`${
                      playerIndex === 0 ? "You" : "Annihilus"
                    }`}</h2>
                    <p className="text-2xl">
                      Shields:{" "}
                      {playerIndex === 0
                        ? players[0].shields
                        : players[1].shields}
                    </p>
                  </div>
                )}
              </div>
            ))}
          {!gameOver &&
            players.map((player, playerIndex) => (
              <div>
                <div
                  className="flex flex-col items-center justify-center"
                  key={playerIndex}
                >
                  <div
                    className={`transition duration-500 ease-in-out ${
                      currentTurn === playerIndex
                        ? "transform scale-110 mb-2 mt-2"
                        : ""
                    } ${
                      playerIndex === 0
                        ? "bg-yellow-500 rounded-sm px-2 py-1 shadow-lg"
                        : "bg-purple-500 rounded-sm px-2 py-1 shadow-lg"
                    }`}
                  >
                    <div className="mt-2 items-center">
                      <img
                        src={`${playerIndex === 0 ? PlayerUrl : AIUrl}`}
                        alt="Player Image"
                        className={`max-w-xs rounded-lg h-12 sm:h-12 md:h-12 lg:h-12`}
                      />
                    </div>
                    <h2 className="text-md font-bold">{`${
                      playerIndex === 0 ? "You" : "Annihilus"
                    }`}</h2>
                    <p className="text-2xl">
                      Shields:{" "}
                      {playerIndex === 0
                        ? players[0].shields
                        : players[1].shields}
                    </p>
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    {player.hand.map((card, cardIndex) => (
                      <button
                        onClick={() => handleCardClick(playerIndex, cardIndex)}
                        className={`transform transition-all duration-300 border m-2 p-2 ${
                          currentTurn === playerIndex
                            ? "bg-green-500"
                            : "bg-red-500"
                        } active:scale-90`}
                        disabled={player.name === "Annihilus" || gameOver}
                      >
                        {card?.name} (Attack: {card?.attack}, Defense:{" "}
                        {card?.defense})
                      </button>
                    ))}
                  </div>
                </div>

                {playerIndex === 0 && <hr className="m-2" />}
              </div>
            ))}
        </div>
        {turnCount <= 24 && (
          <div className="flex flex-col items-center text-white">
            <div className="mb-2">Round Count: {turnCount}</div>
          </div>
        )}
        {gameOver && (
          <div className="flex flex-col items-center text-white">
            {winner !== "You" && <div className="mb-2">Game Over !</div>}
            {winner === "You" ? (
              <div className={winner === "You" ? "mt-4" : "mb-2"}>
                Congratulations You Won!
              </div>
            ) : (
              <div className={winner === "You" ? "mt-4" : "mb-2"}>
                Try Again Next Time! Annihilus Won!
              </div>
            )}
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
