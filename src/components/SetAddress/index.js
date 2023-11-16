import React, { useState, useEffect } from "react";
import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";
// import { handleSetaddress } from "../../handlers/commandHandlers/setaddress.js";
function SetAddress({ accountAddress }) {
  const [accountData, setAccountData] = useState(null);
  const [address, setaddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showing, setShow] = useState(true);

  useEffect(() => {
    if (accountAddress) {
      fetchAccountData();
    }
  }, [accountAddress]);

  const fetchAccountData = async () => {
    setLoading(true);
    try {
      const response = await getUserTokenHolding(accountAddress);
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

  const handleSetaddress = ({ address, userId }) => {
    try {
      showing ? setShow(false) : setShow(true);
      return showing?<div>Thanks For Registaring</div>:<></>;
    } catch (error) {
      console.error("Error with upsert operation:", error);
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
    <div className="fade-in margin-50 text-black dark:text-white">
      {loading && <p>Loading account data...</p>}
      {error && <p>Error: {error}</p>}
      {accountData && (
        <div className="text-black dark:text-white">
          <button
            className="btn btn-primary"
            onClick={() =>
              setaddress(
                handleSetaddress({ address: accountAddress, userId: 1 })
              )
            }
          >
           { showing?<div>Register your Algorand Address</div>:<h1>Unregister</h1>}
          </button>
          <h1>{address}</h1>
        </div>
      )}
    </div>
  );
}

export default SetAddress;
