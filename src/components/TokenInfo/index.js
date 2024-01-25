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
        <section className="flex flex-col items-center justify-center bg-gradient-to-r from-teal-600 to-purple-600 text-white shadow-lg">
          {!iframeLoading && (
            <div
              style={{
                padding: "0.125rem",
                maxHeight: "24vh",
                borderRadius: "0",
              }}
              role="alert"
              className="alert alert-info flex flex-col items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6 pt-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span style={{ fontSize: "small" }} className="pb-4 pl-4 pr-4">
                Token Information
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
