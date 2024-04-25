import React, { useState } from "react";
import phantomsImg from "../../images/Phantoms.png";
export default function CustomDropdown({ label, assets, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const toggleDropdown = () => setIsOpen(!isOpen);

  const filteredAssets = assets.filter((asset) => {
    return asset.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <button onClick={toggleDropdown} className="btn m-4">
        {label}
      </button>
      {isOpen && (
        <div
          style={{ position: "absolute" }}
          className="p-2 shadow bg-base-100 w-44"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 w-full mb-4"
          />
          <ul onClick={toggleDropdown} className="overflow-y-scroll max-h-80">
            {filteredAssets.map((asset) => (
              <li
                key={asset.id}
                className="flex flex-wrap gap-2 items-center p-2 hover:bg-gray-300 cursor-pointer"
                onClick={() => onSelect(asset.id)}
              >
                <img
                  src={`${
                    asset.id === 1392374998
                      ? "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/01/11/aa7df2cb7eb14eba8bb2f5f28c6159d4.png"
                      : asset.id === 1682662165
                      ? "https://algorand-wallet-mainnet.b-cdn.net/media/asset_verification_requests_logo_png/2024/03/22/ff48d99492a840a7bd54dce69c7847ec.png?format=png&height=256&width=256"
                      : asset.id === 1279721720
                      ? `${phantomsImg}`
                      : asset.id !== 1279721720
                      ? `https://asa-list.tinyman.org/assets/${asset.id}/icon.png`
                      : "https://ipfs.algonft.tools/ipfs/bafkreifx6d4xnb57sid73ujcfu22tzgvwem2yrujn3shizfwayho5gfuuy#i"
                  }`}
                  className="h-6 w-6 mr-2"
                />
                <span>{asset.name}</span>
                <span className="text-blue-500 hover:underline">
                  Asset ID: {asset.id}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
