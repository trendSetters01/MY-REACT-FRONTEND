import React, { useState } from "react";

export default function CustomDropdown({ label, assets, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <button onClick={toggleDropdown} className="m-1 btn m-2">
        {label}
      </button>
      {isOpen && (
        <ul
          onClick={toggleDropdown}
          style={{position:"absolute"}}
          className="p-2 shadow bg-base-100 w-52 overflow-y-scroll max-h-80"
        >
          {assets.map((asset) => (
            <li
              key={asset.id}
              className="flex flex-wrap gap-2 items-center p-2 hover:bg-gray-300 cursor-pointer"
              onClick={() => onSelect(asset.id)}
            >
              <img src={asset.icon} alt={asset.name} className="h-6 w-6 mr-2" />
              <span>{asset.name}</span>
              <a
                href={`https://algoexplorer.io/asset/${asset.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Asset ID: {asset.id}
              </a>
            </li>
          ))}
        </ul>

      )}

    </div>
  );
}
