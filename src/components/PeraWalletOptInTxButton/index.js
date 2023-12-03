import { useState, useContext } from "react";
import { PeraWalletContext } from "../PeraWalletContext"; // Import the context
import { optIn } from "../../algorand/opt-in.js";

import { algodClient } from "../../algorand/config.js";

export default function PeraWalletOptInButton({ accountAddress }) {
  const [optInStatus, setOptInStatus] = useState(null);

  const peraWallet = useContext(PeraWalletContext);

  async function optInButton() {
    setOptInStatus("Processing...");
    try {
      const txn = await optIn(accountAddress, "1247018740");
      const signedTx = await peraWallet.signTransaction([txn]);
      
      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();

      console.log("Transaction ID:", txConfirmation.txId);
      setOptInStatus("Opt-in successful");
      setTimeout(() => {
        setOptInStatus(null);
      }, 5000);
    } catch (error) {
      console.log("Couldn't sign Opt-in txns", error);
      setOptInStatus("Opt-in failed");
      setTimeout(() => {
        setOptInStatus(null);
      }, 5000);
    }
  }

  return (
    <>
      <button className="Wallet-connect" onClick={optInButton}>
        Opt-in
      </button>
      {optInStatus && <p>{optInStatus}</p>}
    </>
  );
}
