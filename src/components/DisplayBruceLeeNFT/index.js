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
          Byte City's Polygon NFT will be soon available for purchase with your
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
              <a
                href={nft?.metadata.dynamic_attributes}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  style={{
                    minHeight: "10em",
                  }}
                  key={index}
                  className="p-2 card lg:card-side bg-base-100 shadow-xl"
                >
                  <figure>
                    <img
                      src={nft?.media[0]?.thumbnail}
                      alt={`NFT ${nft?.title}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        border: "2px solid white",
                        borderRadius: "10px",
                      }}
                    />
                  </figure>
                  <div className="card-body" style={{ overflow: "auto" }}>
                    <h2 className="card-title">{nft?.title}</h2>
                    {nft?.metadata &&
                      nft?.metadata?.attributes.map((attribute, attrIndex) => (
                        <p key={attrIndex}>
                          {attribute?.trait_type}: {attribute?.value}
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