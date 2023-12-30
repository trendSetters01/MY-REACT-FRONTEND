import React, { useState } from "react";
import DepositComponent from "./deposit.js";
import Cardsrpg from "./cardsrpg.js";

export default function MainGame({ accountAddress }) {
  const [isDepositConfirmed, setIsDepositConfirmed] = useState(false);

  return (
    <div
      style={{ height: "80vh" }}
      className="flex flex-col items-center justify-center text-white"
    >
      {!accountAddress && (
        // <h1 className="animate-pulse text-white">
        //   Connect your wallet to participate.
        // </h1>
        <h1 className="animate-pulse text-white">Under Construction</h1>
      )}

      {accountAddress && (
        <div className="flex items-center justify-center">
          {/* {!isDepositConfirmed ? (
            <DepositComponent
              accountAddress={accountAddress}
              onDepositSuccess={() => setIsDepositConfirmed(true)}
            />
          ) : (
            <Cardsrpg accountAddress={accountAddress} />
          )} */}
          <h1 className="animate-pulse text-white">Under Construction</h1>
        </div>
      )}
    </div>
  );
}
