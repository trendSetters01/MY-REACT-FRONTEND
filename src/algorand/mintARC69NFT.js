import algosdk from "algosdk";
import { algodClient } from "./config.js";

export async function arc69Mint(address, note, unitName, assetName,ipfshash) {
  try {
    // Input validation
    if (!algosdk.isValidAddress(address)) {
      throw new Error("Invalid Algorand address provided.");
    }

    const suggestedParams = await algodClient.getTransactionParams().do();

    const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
      address,
      algosdk.encodeObj(`${note}`),
      1,
      0,
      false,
      address,
      undefined,
      undefined,
      undefined,
      unitName,
      assetName,
      `https://ipfs.io/ipfs/${ipfshash}`,
      "",
      suggestedParams
    );
    const singleTxnGroups = [{ txn, signers: [address] }];
    return singleTxnGroups;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
