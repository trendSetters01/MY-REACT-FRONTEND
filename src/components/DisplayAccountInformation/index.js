import React, { useState, useEffect } from "react";
import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";
import PeraWalletButton from "../PeraWalletButton";

export default function DisplayAccountInformation({
  setConnectedAccountAddress,
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
    <div className="container mx-auto p-4 fade-in text-black dark:text-white">
      {loading && <p className="text-center">Loading account data...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}

      <div className="flex flex-col items-center">
        <PeraWalletButton onConnect={setConnectedAccountAddress} />

        {accountData && connectedAccountAddress && (
          <div style={{overflowWrap:"break-word"}} className="mt-4 p-4 border border-gray-200 overflow-auto rounded shadow-md max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Account Information</h2>
            <p><strong>Address:</strong> {accountData.address}</p>
            <p><strong>Amount:</strong> {accountData.amount}</p>
            <div className="text-gray-800 overflow-auto">
              <strong className="text-white">Account Data:</strong>
              <pre className="text-gray-800 bg-gray-100 p-2 rounded mt-2 text-sm overflow-auto max-h-64">
                {JSON.stringify(accountData, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
