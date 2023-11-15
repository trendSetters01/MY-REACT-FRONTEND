// import React, { useState, useEffect } from "react";
// import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";

// import PeraWalletButton from "../PeraWalletButton";
// function DisplayAccountInformation({
//   setConnectedAccountAddress,
//   connectedAccountAddress,
//   accountAddress,
// }) {
//   const [accountData, setAccountData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (accountAddress) {
//       fetchAccountData();
//     }
//   }, [accountAddress]);

//   const fetchAccountData = async () => {
//     console.log(setConnectedAccountAddress);
//     setLoading(true);
//     try {
//       const response = await getUserTokenHolding(accountAddress);
//       console.log(response);
//       const data = response;
//       if (data.account) {
//         setAccountData(data.account);
//       } else {
//         setError(data.message);
//       }
//       setLoading(false);
//     } catch (err) {
//       console.error("Failed to fetch account data:", err);
//       setError("Error fetching account data. Please try again.");
//       setLoading(false);
//     }
//   };

//   function extractIPFSHash(ipfsUrl) {
//     const prefix = "ipfs://";
//     if (ipfsUrl.startsWith(prefix)) {
//       return ipfsUrl.slice(prefix.length);
//     } else {
//       throw new Error("Invalid IPFS URL");
//     }
//   }

//   return (
//     <div className="fade-in">
//       {loading && <p>Loading account data...</p>}
//       {error && <p>Error: {error}</p>}
//       <PeraWalletButton onConnect={setConnectedAccountAddress} />
//       {accountData && connectedAccountAddress && (
//         <div>
//           <h2>Account Information</h2>
//           <p>Address: {accountData.address}</p>
//           <p>Amount: {accountData.amount}</p>
//           <p>Assets Data: <br/>{JSON.stringify(accountData.assets, null, 2)}<br/></p>
//           <p>Created Assets Data: <br/>{JSON.stringify(accountData["created-assets"], null, 2)}<br/></p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DisplayAccountInformation;
import React, { useState, useEffect } from "react";
import { getUserTokenHolding } from "../../algorand/getUserTokenHolding.js";
import PeraWalletButton from "../PeraWalletButton";

function DisplayAccountInformation({
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
  }, [accountAddress]);

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
    <div className="fade-in">
      {loading && <p>Loading account data...</p>}
      {error && <p>Error: {error}</p>}
      <PeraWalletButton onConnect={setConnectedAccountAddress} />
      {accountData && connectedAccountAddress && (
        <div>
          <h2>Account Information</h2>
          <p>Address: {accountData.address}</p>
          <p>Amount: {accountData.amount}</p>
          <h3>Assets Data:</h3>
          <div>
            {accountData.assets && accountData.assets.length > 0 ? (
              <table
                style={{
                  margin: "auto",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <thead>
                  <tr>
                    <th>Asset ID</th>
                    <th>Amount</th>
                    <th>Is Frozen</th>
                    <th>Opted-in At Round</th>
                    <th>Deleted</th>
                  </tr>
                </thead>
                <tbody>
                  {accountData.assets.map((asset) => (
                    <tr key={asset["asset-id"]}>
                      <td>{asset["asset-id"]}</td>
                      <td>{asset.amount}</td>
                      <td>{asset["is-frozen"] ? "Yes" : "No"}</td>
                      <td>{asset["opted-in-at-round"]}</td>
                      <td>{asset.deleted ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No assets found.</p>
            )}
          </div>
          <h3>Created Assets Data:</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
            }}
          >
            {accountData &&
              accountData["created-assets"].map((asset, index) => (
                console.log(asset.params.url),
                <div style={{ margin: "1px" }}>
                  <div>
                    <a
                      style={{ color: "white" }}
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
                    style={{ color: "white" }}
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
      )}
    </div>
  );
}

export default DisplayAccountInformation;
