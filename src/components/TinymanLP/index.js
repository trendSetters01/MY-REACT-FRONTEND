import React, { useState } from "react";

function TinymanLPDeposits({ accountAddress }) {
  const [activeTab, setActiveTab] = useState("Tinyman LP Deposits");
  const [iframeLoading, setIframeLoading] = useState(true); // State to track iframe loading

  const handleIframeLoad = () => {
    setIframeLoading(false); // Set loading to false when iframe is loaded
  };

  return (
    <div>
      {activeTab === "Tinyman LP Deposits" && (
        <section className="bg-gradient-to-r from-black to-gray-500 text-white shadow-lg">
          <h1 className="animate-pulse text-red-500 p-4">
            Tinyman wallet connect is a diiferent session then the one on this
            website. Please connect your wallet to Tinyman. Click the wallet tab
            below and choose the wallet you want to connect to.
          </h1>
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
            src="https://app.tinyman.org/#/pool/all-pools?search=phntm&onlyVerified=true"
            title="Phantoms Tinyman LP"
            onLoad={handleIframeLoad}
          ></iframe>
          <a
            href="https://app.tinyman.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Powered by Tinyman
          </a>
        </section>
      )}
    </div>
  );
}

export default TinymanLPDeposits;
