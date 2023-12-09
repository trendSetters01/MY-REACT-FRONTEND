import algosdk from "algosdk";
import { algodClient } from "./config.js";

export async function optOut(address, assetId) {
  try {
    // Input validation
    if (!algosdk.isValidAddress(address)) {
      throw new Error("Invalid Algorand address provided.");
    }

    const suggestedParams = await algodClient.getTransactionParams().do();
    
    // Create an asset transfer transaction with the close-to address
    const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      address,          // from account (also the sender)
      address,          // to account (receiver, same as sender)
      address,          // close remainder to (to close the asset holding)
      undefined,        // revocation target (not used in opting out)
      0,                // amount (0 for opting out)
      undefined,        // note field (optional)
      parseInt(assetId, 10), // asset ID
      suggestedParams   // transaction parameters
    );

    const singleTxnGroups = [{txn, signers: [address]}];
    return singleTxnGroups;

  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
