import React from "react";

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div
      className="mt-2"
      style={{ zIndex: "1000", position: "relative", fontWeight: "bold" }}
    >
      <div role="tablist" className="tabs">
        <a
          role="tab"
          className={`tab
                        ${
                          activeTab === "arc3"
                            ? "tab-active bg-gradient-to-r from-black to-gray-600 hover:from-gray-600 hover:to-black"
                            : ""
                        }
                        text-white hover:bg-gray-700 transition duration-300 ease-in-out
                        px-4 py-2 rounded-md`}
          onClick={() => setActiveTab("arc3")}
        >
          Mint NFT ARC3
        </a>
        <a
          role="tab"
          className={`tab
                        ${
                          activeTab === "arc69"
                            ? "tab-active bg-gradient-to-r from-black to-gray-600 hover:from-gray-600 hover:to-black"
                            : ""
                        }
                        text-white hover:bg-gray-700 transition duration-300 ease-in-out
                        px-4 py-2 rounded-md`}
          onClick={() => setActiveTab("arc69")}
        >
          Mint NFT ARC69
        </a>
      </div>
      <hr className="text-white" />
    </div>
  );
}
