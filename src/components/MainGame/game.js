import React, { useState, useEffect } from "react";
import RewardComponent from "./reward.js";
import Confetti from "react-confetti";

class Card {
  constructor(name, attack, defense, ability = null) {
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.ability = ability;
  }
}

class Player {
  constructor(name, deck) {
    this.shields = 5;
    this.hand = [];
    this.lastStandActivated = false; // Add a flag for the Last Stand mechanic
    this.deck = deck;
    this.name = name;
    this.drawCard();
  }

  getHandDetails() {
    return this.hand
      .map(
        (card) =>
          `${card?.name} (Attack: ${card?.attack}, Defense: ${card?.defense})`
      )
      .join(", ");
  }

  drawCard(numCards = 1) {
    let cardDrawn = null;
    for (let i = 0; i < numCards; i++) {
      const randomIndex = Math.floor(Math.random() * this.deck.length);
      const drawnCard = this.deck[randomIndex];
      cardDrawn = drawnCard;
      this.hand.push(drawnCard);
    }
    return cardDrawn;
  }

  playCard(opponent, playerType) {
    const card = this.hand.pop();
    let event = `Playing ${card?.name} with Attack ${card?.attack} and Defense ${card?.defense}`;

    if (card?.ability) {
      switch (card?.ability) {
        case "protect":
          event += ` - ${card?.name} can protect another card this turn.`;
          break;
        case "drawTwo":
          event += ` - ${card?.name} allows you to draw two additional cards.`;
          this.drawCard();
          this.drawCard();
          break;
        case "boost":
          event += ` - ${card?.name} boosts another card's attack/defense.`;
          break;
        case "unblockable":
          event += ` - ${card?.name} is unblockable this turn.`;
          break;
        case "negate":
          event += ` - ${card?.name} negates an opponent card's ability.`;
          break;
        case "restoreTwo":
          if (this.shields >= 5) {
            event += ` - ${card?.name} tried to restore shields, but you already have ${this.shields} (full shields). No shields were added.`;
          } else {
            let initialShields = this.shields;
            let restoredShields = this.shields == 4 ? 1 : 2;
            this.shields += restoredShields;
            event += ` - ${card?.name} restored ${restoredShields} shield(s). Shields went from ${initialShields} to ${this.shields}.`;
          }
          break;
      }
    }

    this.attack(opponent, card);
  }

  attack(opponent, card) {
    if (card?.ability === "unblockable") {
      opponent.shields--;
      return;
    }

    if (opponent.hand.length === 0) {
      opponent.shields--;
      return;
    }
    const opponentCardIndex = Math.floor(Math.random() * opponent.hand.length);
    const opponentCard = opponent.hand[opponentCardIndex];

    if (card?.attack > opponentCard?.defense) {
      opponent.shields--;

      // Remove the defeated card from opponent's hand after logging about it
      opponent.hand.splice(opponentCardIndex, 1);
    } else {
    }
  }
}

export default function GameComponent({ onDepositSuccess, accountAddress }) {
  const [deck, setDeck] = useState([
    new Card("Guardian", 2, 7, "protect"),
    new Card("Harbinger", 5, 5, "drawTwo"),
    new Card("Enchanter", 4, 3, "boost"),
    new Card("Phantom", 6, 2, "unblockable"),
    new Card("Tank", 3, 8),
    new Card("Warlord", 7, 7),
    new Card("Spellbane", 5, 5, "negate"),
    new Card("Rejuvenator", 2, 4, "restoreTwo"),
  ]); // Initialize with Card instances
  const [gameButton, setGameButton] = useState("Start Game");
  const [gameLog, setGameLog] = useState([]);
  const [userLog, setUserLog] = useState([]);
  const [aiLog, setAILog] = useState([]);
  const [isGameActive, setIsGameActive] = useState(true);
  const [finalResult, setFinalResult] = useState("");
  const [gameWon, setGameWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const addGameLog = (message) => {
    setGameLog((prevLog) => [...prevLog, message]);
  };
  const addUserLog = (message) => {
    setUserLog((prevLog) => [...prevLog, message]);
  };
  const addAILog = (message) => {
    setAILog((prevLog) => [...prevLog, message]);
  };

  const playTurn = (player, opponent, turn) => {
    const cardPlayed = player.drawCard();
    let logMessage = `Turn ${turn}: ${player.name} plays ${cardPlayed.name}`;
    player.playCard(
      opponent,
      cardPlayed,
      (message) => (logMessage += ` - ${message}`)
    );
    logMessage += `. Shields left: ${player.shields}`;

    player.name === "User" ? addUserLog(logMessage) : addAILog(logMessage);
  };

  const startGame = () => {
    setIsGameActive(true);
    setGameLog([]);
    setUserLog([]);
    setAILog([]);
    setFinalResult("what??");

    const player = new Player("User", deck.slice());
    const ai = new Player("AI", deck.slice());

    for (let turn = 1; turn <= 15; turn++) {
      playTurn(player, ai, turn);
      playTurn(ai, player, turn);

      // Check for endgame conditions
      if (player.shields <= 0 || ai.shields <= 0) {
        break;
      }
    }

    const result = player.shields > ai.shields ? "You win!" : "You lose!";
    setFinalResult(result);
    console.log("result", result);
    if (result === "You win!") {
      setGameWon(true);
      setShowConfetti(true);
    }

    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    // else {
    //   setTimeout(() => {
    //     onDepositSuccess();
    //   }, 5000);
    // }
    setGameButton("Thanks for playing the Game");
    setIsGameActive(false);
  };

  return (
    <div
      style={{ height: "80vh" }}
      className="flex flex-col items-center justify-center"
    >
      {showConfetti && <Confetti width={window.width} height={window.height} />}
      {accountAddress && (
        <div className="w-full max-w-4xl bg-light rounded-lg p-4 text-white">
          {!(aiLog.length > 0) && !(userLog.length > 0) && (
            <div>
              <h1 className="text-4xl text-center font-bold text-white mb-8 w-80">
                Welcome To Cards RPG!
              </h1>
              <p className="mb-4 w-80">
                An evolving auto play rpg. You will play against an AI. If you
                win, you will be rewarded with 1 Reedemable NFT, for future
                prizes, When the game comes out of test phase.....
              </p>
            </div>
          )}
        </div>
      )}
      <div>
        {aiLog.length > 0 && userLog.length > 0 && (
          <div className="flex flex-row mb-4">
            <div className="flex-1 text-center px-2">
              <h3 className="text-lg font-semibold">User Actions</h3>
              <div className="bg-gray-800 border border-gray-600 rounded shadow-lg p-4 overflow-y-scroll h-80">
                {userLog.map((log, index) => (
                  <p
                    key={index}
                    className="text-white border border-green-600 rounded"
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex-1 text-center px-2">
              <h3 className="text-lg font-semibold">AI Actions</h3>
              <div className="bg-gray-800 border border-gray-600 rounded shadow-lg p-4 overflow-y-scroll h-80">
                {aiLog.map((log, index) => (
                  <p
                    key={index}
                    className="text-white border border-red-600 rounded"
                  >
                    {log}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mb-12">
        <button
          onClick={startGame}
          className="input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md"
          disabled={!isGameActive}
        >
          {gameButton}
        </button>
        {finalResult && (
          <div className="text-center text-lg font-bold">{finalResult}</div>
        )}
        {gameWon && (
          <RewardComponent
            accountAddress={accountAddress}
            onRewardSuccess={() => setGameWon(false)}
          />
        )}
      </div>
    </div>
  );
}
