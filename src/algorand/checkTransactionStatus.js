import { algodClient } from "./config.js";

export default async function checkTransactionStatus(txId, resolve) {
  try {
    const response = await algodClient.pendingTransactionInformation(txId).do();
    if (
      response["confirmed-round"] !== null &&
      response["confirmed-round"] > 0
    ) {
      // Transaction confirmed
      resolve(true);
    } else {
      // Transaction not confirmed, check again after some delay
      setTimeout(() => checkTransactionStatus(txId, resolve), 2000); // Check every 2 seconds
    }
  } catch (error) {
    console.error("Error checking transaction status:", error);
    resolve(false);
  }
};
