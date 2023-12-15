import React, { useState } from "react";
import DepositComponent from "./deposit.js";
import GameComponent from "./game.js";

export default function MainGame({ accountAddress }) {
  const [isDepositConfirmed, setIsDepositConfirmed] = useState(false);

  return (
    <div
      style={{ height: "80vh" }}
      className="flex items-center justify-center text-white"
    >
      {!accountAddress && (
        <h1 className="animate-pulse text-white">
          Connect your wallet to participate.
        </h1>
      )}

      {accountAddress && (
        <div className="flex items-center justify-center">
          {!isDepositConfirmed ? (
            <DepositComponent
              accountAddress={accountAddress}
              onDepositSuccess={() => setIsDepositConfirmed(true)}
            />
          ) : (
            <GameComponent
              accountAddress={accountAddress}
              onDepositSuccess={() => setIsDepositConfirmed(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}
