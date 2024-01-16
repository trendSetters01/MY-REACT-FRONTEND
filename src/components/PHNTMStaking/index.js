import React, { useState, useEffect } from "react";
import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";

import Roadmap from "../RoadMap/index.js";

function PHNTMStaking({ accountAddress }) {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("PHNTM Staking");

  useEffect(() => {
    if (accountAddress) {
      fetchAccountData();
    }
  }, [accountAddress]);

  const fetchAccountData = async () => {
    setLoading(true);
    try {
      const response = await getUserTokenHolding(accountAddress);
      setAccountData(response.account ? response.account : null);
      setError(response.message ? response.message : null);
      setLoading(false);
    } catch (err) {
      setError("Error fetching account data. Please try again.");
      setLoading(false);
    }
  };

  return (
    // <div className="container mx-auto px-4 py-8 text-white bg-gradient-to-r from-blue-500 to-purple-600">
    <div>
      {activeTab === "PHNTM Staking" && (
        <section className="bg-gradient-to-r from-black to-gray-500 text-white shadow-lg rounded-lg">
          <h1 className="animate-pulse text-red-500 p-4">
            Cometa Hub's wallet connect is a diiferent session then the one on
            this website. Please connect your wallet to Cometa Hub. Click the
            Connect Wallet button, to interact with their transactions.
          </h1>
          <iframe
            className="w-full h-screen"
            src="https://app.cometa.farm/stake"
            title="Phantoms Staking"
          ></iframe>
          <a
            href="https://app.cometa.farm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Powered by Cometa Hub
          </a>
        </section>
      )}
    </div>
  );
}

export default PHNTMStaking;
