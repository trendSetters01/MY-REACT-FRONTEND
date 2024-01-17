import React, { useState } from "react";

function TokenInfo({ accountAddress }) {
  const [activeTab, setActiveTab] = useState("Token Info");
  const [iframeLoading, setIframeLoading] = useState(true); // State to track iframe loading

  const handleIframeLoad = () => {
    setIframeLoading(false); // Set loading to false when iframe is loaded
  };

  return (
    <div>
      {activeTab === "Token Info" && (
        <section className="bg-gradient-to-r from-black to-gray-500 text-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Token Information</h2>
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
            src="https://allo.info/asset/1279721720/token"
            title="Phantoms Token Info"
            onLoad={handleIframeLoad}
          ></iframe>
          <a
            href="https://allo.info"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Powered by Allo
          </a>
        </section>
      )}
    </div>
  );
}

export default TokenInfo;
