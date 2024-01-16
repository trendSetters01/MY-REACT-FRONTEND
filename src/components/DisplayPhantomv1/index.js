import React, { useState, useEffect } from "react";
import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";

function DisplayPhantomv1({ accountAddress }) {
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

  function extractIPFSHash(ipfsUrl) {
    const prefix = "ipfs://";
    if (ipfsUrl.startsWith(prefix)) {
      return ipfsUrl.slice(prefix.length);
    } else {
      throw new Error("Invalid IPFS URL");
    }
  }

  return (
    <div className="fade-in text-center text-white dark:text-white">
      {loading && <p>Loading account data...</p>}
      {error && <p>Error: {error}</p>}
      {accountData && (
        <div className="text-white dark:text-white">
          <h1>Phantom V1</h1>
          <h3>Account Information</h3>
          Address:
          <a
            className="text-white underline dark:text-white"
            href={`https://allo.info/address/${accountData.address}`}
            target="_blank"
            rel="noreferrer"
          >
            <p style={{ wordBreak: "break-word" }}>{accountData.address}</p>
          </a>
          <br />
        </div>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(8, 1fr)",
          gap: "2px",
        }}
      >
        {accountData &&
          accountData["created-assets"].map((asset, index) => (
            <div style={{ margin: "1px", maxWidth: "12em" }}>
              <div>
                <a
                  className="text-white dark:text-white"
                  href={`https://www.randgallery.com/algo-collection/?address=${asset.index}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    key={index}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "2px solid white",
                      borderRadius: "10px",
                    }}
                    src={`https://ipfs.io/ipfs/${extractIPFSHash(
                      asset.params.url
                    )}`}
                    alt={`Asset ${index}`}
                  />
                </a>
              </div>
              <a
                className="text-white dark:text-white"
                href={`https://www.randgallery.com/algo-collection/?address=${asset.index}`}
                target="_blank"
                rel="noreferrer"
              >
                {accountData && asset.params.name}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}

export default DisplayPhantomv1;
