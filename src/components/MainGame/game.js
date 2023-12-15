import React from 'react';
import StoryTelling from './storyTelling.js';

export default function GameComponent({ onGameWin }) {
    // Placeholder function to simulate a game win condition
    const winGame = () => {
        onGameWin(); // Call the passed in onGameWin function when the game is won
    };

    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Phantom Game</h2>
            <StoryTelling />
        </div>
    );
}
