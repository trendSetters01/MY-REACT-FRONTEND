import algosdk from "algosdk";

const ALGOD_API_ADDR = "https://mainnet-algorand.api.purestake.io/ps2";
// const ALGOD_API_ADDR = "https://testnet-algorand.api.purestake.io/ps2";
const ALGOD_PORT = "";
// const PURESTAKE_API_KEY = process.env["PURESTAKE_API_KEY"];
const ALGOD_API_TOKEN = {
  "X-API-Key": "GmPRgAPXK92qOfFuKaSaV3J2tyNxdjrQ7cscZoAW",
};
const algodClient = new algosdk.Algodv2(
  ALGOD_API_TOKEN,
  ALGOD_API_ADDR,
  ALGOD_PORT
);

// export async function send(from, to, amount, assetId, note) {
//   try {
//     // Input validation
//     if (!algosdk.isValidAddress(from)) {
//       throw new Error("Invalid from Algorand address provided.");
//     }
//     // Input validation
//     if (!algosdk.isValidAddress(to)) {
//       throw new Error("Invalid to Algorand address provided.");
//     }
//     const suggestedParams = await algodClient.getTransactionParams().do();

//     const txn = algosdk.makeAssetTransferTxnWithSuggestedParams(
//       from,
//       to,
//       undefined,
//       undefined,
//       amount,
//       algosdk.encodeObj(`${note}`),
//       parseInt(assetId, 10),
//       suggestedParams
//     );

//     const singleTxnGroups = [{ txn, signers: [from] }];
//     return singleTxnGroups;
//   } catch (error) {
//     console.error("An error occurred:", error);
//     throw error;
//   }
// }
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
      if (assetId === '0' || assetId === '') {
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
  
      const singleTxnGroups = [{ txn, signers: [from] }];
      return singleTxnGroups;
    } catch (error) {
      console.error("An error occurred:", error);
      throw error;
    }
  }
  