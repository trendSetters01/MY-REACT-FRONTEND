import React, { useState } from "react";

function VestigeListing({ accountAddress }) {
  const [activeTab, setActiveTab] = useState("Vestige Listing");
  const [iframeLoading, setIframeLoading] = useState(true); // State to track iframe loading

  const handleIframeLoad = () => {
    setIframeLoading(false); // Set loading to false when iframe is loaded
  };

  return (
    <div>
      {activeTab === "Vestige Listing" && (
        <section className="flex flex-col items-center justify-center bg-gradient-to-r from-black to-gray-500 text-white shadow-lg">
          {!iframeLoading && (
            <h1 className="animate-pulse text-red-500 p-4">
              Vestige wallet connect is a different session than the one on this
              website. Please connect your wallet to Vestige. Click the Connect
              button, to interact with their swaps.
            </h1>
          )}
          {iframeLoading && (
            <span className="loading loading-spinner loading-lg text-white">
              <div className="flex flex-col items-center justify-center h-screen">
                <svg
                  className="animate-spin h-5 w-5 mr-3 ..."
                  style={{ border: "5px solid white" }}
                  viewBox="0 0 24 24"
                ></svg>
                Loading ...
              </div>
            </span>
          )}
          <iframe
            className={`w-full ${iframeLoading ? "h-0" : "h-screen"}`} // Hide iframe while loading
            src="https://vestige.fi/asset/1279721720"
            title="Phantoms Vestige Listing"
            onLoad={handleIframeLoad}
          ></iframe>
          <a
            href="https://vestige.fi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Powered by Vestige
          </a>
        </section>
      )}
    </div>
  );
}

export default VestigeListing;
