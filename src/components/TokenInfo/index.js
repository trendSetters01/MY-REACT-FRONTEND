import React, { useState, useEffect } from "react";
import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";

import Roadmap from "../RoadMap/index.js";

function TokenInfo({ accountAddress }) {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Token Info");

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
    <div className="container mx-auto px-4 py-8 text-white bg-gradient-to-r from-blue-500 to-purple-600">
      <main>
      {activeTab === "Token Info" && (
          <section className="token-info bg-gradient-to-r from-black to-gray-500 text-white p-6 shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Token Information</h2>
            <iframe
              className="w-full h-screen"
              src="https://allo.info/asset/1279721720/token"
              title="Phantoms Token Info"
            ></iframe>
            <a
              href="https://allo.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline dark:text-blue-400"
            >
              Powered by Allo
            </a>
          </section>
        )}
      </main>
    </div>
  );
}

const StarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-star"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21 12 17.77 5.82 21 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
};

export default TokenInfo;
