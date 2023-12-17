import algosdk from "algosdk";

const ALGOD_API_ADDR = "https://mainnet-algorand.api.purestake.io/ps2";
const ALGOD_INDEXER_ADDR = "https://mainnet-algorand.api.purestake.io/idx2";
const ALGOD_PORT = "";
const REACT_APP_PURESTAKE_API_KEY = process.env.REACT_APP_PURESTAKE_API_KEY;
const ALGOD_API_TOKEN = {
  "X-API-Key": REACT_APP_PURESTAKE_API_KEY,
};

const algodClient = new algosdk.Algodv2(
  ALGOD_API_TOKEN,
  ALGOD_API_ADDR,
  ALGOD_PORT
);
const algoIndexerClient = new algosdk.Indexer(
  ALGOD_API_TOKEN,
  ALGOD_INDEXER_ADDR,
  ALGOD_PORT
);

export { algodClient, algoIndexerClient };
