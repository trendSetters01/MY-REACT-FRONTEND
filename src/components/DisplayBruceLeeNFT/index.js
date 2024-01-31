import React, { useState, useEffect, useContext } from "react";
import leeNfts from "./lee.json";
import { PeraWalletContext } from "../PeraWalletContext";
import axios from "axios";

function DisplayNFTs({ accountAddress }) {
  const [nfts, setNfts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [isPurchasing, setIsPurchasing] = useState(false);

  const peraWallet = useContext(PeraWalletContext);
  const API_BASE_URL = "http://localhost:5000/api/v1"; // Replace with your backend URL

  const handleDeposit = async () => {
    try {
      //   const txn = await send(
      //     accountAddress,
      //     "JQONXCP7LYP2O2XQLOPBM6I67LBGCZGEZGHBRRBJBAJEWEIWIRIFZIPXIQ",
      //     2 * 1000000,
      //     "0", // '0' for ALGO
      //     `Phantoms Deposit: Cards RPG`
      //   );

      //   const signedTx = await peraWallet.signTransaction([txn]);
      //   const txConfirmation = await algodClient
      //     .sendRawTransaction(signedTx)
      //     .do();

      // console.log("Transaction ID:", txConfirmation.txId);

      //   setStatus("Deposit pending...");
      // have to add check deposit check on the backend
      const response = await axios.post(`${API_BASE_URL}/transfer-bruce-lee`, {
        to: "0xe38678c915f002245ED3Ed24370d745e362cb94e",
      });

      const txhash = response?.data?.txhash;
      console.log("txhash", txhash);
      if (txhash) {
      } else {
      }
    } catch (error) {
      console.error("Deposit error:", error);
    }
  };

  const handlePurchase = () => {
    if (!userAddress) {
      alert("Please enter a valid Polygon address.");
      return;
    }
    // Implement your logic to initiate the NFT purchase here
    setIsPurchasing(true);
    console.log("Purchasing NFT for address: ", userAddress);
    // After purchase logic
    setIsPurchasing(false);
  };

  useEffect(() => {
    console.log(leeNfts);
    if (!accountAddress) {
      fetchNFTData();
    }
  }, [accountAddress]);

  const fetchNFTData = async () => {
    setLoading(true);
    try {
      setNfts(leeNfts.ownedNfts);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch NFT data:", err);
      setError("Error fetching NFT data. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fade-in text-center text-white dark:text-white mb-4">
      {loading && <p>Loading NFT data...</p>}
      {error && <p>Error: {error}</p>}
      <header className="mt-4 mb-4 text-center">
        {/* <h1 className="text-3xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-blue-500 animate-pulse">
          Byte City's Polygon NFT will be soon available for purchase with your
          PHNTM Tokens
        </h1> */}
        <a
          href="https://twitter.com/playBYTECITY"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          <strong>Check out Byte City's X (Twitter) for more details</strong>
        </a>
        <div className="my-4 text-center">
          <p className="text-xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-black to-black">
            Are you ready to become a part of Byte City's exclusive Bruce Lee
            Collection on the Polygon blockchain?
          </p>
          <p className="text-xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-br from-black to-black">
            For ??? PHNTM tokens, you have the chance to acquire a unique NFT,
            chosen at random from our collection. This collection isn't
            just for show;
          </p>
          <p className="text-xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-black to-black">
            <ul className="pl-5 text-white" style={{ listStyleType: "none" }}>
              <strong>Owning one comes with benefits:</strong>
              <li style={{ paddingLeft: "1em", textIndent: "-1em" }}>
                💎 Playable Avatar
              </li>
              <li style={{ paddingLeft: "1em", textIndent: "-1em" }}>
                💎 Access & Drops.
              </li>
            </ul>
            Dive in and see which piece of Byte City you'll discover!
          </p>
          <div className="flex flex-col items-center justify-center gap-2 text-black">
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              placeholder="Enter your Polygon address"
              className="input input-bordered input-primary w-full max-w-xs my-2"
              disabled={true}
            />
            <button
              onClick={handlePurchase}
              className="btn bg-gradient-to-br from-blue-600 to-blue-500"
              // disabled={isPurchasing}
              disabled={true}
            >
              {isPurchasing
                ? "Purchasing..."
                : "Purchase Random NFT for 150 PHNTM"}
            </button>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 bg-gradient-to-br from-black to-purple-500 p-4">
        {nfts &&
          nfts.map((nft, index) => {
            return (
              <a
                href={nft?.metadata.dynamic_attributes}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  style={{
                    minHeight: "26em",
                    flexDirection: "column",
                  }}
                  key={index}
                  className="p-2 card lg:card-side bg-base-100 shadow-xl"
                >
                  <figure>
                    <video
                      controls
                      src={nft?.metadata?.animation_url}
                      alt={`NFT ${nft?.title}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        border: "2px solid white",
                        borderRadius: "10px",
                      }}
                      className="bg-base-100 shadow-xl"
                    />
                  </figure>
                  <div
                    className="card-body"
                    style={{
                      overflow: "auto",
                      paddingTop: "0.25em",
                      paddingBottom: "0.25em",
                      paddingLeft: "0.0em",
                      paddingRight: "0.25em",
                      maxHeight: "16em",
                    }}
                  >
                    <h2 className="card-title">{nft?.title}</h2>
                    {nft?.metadata &&
                      nft?.metadata?.attributes.map((attribute, attrIndex) => (
                        <p key={attrIndex} className="bg-base-100 shadow-xl">
                          {attrIndex + 1}: {attribute?.trait_type}:{" "}
                          {attribute?.value}
                        </p>
                      ))}
                  </div>
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
}

export default DisplayNFTs;
