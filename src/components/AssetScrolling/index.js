import React, { useEffect, useState } from "react";
import algosdk from "algosdk";
import { algodClient } from "../../algorand/config.js";
import noImg from "../../images/e23cb9ab-f01a-43af-a148-14bc98bd5ed2.webp";

// Function to fetch asset details including metadata
const getAssetDetails = async (assetId) => {
  const assetInfo = await algodClient.getAssetByID(assetId).do();
  return assetInfo;
};

// This function now uses the provided extractIPFSHash function to get the image URL
const getAssetImageURL = async (assetId) => {
  try {
    const assetDetails = await getAssetDetails(assetId);
    // Assume that the IPFS URL is stored in the url field of the asset's params

    console.log("Asset images:", assetDetails.params.url);
    const ipfsUrl = assetDetails.params.url;
    const ipfsHash = extractIPFSHash(ipfsUrl);
    const imageURL = `https://ipfs.io/ipfs/${ipfsHash}`;
    return imageURL;
  } catch (error) {
    console.error("Error fetching asset image URL:", error);
    return null;
  }
};

// Extracts the IPFS hash from a given IPFS URL
function extractIPFSHash(url) {
  // Check if the URL is an HTTP(s) IPFS gateway URL
  if (url.startsWith("https://")) {
    const urlObj = new URL(url);
    const paths = urlObj.pathname.split("/");
    const hash = paths[paths.length - 1];
    return hash;
  }
  // Check if the URL is a direct IPFS protocol link
  else if (url.startsWith("ipfs://")) {
    const prefix = "ipfs://";
    return url.slice(prefix.length);
  } else {
    // If the URL format is unknown, you may log it and return a default image or handle as needed
    console.error("Unknown URL format:", url);
    return "default_image_hash"; // replace with actual default image hash or logic
  }
}

// Use this function to convert the IPFS hash to a URL using a consistent IPFS gateway
function ipfsGatewayUrl(ipfsHash) {
  // Replace this with the IPFS gateway you prefer to use
  return `https://ipfs.io/ipfs/${ipfsHash}`;
}

// Scrolling component
export default function AssetScrolling({ accountAddress, onImagesLoaded }) {
  const [assetIDs, setAssetIDs] = useState([]);
  const [assetImages, setAssetImages] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const phantomsHoldingAddress =
    "XGJS5VTFTVB3MJDQGXH4Y4M6NYDYEK4OZFF6NIVUTIBS52OTLW2N5CYM2Y";

  useEffect(() => {
    const fetchAssets = async () => {
      const assetsList = await getAssetsForAccount(phantomsHoldingAddress);
      setAssetIDs(assetsList);

      // Prepare to fetch images for all assets
      const images = {};
      for (const asset of assetsList) {
        const imageUrl = await getAssetImageURL(asset.id);
        images[asset.id] = imageUrl;
      }
      setAssetImages(images);
      setImagesLoaded(true);
      onImagesLoaded();
    };

    if (accountAddress) {
    fetchAssets();
    }
  }, [accountAddress]);

  return imagesLoaded ? (
    <div className="flex flex-col items-center justify-center text-white">
      <div
        className="flex overflow-x-auto whitespace-nowrap"
        style={{ width: "60vw" }}
      >
        {assetIDs.map((asset) => {
          // Use the asset ID to get the image URL from the assetImages map
          const imageUrl = assetImages[asset.id];

          // If imageUrl is not available, you might want to provide a fallback or skip rendering
          if (!imageUrl) {
            return null; // or return a placeholder image or some other fallback
          }

          return (
            <div
              key={asset.id}
              className="flex justify-center"
              style={{ minHeight: "7em", minWidth: "7em" }}
            >
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  border: "2px solid white",
                  borderRadius: "10px",
                }}
                src={imageUrl || noImg}
                alt={`${asset.id}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <span className="loading loading-spinner loading-lg text-white">
      <div class="flex justify-center">
        <svg
          class="animate-spin h-5 w-5 mr-3 ..."
          style={{ border: "5px solid white" }}
          viewBox="0 0 24 24"
        ></svg>
        Loading ...
      </div>
    </span>
  );
}

async function getAssetsForAccount(accountAddress) {
  if (!algosdk.isValidAddress(accountAddress)) {
    throw new Error("Invalid Algorand address.");
  }

  try {
    // Use the Indexer to look up all assets for the account.
    const accountInfo = await algodClient
      .accountInformation(accountAddress)
      .do();
    const assets = accountInfo["assets"];
    // Filter out assets without a positive amount (which the account holds).
    const heldAssets = assets.filter((asset) => asset["amount"] > 0);

    // Map the held assets to a more manageable structure, if needed.
    const simplifiedAssets = heldAssets.map((asset) => {
      return {
        id: asset["asset-id"],
        amount: asset["amount"],
        // You may want to fetch more details for each asset here, such as the unit name, asset name, etc.
        // This could require additional calls to the indexer for each asset.
      };
    });

    return simplifiedAssets;
  } catch (error) {
    console.error("Error fetching assets for account:", error);
    return [];
  }
}