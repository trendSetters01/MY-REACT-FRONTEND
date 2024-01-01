import algosdk from "algosdk";

import { algodClient } from "../config.js";
// import { autoOptOutRewardedAsset } from "../opt-out.js";
export async function send(from, to, amount, assetId, note) {
  try {
    // Input validation
    if (!algosdk.isValidAddress(from)) {
      throw new Error("Invalid from Algorand address provided.");
    }
    if (!algosdk.isValidAddress(to)) {
      throw new Error("Invalid to Algorand address provided.");
    }

    const suggestedParams = await algodClient.getTransactionParams().do();

    let txn;
    if (assetId === "0" || assetId === "") {
      // Sending ALGO
      txn = algosdk.makePaymentTxnWithSuggestedParams(
        from,
        to,
        amount,
        undefined, // closeRemainderTo
        algosdk.encodeObj(`${note}`),
        suggestedParams
      );
    } else {
      // Sending ASA
      txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
        from,
        to,
        undefined, // closeRemainderTo
        undefined, // revocationTarget
        amount,
        algosdk.encodeObj(`${note}`),
        parseInt(assetId, 10), // Asset ID for ASA
        suggestedParams
      );
    }
    const mnemonic = process.env.REACT_APP_MNEMONIC;
    const rewardProviderAccount = algosdk.mnemonicToSecretKey(mnemonic);

    const signedTxn = algosdk.signTransaction(txn, rewardProviderAccount.sk);
    const txConfirmation = await algodClient
      .sendRawTransaction(signedTxn.blob)
      .do();

    // await autoOptOutRewardedAsset(assetId);

    console.log("Transaction ID:", txConfirmation.txId);
    return txConfirmation;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
