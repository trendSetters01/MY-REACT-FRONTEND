import React, { useEffect, useState } from "react";

const TokenPriceTicker = () => {
  const [tokenPrice, setTokenPrice] = useState("");

  useEffect(() => {
    const fetchTokenPrice = async () => {
      try {
        const response = await fetch(
          "https://free-api.vestige.fi/asset/1279721720/price?currency=usdc"
        );
        const data = await response.json();
        setTokenPrice(data.price);
      } catch (error) {
        console.error("Failed to fetch token price:", error);
        setTokenPrice("Unavailable");
      }
    };

    fetchTokenPrice();
    const interval = setInterval(fetchTokenPrice, 60000); // Update price every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const renderTickerText = () => (
    <div className="ticker-text whitespace-nowrap text-white text-xl">
      <span>PHNTM Token Price: ${`${tokenPrice}`.slice(0, 8)}</span>
    </div>
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "4",
        gap: "44em",
      }}
      className="overflow-hidden relative bg-gradient-to-r from-teal-600 to-cyan-300"
    >
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <React.Fragment key={index}>{renderTickerText()}</React.Fragment>
        ))}
    </div>
  );
};

export default TokenPriceTicker;
