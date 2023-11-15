import React, { useState, useEffect } from "react";
import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";

function DisplayAccountInformation({ accountAddress }) {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accountAddress) {
      fetchAccountData();
    }
  }, [accountAddress]);

  const fetchAccountData = async () => {
    setLoading(true);
    try {
      const response = await getUserTokenHolding(
        accountAddress
      );
      console.log(response);
      const data = response;
      if (data.account) {
        setAccountData(data.account);
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch account data:", err);
      setError("Error fetching account data. Please try again.");
      setLoading(false);
    }
  };

  function extractIPFSHash(ipfsUrl) {
    const prefix = "ipfs://";
    if (ipfsUrl.startsWith(prefix)) {
      return ipfsUrl.slice(prefix.length);
    } else {
      throw new Error("Invalid IPFS URL");
    }
  }

  return (
    <div>
      {loading && <p>Loading account data...</p>}
      {error && <p>Error: {error}</p>}
      {accountData && (
        <div>
          <h2>Account Information</h2>
          <p>Address: {accountData.address}</p>
          <p>Amount: {accountData.amount}</p>
        </div>
      )}
    </div>
  );
}

export default DisplayAccountInformation;
