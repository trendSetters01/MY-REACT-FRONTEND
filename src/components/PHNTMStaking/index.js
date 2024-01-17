import React, { useState } from "react";
function PHNTMStaking({ accountAddress }) {
  const [activeTab, setActiveTab] = useState("PHNTM Staking");
  const [iframeLoading, setIframeLoading] = useState(true); // State to track iframe loading

  const handleIframeLoad = () => {
    setIframeLoading(false); // Set loading to false when iframe is loaded
  };

  return (
    // <div className="container mx-auto px-4 py-8 text-white bg-gradient-to-r from-blue-500 to-purple-600">
    <div>
      {activeTab === "PHNTM Staking" && (
        <section className="bg-gradient-to-r from-black to-gray-500 text-white shadow-lg rounded-lg">
          <h1 className="animate-pulse text-red-500 p-4">
            Cometa Hub's wallet connect is a diiferent session then the one on
            this website. Please connect your wallet to Cometa Hub. Click the
            Connect Wallet button, to interact with their transactions.
          </h1>
          {iframeLoading && (
            <span className="loading loading-spinner loading-lg text-white">
              <div className="flex justify-center">
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
            className={`w-full ${iframeLoading ? "h-0" : "h-screen"}`}
            src="https://app.cometa.farm/stake"
            title="Phantoms Staking"
            onLoad={handleIframeLoad}
          ></iframe>
          <a
            href="https://app.cometa.farm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Powered by Cometa Hub
          </a>
        </section>
      )}
    </div>
  );
}

export default PHNTMStaking;
