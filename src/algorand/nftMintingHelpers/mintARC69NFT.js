import algosdk from "algosdk";
import { algodClient } from "../config.js";

export async function arc69Mint(address, note, unitName, assetName, ipfshash) {
  try {
    // Input validation
    if (!algosdk.isValidAddress(address)) {
      throw new Error("Invalid Algorand address provided.");
    }

    const suggestedParams = await algodClient.getTransactionParams().do();
    // Convert the note object to a JSON string and then to a byte array
    const encodedNote = algosdk.encodeObj(JSON.stringify(note));

    const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
      address,
      encodedNote,
      1,
      0,
      false,
      address,
      undefined,
      undefined,
      undefined,
      unitName,
      assetName,
      `ipfs://${ipfshash}#i`,
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
