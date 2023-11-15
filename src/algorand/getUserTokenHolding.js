import { algoIndexerClient } from "./config.js";

const assetId = parseInt("6670024", 10);

export async function getUserTokenHolding(address) {
  try {
    const response = await algoIndexerClient.lookupAccountByID(address).do();
    // for (let balanceInfo of response.balances) {
    //   if (balanceInfo.address === address) {
    //     return balanceInfo.amount;
    //   }
    // }
    return response;
  } catch (error) {
    console.error("Error fetching user token balance:", error);
    return null;
  }
}
