import React, { useState, useContext, useRef } from "react";
import { PeraWalletContext } from "../PeraWalletContext";
import { algodClient } from "../../algorand/config";
import { arc3Mint } from "../../algorand/nftMintingHelpers/mintARC3NFT";
import axios from "axios";

export default function MintNFTARC3({ accountAddress }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [metadataFields, setMetadataFields] = useState([
    { key: "assetName", value: "", required: true },
    { key: "unitName", value: "", required: true },
    { key: "description", value: "", required: true },
  ]);

  const peraWallet = useContext(PeraWalletContext);
  const inputFile = useRef(null);

  const resetForm = () => {
    setFile(null);
    setUploading(false);
    setMetadataFields([
      { key: "assetName", value: "", required: true },
      { key: "unitName", value: "", required: true },
      { key: "description", value: "", required: true },
    ]);
  };

  // Camel Case Utility Function
  const toCamelCase = (str) => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  };

  const handleMetadataChange = (index, key, value, isKeyChange) => {
    const newFields = [...metadataFields];
    if (newFields[index].required) {
      // Update value for required fields
      newFields[index] = { ...newFields[index], value };
    } else {
      // Update key and value for non-required fields
      newFields[index] = {
        ...newFields[index],
        key: isKeyChange ? toCamelCase(key) : newFields[index].key,
        value: isKeyChange ? newFields[index].value : value,
      };
    }
    setMetadataFields(newFields);
  };

  const addMetadataField = () => {
    setMetadataFields([
      ...metadataFields,
      { key: "", value: "", required: false },
    ]);
  };

  const removeMetadataField = (index) => {
    if (!metadataFields[index].required) {
      const newFields = metadataFields.filter((_, i) => i !== index);
      setMetadataFields(newFields);
    }
  };

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const handleMintArc3 = async () => {
    console.log(metadataFields);
    setStatus("Minting ARC-3 NFT...");
    try {
      setUploading(true);
      const ipfsHash = await sendFileToIPFS();
      setUploading(false);
      const assetName = metadataFields.find(
        (field) => field.key === "assetName"
      ).value;
      const unitName = metadataFields.find(
        (field) => field.key === "unitName"
      ).value;
      console.log("unitName", "name", unitName, assetName);
      const txn = await arc3Mint(
        accountAddress,
        "",
        unitName,
        assetName,
        ipfsHash
      );
      const signedTx = await peraWallet.signTransaction([txn]);
      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();
      console.log("Transaction ID:", txConfirmation.txId);
      setStatus(
        `ARC-3 NFT minted successfully! Transaction ID: ${txConfirmation.txId}`
      );
      resetForm();
    } catch (error) {
      console.error("Error minting ARC-3 NFT:", error);
      setStatus("Failed to mint ARC-3 NFT.");
    } finally {
      setTimeout(() => {
        setStatus("");
      }, 5000);
    }
  };

  const sendFileToIPFS = async () => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file, { filename: file.name });

        const imageUpload = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });

        // Extracting assetName and unitName from metadataFields
        const assetName = metadataFields.find(
          (field) => field.key === "assetName"
        ).value;
        const unitName = metadataFields.find(
          (field) => field.key === "unitName"
        ).value;
        const description = metadataFields.find(
          (field) => field.key === "description"
        ).value;

        // Constructing properties object from metadataFields
        const properties = metadataFields.reduce((acc, field) => {
          if (!field.required) {
            acc[field.key] = field.value;
          }
          return acc;
        }, {});

        const metadataUpload = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          data: {
            decimals: 0,
            name: assetName,
            description: description,
            unitName: unitName,
            image: `ipfs://${imageUpload.data.IpfsHash}`,
            image_mimetype: file.type,
            properties,
          },
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "application/json",
          },
        });

        return metadataUpload.data.IpfsHash;
      } catch (error) {
        console.error("Error sending File to IPFS:", error);
      }
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {!accountAddress && (
        <h1 className="animate-pulse text-white">
          Connect your wallet to send assets.
        </h1>
      )}

      {accountAddress && (
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            ref={inputFile}
            accept="image/*"
            style={{ display: "none" }}
          />
          <div className="flex items-center justify-center mt-4">
            {status && <p className="text-white">{status}</p>}
          </div>
          <div className="mb-4 mt-4 flex flex-col items-center justify-center rounded-lg bg-light p-2 text-center text-secondary">
            <button
              disabled={uploading}
              onClick={() => inputFile.current.click()}
              className="align-center flex flex-row items-center justify-center rounded-3xl bg-secondary px-4 py-2 text-white transition-all duration-300 ease-in-out hover:bg-accent hover:text-light"
            >
              {uploading ? (
                "Uploading..."
              ) : (
                <div>
                  <p className="text-lg font-light">
                    Select a file to upload to the IPFS network
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="m-auto mt-4 h-12 w-12 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </div>
              )}
            </button>
          </div>

          {/* Required Fields */}
          <div className="w-full max-w-4xl px-4 mb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {metadataFields.map((field, index) =>
                field.required ? (
                  <input
                    key={index}
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      handleMetadataChange(
                        index,
                        field.key,
                        e.target.value,
                        false
                      )
                    }
                    placeholder={
                      field.key.charAt(0).toUpperCase() +
                      field.key
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .trim()
                    } // More descriptive placeholder
                    className="input-md"
                    required
                  />
                ) : null
              )}
            </div>
          </div>
          <div className="text-center mb-4 animate-pulse">
            <p className="text-white">Add more properties to your NFT</p>
            <span className="text-white text-2xl">&#x2193;</span>
          </div>
          {/* Dynamic Metadata Fields */}
          <div className="w-full max-w-4xl px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {metadataFields.map((field, index) =>
                !field.required ? (
                  <div key={index} className="flex flex-col">
                    <input
                      type="text"
                      value={field.key}
                      onChange={(e) =>
                        handleMetadataChange(
                          index,
                          e.target.value,
                          field.value,
                          true
                        )
                      }
                      placeholder="Enter key (e.g., color, size)"
                      className="mb-2 input-md"
                    />
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        handleMetadataChange(
                          index,
                          field.key,
                          e.target.value,
                          false
                        )
                      }
                      placeholder="Enter value (e.g., red, large)"
                      className="mb-2 input-md"
                    />
                    <button
                      onClick={() => removeMetadataField(index)}
                      className="input-md bg-red-500 hover:bg-red-700 text-white rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                ) : null
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center mt-4">
            <button
              onClick={addMetadataField}
              className="p-2 input-md bg-gradient-to-r from-green-500 to-yellow-400 hover:from-yellow-400 hover:to-green-500 rounded-md mr-4"
            >
              Add More Properties
            </button>
            <button
              onClick={resetForm}
              className="p-2 input-md bg-gradient-to-r from-yellow-500 to-red-400 hover:from-red-400 hover:to-yellow-500 rounded-md mr-4"
            >
              Reset Form
            </button>
            <button
              className="p-2 input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md"
              onClick={handleMintArc3}
            >
              Mint ARC-3 NFT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
