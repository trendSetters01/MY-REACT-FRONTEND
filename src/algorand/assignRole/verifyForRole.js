import { algoIndexerClient } from "../config.js";

const phantomV1Address =
  "IWY24Q6GUUIMJITMTR3FDO4Q54UCBPPPIWJUQ57CWLASPRHFHXTXIQUQYA";
  
async function verifyNFT(address, role) {
  const knownAssetIds = {
    Singlev1: "1247047572",
    Fourv1: "1247052279",
    Fivev1: "1247046654",
  };

  try {
    let userAssets = await getAllAssetsForAccount(address);
    const userAssetIds = userAssets.map((asset) => asset["asset-id"]);

    const phantomAssets = await getAllAssetsForAccount(phantomV1Address);
    const phantomAssetIds = phantomAssets.map((asset) => asset["asset-id"]);

    let phantomCount = 0;
    for (let assetId of userAssetIds) {
      if (phantomAssetIds.includes(assetId)) {
        phantomCount++;
      }
    }

    // Count the specific Phantom role tokens the user owns
    let tokenCounts = {
      Singlev1: 0,
      Fivev1: 0,
      Fourv1: 0,
    };
    for (let asset of userAssets) {
      if (asset["asset-id"] === knownAssetIds.Singlev1) {
        tokenCounts.Singlev1 = asset.amount;
      } else if (asset["asset-id"] === knownAssetIds.Fivev1) {
        tokenCounts.Fivev1 = asset.amount;
      } else if (asset["asset-id"] === knownAssetIds.Fourv1) {
        tokenCounts.Fourv1 = asset.amount;
      }
      // Add more cases as needed
    }

    // Define the required counts and eligibility for different roles
    switch (role) {
      case "Singlev1":
        return phantomCount >= 1 && tokenCounts.Singlev1 < phantomCount; // User must have at least 1 Phantom NFT and fewer Spark tokens than Phantom NFTs
      case "Fivev1":
        return (
          phantomCount >= 5 && tokenCounts.Fivev1 < Math.floor(phantomCount / 5)
        ); // User must have at least 5 Phantom NFTs and fewer Spectral Flame tokens than sets of 5 Phantom NFTs
      case "Fourv1":
        return phantomCount >= 15 && tokenCounts.Fourv1 < 1; // User must have at least 15 Phantom NFTs and no Mystic Breeze tokens
      // Add more cases as needed
      default:
        return false; // Unknown role
    }
  } catch (error) {
    console.error("AlgoSDK error: ", error);
    return false; // Handle the error appropriately
  }
}

async function getAllAssetsForAccount(address) {
  let assets = [];
  let nextToken = null;

  try {
    do {
      const response = await algoIndexerClient
        .lookupAccountAssets(address)
        .nextToken(nextToken)
        .do();

      assets = assets.concat(response.assets);
      nextToken = response["next-token"];
    } while (nextToken);
  } catch (error) {
    console.error("Error fetching assets for account:", error);
  }

  return assets;
}

export { verifyNFT };
