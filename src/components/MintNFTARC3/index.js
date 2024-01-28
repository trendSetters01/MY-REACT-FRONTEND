import React, { useState, useContext, useRef } from "react";
import { PeraWalletContext } from "../PeraWalletContext";
import { algodClient } from "../../algorand/config";
import { arc3Mint } from "../../algorand/nftMintingHelpers/mintARC3NFT";
import axios from "axios";
import Confetti from "react-confetti";
import congratsImg from "../../images/360_F_106656883_2WufqiyAQOHji3hbQ3oSNvnffa9eECQ6.jpg";

export default function MintNFTARC3({ accountAddress }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");
  const [metadataFields, setMetadataFields] = useState([
    { key: "assetName", value: "", required: true },
    { key: "unitName", value: "", required: true },
    { key: "description", value: "", required: true },
  ]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const peraWallet = useContext(PeraWalletContext);
  const inputFile = useRef(null);

  const resetForm = () => {
    setFile(null);
    setImageUrl(null);
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
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url); // Set image URL for preview
    }
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
      setStatus(`${txConfirmation.txId}`);

      // On successful minting
      setShowConfetti(true);
      // Turn off confetti after some time
      setTimeout(() => {
        setShowConfetti(false);
        setStatus("");
        resetForm();
      }, 10000);
    } catch (error) {
      console.error("Error minting ARC-3 NFT:", error);
      setStatus("Failed to mint ARC-3 NFT.");
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
    <div
      style={{
        wordWrap: "break-word",
        maxHeight: "96vh",
        maxWidth: "100vw",
        minHeight: "64vh",
      }}
      className="flex flex-col items-center justify-center text-white"
    >
      {showConfetti && <Confetti width={window.width} height={window.height} />}
      {/* {!accountAddress && (
        <div style={{ minHeight: "64vh" }}>
          <h1 className="animate-pulse text-white pt-60">
            Connect your wallet to mint NFTs.
          </h1>
        </div>
      )} */}

      {!showConfetti && (
        <div className="w-full max-w-4xl bg-light rounded-lg p-4 text-gray flex flex-col items-center justify-center">
          <FileUploadButton
            inputFile={inputFile}
            handleFileChange={handleFileChange}
            uploading={uploading}
            imageUrl={imageUrl} // Pass the image URL to the FileUploadButton
          />
          <MetadataFields
            metadataFields={metadataFields}
            handleMetadataChange={handleMetadataChange}
            removeMetadataField={removeMetadataField}
          />
          <ActionButtons
            accountAddress={accountAddress}
            handleMintArc3={handleMintArc3}
            resetForm={resetForm}
            addMetadataField={addMetadataField}
          />
        </div>
      )}
      {showConfetti && (
        <MintingSuccessMessage status={status} congratsImg={congratsImg} />
      )}
    </div>
  );
}

function splitCamelCase(input) {
  return input.replace(/([A-Z])/g, " $1").trim();
}

function FileUploadButton({
  inputFile,
  handleFileChange,
  uploading,
  imageUrl,
}) {
  return (
    <div className="mb-4 mt-8 flex flex-col items-center justify-center rounded-lg bg-light p-2 text-center text-secondary">
      <button
        disabled={uploading}
        onClick={() => inputFile.current.click()}
        className="mt-2 sm: mt-8 md: mt-8 align-center flex flex-row items-center justify-center rounded-3xl bg-blue-600 px-8 py-1 text-white transition-all duration-300 ease-in-out hover:bg-accent hover:text-light"
      >
        <div>
          <p className="text-lg font-bold">
            {uploading ? "Uploading..." : "Select File"}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="m-auto mt-4 h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
        </div>
      </button>
      <input
        type="file"
        onChange={handleFileChange}
        ref={inputFile}
        accept="image/*"
        style={{ display: "none" }}
      />
      {imageUrl && (
        <div className="mt-4">
          <img
            src={imageUrl}
            alt="Selected file"
            className="max-w-xs rounded-lg h-20 sm:h-20 md:h-36 lg:h-40"
          />
        </div>
      )}
    </div>
  );
}

function MetadataFields({
  metadataFields,
  handleMetadataChange,
  removeMetadataField,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metadataFields.map((field, index) => (
        <div key={index} className="flex flex-col">
          <div
          // className="tooltip tooltip-info"
          // data-tip={
          //   index < 3
          //     ? "Required"
          //     : "Trait will be the key in the metadata JSON."
          // }
          >
            <input
              type="text"
              value={field.key}
              onChange={(e) =>
                handleMetadataChange(index, e.target.value, field.value, true)
              }
              placeholder="Trait"
              className="text-gray-700 mb-2 input-md"
              disabled={field.required}
            />
          </div>
          <div
          // className="tooltip tooltip-info"
          // data-tip={
          //   index < 3
          //     ? "Required"
          //     : "Type will be the value in the metadata JSON."
          // }
          >
            <input
              type="text"
              value={field.value}
              onChange={(e) =>
                handleMetadataChange(index, field.key, e.target.value, false)
              }
              placeholder="Type"
              className="text-gray-700 mb-2 input-md"
            />
          </div>
          {!field.required && (
            <button
              onClick={() => removeMetadataField(index)}
              className="input-md bg-red-500 hover:bg-red-700 text-white rounded-md"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

function ActionButtons({
  handleMintArc3,
  resetForm,
  addMetadataField,
  accountAddress,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
      <button
        onClick={addMetadataField}
        className="input-md bg-gradient-to-r from-green-500 to-yellow-400 hover:from-yellow-400 hover:to-green-500 rounded-md"
      >
        Add More Traits
      </button>
      <button
        onClick={resetForm}
        className="input-md bg-gradient-to-r from-yellow-500 to-red-400 hover:from-red-400 hover:to-yellow-500 rounded-md"
      >
        Reset Form
      </button>
      <button
        disabled={!accountAddress}
        onClick={handleMintArc3}
        data-tip={!accountAddress ? "Connect your wallet to mint NFTs." : ""}
        className={`input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md ${
          !accountAddress ? "tooltip tooltip-info" : ""
        }`}
      >
        Mint ARC-3 NFT
      </button>
    </div>
  );
}

function MintingSuccessMessage({ status, congratsImg }) {
  return (
    <div className="w-80">
      <img src={congratsImg} alt="Minted NFT" className="max-w-xs mt-2" />
      <h3 className="mt-4 text-lg font-semibold text-gray-300">
        Successfully minted ARC-3 NFT
      </h3>
      {status && (
        <a
          href={`https://allo.info/tx/${status}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 text-blue-500 hover:underline"
          style={{ wordBreak: "break-word" }}
        >
          Transaction ID: {status}
        </a>
      )}
    </div>
  );
}
