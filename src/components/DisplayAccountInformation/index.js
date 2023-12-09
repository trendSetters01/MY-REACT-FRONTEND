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

  const copyLink = async () => {
    const copyText = `${connectedAccountAddress}`;
    await navigator.clipboard.writeText(copyText);
    alert("Copied: " + copyText);
  };

  return (
    <div className="pt-16 container mx-auto fade-in text-white h-screen">
      {loading && <p className="text-center">Loading account data...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!connectedAccountAddress && (
        <h1 className="flex justify-center animate-pulse">
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
              <span className="text-gray-400">
                <div onClick={copyLink} className="cursor-pointer mt-4 mb-4">
                  <p>{accountData.address}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
              </span>
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
