import { algoIndexerClient } from "./config.js";

const phantomV1Address =
  "IWY24Q6GUUIMJITMTR3FDO4Q54UCBPPPIWJUQ57CWLASPRHFHXTXIQUQYA";

export async function verifyNFT(address) {
  try {
    // Fetch user account information
    let accountAssets = await getAllAssetsForAccount(address);

    // Extract the list of asset IDs the user owns
    const userAssetIds = accountAssets.map((asset) => asset["asset-id"]);

    // Check if the user owns any of the NFTs from the phantomAssets list
    const phantomAssets = await getAllAssetsForAccount(phantomV1Address);
    for (let nft of phantomAssets) {
      if (userAssetIds.includes(nft["asset-id"])) {
        return true; // The user owns one of the NFTs
      }
    }

    return false; // The user does not own any of the NFTs
  } catch (error) {
    console.error("AlgoSDK error: ", error);
    return false; // Handle the error appropriately
  }
}

export async function verifySpecificPhntmNFT(address, assetid) {
  try {
    // Check if the assetid matches any of the NFTs from the phantomAssets list
    const ownsNFT = await checkPhantomNFT(assetid);
    if (!ownsNFT) {
      return false; // The user does not own any of the NFTs
    }

    // Fetch user account information
    let accountAssets = await getAllAssetsForAccount(address);

    // Extract the list of asset IDs the user owns
    const userAssetIds = accountAssets.map((asset) => asset["asset-id"]);

    // Check if the user owns the specified NFT
    if (userAssetIds.includes(parseInt(assetid, 10))) {
      return true; // The user owns the specified NFT
    }

    return false; // The user does not own the specified NFT
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
      // Fetch the assets for the account
      const response = await algoIndexerClient
        .lookupAccountAssets(address)
        .nextToken(nextToken)
        .do();

      // Add the newly fetched assets to your array
      assets = assets.concat(response.assets);

      // Check if there are more assets to fetch
      nextToken = response["next-token"];
    } while (nextToken); // If there's no next token, we've fetched all assets
  } catch (error) {
    console.error("Error fetching assets for account:", error);
  }

  return assets;
}

async function checkPhantomNFT(assetid) {
  // Fetch user account information
  const phantomAssets = await getAllAssetsForAccount(phantomV1Address);

  // Extract the list of asset IDs the user owns
  for (let nft of phantomAssets) {
    if (parseInt(assetid, 10) === nft["asset-id"]) {
      return true; // The user owns one of the NFTs
    }
  }
  return false; // The user does not own any of the NFTs
}
