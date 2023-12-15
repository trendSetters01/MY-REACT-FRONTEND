import React, { useState } from "react";
import DepositComponent from "./deposit.js";
import GameComponent from "./game.js";
import RewardComponent from "./reward.js";

export default function MainGame({ accountAddress }) {
  const [isDepositConfirmed, setIsDepositConfirmed] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-white">
      {!accountAddress && (
        <h1 className="animate-pulse text-white">
          Connect your wallet to participate.
        </h1>
      )}

      {accountAddress && (
        <div>
          {!isDepositConfirmed ? (
            <DepositComponent
              accountAddress={accountAddress}
              onDepositSuccess={() => setIsDepositConfirmed(true)}
            />
          ) : gameWon ? (
            <RewardComponent accountAddress={accountAddress} />
          ) : (
            <GameComponent onGameWin={() => setGameWon(true)} />
          )}
        </div>
      )}
    </div>
  );
}
