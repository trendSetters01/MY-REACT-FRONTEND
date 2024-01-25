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
        <section className="flex flex-col items-center justify-center bg-gradient-to-r from-teal-600 to-purple-600 text-white shadow-lg">
          {!iframeLoading && (
            <div
              style={{
                padding: "0.125rem",
                maxHeight: "24vh",
                borderRadius: "0",
              }}
              role="alert"
              className="alert alert-warning flex flex-col items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6 pt-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span
                style={{ fontSize: "small" }}
                className="animate-pulse pb-4 pl-4 pr-4"
              >
                Vestige wallet connect is a different session than the one on
                this website. Please connect your wallet to Vestige. Click the
                Connect button, to interact with their swaps.
              </span>
            </div>
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
