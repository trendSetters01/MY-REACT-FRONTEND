import React, { useState, useEffect } from "react";

// Example card initialization
function initializeDeck() {
  return ["Card1", "Card2", "Card3", "Card4", "Card5"];
}

function distributeCards(deck) {
  const midIndex = Math.ceil(deck.length / 2);
  return {
    initializedUserCards: deck.slice(0, midIndex),
    initializedAiCards: deck.slice(midIndex),
  };
}

function calculateScore(card) {
  // Implement scoring logic based on the card
  return Math.floor(Math.random() * 10); // Example scoring
}

function Card() {
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [turnNumber, setTurnNumber] = useState(1);
  const [turnResult, setTurnResult] = useState("Noting Yet");
  const [finalResult, setFinalResult] = useState("Win/Lose/Draw");
  const { initializedUserCards, initializedAiCards } = distributeCards(
    initializeDeck()
  );
  const totalTurns = 15;
  // Function to handle user's action
  const handleUserTurn = (card) => {
    // Implement user's turn logic here
    // Update user's cards, scores, etc.
    // Switch to AI's turn
    setIsUserTurn(false);
  };

  // Function to simulate AI's turn
  const aiTurn = () => {
    // AI logic goes here
    // Update AI's cards, scores, etc.
    // Switch back to user's turn
    setIsUserTurn(true);
    if (turnNumber < totalTurns) {
      setTurnNumber(turnNumber + 1);
    }
  };

  useEffect(() => {
    if (!isUserTurn) {
      // Simulate a delay for AI's turn
      setTimeout(aiTurn, 1000);
    }
  }, [isUserTurn, turnNumber]);

  return (
    <div
      className="flex flex-col items-center justify-center text-white"
    >
      <div className={`turn-container ${isUserTurn ? "user-turn" : "ai-turn"}`}>
        {/* Display user and AI cards here */}
        {isUserTurn ? <div>User's Turn</div> : <div>AI's Turn</div>}
      </div>
      {isUserTurn && (
        <div className="user-cards ml-4 mb-2">
          {initializedUserCards.map((card, index) => (
            <button
              className="mt-2 mr-4"
              key={index}
              onClick={() => handleUserTurn(card)}
            >
              {card}
            </button>
          ))}
        </div>
      )}
      <div>
        Turn: {turnNumber} / {totalTurns}
      </div>
      <div className="ml-2 mt-2">Turn Result: {turnResult}</div>
      <div className="ml-2 mt-2">Final Result: {finalResult}</div>
    </div>
  );
}

export default Card;
