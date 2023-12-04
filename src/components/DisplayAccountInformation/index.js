import React, { useState, useEffect } from "react";
import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";

export default function DisplayAccountInformation({
  connectedAccountAddress,
  accountAddress,
}) {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accountAddress) {
      fetchAccountData();
    }
  }, [accountAddress, connectedAccountAddress]);

  const fetchAccountData = async () => {
    setLoading(true);
    try {
      const response = await getUserTokenHolding(accountAddress);
      const data = response;
      if (data.account) {
        setAccountData(data.account);
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (err) {
      setError("Error fetching account data. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center fade-in text-white h-screen">
      {loading && <p className="text-center">Loading account data...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!connectedAccountAddress && (
        <h1 className="animate-pulse">
          Connect your wallet to see your account information.
        </h1>
      )}
      <div className="flex flex-col items-center">
        {accountData && connectedAccountAddress && (
          <div
            style={{ wordWrap: "break-word" }}
            className="mt-4 p-4 bg-gray-800 border border-gray-600 rounded shadow-lg max-w-lg w-full"
          >
            <h2 className="text-2xl font-bold mb-4">Account Information</h2>
            <p>
              <strong className="text-gray-300">Address:</strong>{" "}
              <span className="text-gray-400">{accountData.address}</span>
            </p>
            <p>
              <strong className="text-gray-300">Balance:</strong>{" "}
              <span className="text-gray-400">
                {(accountData.amount / 1e6).toFixed(6)} ALGO
              </span>
            </p>
            <h3 className="text-lg font-semibold text-gray-300 mt-4">
              Assets:
            </h3>
            <ul className="list-disc pl-8 text-gray-400 overflow-auto max-h-64">
              {accountData.assets.map((asset, index) => (
                <li key={index}>
                  <a
                    href={`https://algoexplorer.io/asset/${asset["asset-id"]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    <img
                      src={`https://asa-list.tinyman.org/assets/${asset["asset-id"]}/icon.png`}
                      className="h-6 w-6 mr-2"
                    />
                    Asset ID: {asset["asset-id"]}, Amount: {asset.amount}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
