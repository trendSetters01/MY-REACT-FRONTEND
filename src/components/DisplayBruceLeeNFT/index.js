import React, { useState, useEffect } from "react";
import leeNfts from "./lee.json";

function DisplayNFTs({ accountAddress }) {
  const [nfts, setNfts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        <h1 className="text-3xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-blue-500 animate-pulse">
          Coming soon! Byte City's Polygon NFT available for purchase with your
          PHNTM Tokens
        </h1>
        <a
          href="https://twitter.com/playBYTECITY"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          <strong>Check out Byte City's X (Twitter) for more details</strong>
        </a>
        <p className="mt-2">
          Not affiliated with Bruce Lee or the Bruce Lee Foundation or Byte City
        </p>
      </header>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-10">
        {nfts &&
          nfts.map((nft, index) => {
            console.log(nft);
            return (
              <div
                key={index}
                className="p-2 bg-gradient-to-r from-black to-gray-800 mt-4"
              >
                <a
                  href={nft?.tokenUri.gateway}
                  target="_blank"
                  rel="noreferrer"
                >
                  <video
                    controls
                    autoplay
                    src={nft?.metadata.animation_url}
                    alt={`NFT ${nft?.title}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      border: "2px solid white",
                      borderRadius: "10px",
                    }}
                  />
                </a>
                <div className="mt-4">
                  <p>{nft?.title}</p>
                  {/* {nft?.metadata &&
                nft?.metadata?.attributes.map((attribute, attrIndex) => (
                  <p key={attrIndex}>
                    {attribute.trait_type}: {attribute.value}
                  </p>
                ))} */}
                  {/* Add more details you want to display here */}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DisplayNFTs;
