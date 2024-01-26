import React, { useState } from "react";
import DepositComponent from "./deposit.js";
import Cardsrpg from "./cardsrpg.js";

export default function MainGame({ accountAddress }) {
  const [isDepositConfirmed, setIsDepositConfirmed] = useState(false);

  return (
    <div
      style={{ wordWrap: "break-word", maxHeight: "100vh",  minHeight: "64vh", maxWidth: "100vw" }}
      className="flex flex-col items-center justify-center text-white"
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
            <Cardsrpg accountAddress={accountAddress} />
          )}
        </div>
      )}
    </div>
  );
}
