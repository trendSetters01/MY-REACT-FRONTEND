import React, { useState, useContext, useRef } from "react";
import { PeraWalletContext } from "../PeraWalletContext";
import { algodClient } from "../../algorand/config";
import { arc69Mint } from "../../algorand/nftMintingHelpers/mintARC69NFT";
import axios from "axios";
import Confetti from "react-confetti";
import congratsImg from "../../images/360_F_106656883_2WufqiyAQOHji3hbQ3oSNvnffa9eECQ6.jpg";

const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

const sendFileToIPFS = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file, { filename: file.name });

    const imageUpload = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
        pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
        "Content-Type": "multipart/form-data",
      },
    });
    return imageUpload.data.IpfsHash;
  } catch (error) {
    console.error("Error sending File to IPFS:", error);
    throw error;
  }
};

export default function MintNFTARC69({ accountAddress }) {
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

  const handleMetadataChange = (index, key, value, isKeyChange) => {
    const newFields = [...metadataFields];
    if (newFields[index].required) {
      newFields[index] = { ...newFields[index], value };
    } else {
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
  const handleMintArc69 = async () => {
    setStatus("Minting ARC-69 NFT...");
    setUploading(true);
    try {
      const ipfsHash = await sendFileToIPFS(file);
      const assetDetails = metadataFields.reduce((acc, field) => {
        acc[field.key] = field.value;
        return acc;
      }, {});

      const txn = await arc69Mint(
        accountAddress,
        {
          standard: "arc69",
          description: assetDetails.description,
          external_url: "https://phantoms-ashy.vercel.app",
          mime_type: file.type,
          properties: {
            ...assetDetails,
            assetName: undefined,
            unitName: undefined,
            description: undefined,
          },
        },
        assetDetails.unitName,
        assetDetails.assetName,
        ipfsHash
      );

      const signedTx = await peraWallet.signTransaction([txn]);
      const txConfirmation = await algodClient
        .sendRawTransaction(signedTx)
        .do();
      setStatus(txConfirmation.txId);

      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setStatus("");
        resetForm();
      }, 10000);
    } catch (error) {
      console.error("Error minting ARC-69 NFT:", error);
      setStatus("Failed to mint ARC-69 NFT.");
      setUploading(false);
    }
  };

  return (
    <div
      style={{ height: "80vh" }}
      className="flex flex-col items-center justify-center"
    >
      {showConfetti && <Confetti width={window.width} height={window.height} />}
      {!accountAddress && (
        <h1 className="animate-pulse text-white">
          Connect your wallet to mint NFTs.
        </h1>
      )}

      {accountAddress && !showConfetti && (
        <div className="w-full max-w-4xl bg-light rounded-lg p-4 text-gray">
          <FileUploadButton
            inputFile={inputFile}
            handleFileChange={handleFileChange}
            uploading={uploading}
            imageUrl={imageUrl} // Pass the image URL to the FileUploadButton
          />
          <MetadataFields
            metadataFields={metadataFields}
            handleMetadataChange={handleMetadataChange}
            addMetadataField={addMetadataField}
            removeMetadataField={removeMetadataField}
          />
          <ActionButtons
            handleMintArc69={handleMintArc69}
            resetForm={resetForm}
          />
        </div>
      )}
      {showConfetti && (
        <MintingSuccessMessage status={status} congratsImg={congratsImg} />
      )}
    </div>
  );
}

function FileUploadButton({
  inputFile,
  handleFileChange,
  uploading,
  imageUrl,
}) {
  return (
    <div className="mb-4 mt-4 flex flex-col items-center justify-center rounded-lg bg-light p-2 text-center text-secondary">
      <button
        disabled={uploading}
        onClick={() => inputFile.current.click()}
        className="mt-2 sm: mt-8 md: mt-8 align-center flex flex-row items-center justify-center rounded-3xl bg-secondary px-8 py-1 text-white transition-all duration-300 ease-in-out hover:bg-accent hover:text-light"
      >
        <div>
          <p className="text-lg font-light">
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
  addMetadataField,
  removeMetadataField,
}) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metadataFields.map((field, index) => (
          <div key={index} className="flex flex-col">
            <input
              type="text"
              value={field.key}
              onChange={(e) =>
                handleMetadataChange(index, e.target.value, field.value, true)
              }
              placeholder="Key"
              className="mb-2 input-md"
              disabled={field.required}
            />
            <input
              type="text"
              value={field.value}
              onChange={(e) =>
                handleMetadataChange(index, field.key, e.target.value, false)
              }
              placeholder="Value"
              className="mb-2 input-md"
            />
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
      <button
        onClick={addMetadataField}
        className="mt-4 input-md bg-gradient-to-r from-green-500 to-yellow-400 hover:from-yellow-400 hover:to-green-500 rounded-md"
      >
        Add Metadata Field
      </button>
    </div>
  );
}

function ActionButtons({ handleMintArc69, resetForm }) {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
      <button
        onClick={resetForm}
        className="input-md bg-gradient-to-r from-yellow-500 to-red-400 hover:from-red-400 hover:to-yellow-500 rounded-md"
      >
        Reset Form
      </button>
      <button
        onClick={handleMintArc69}
        className="input-md bg-gradient-to-r from-purple-500 to-blue-400 hover:from-blue-400 hover:to-purple-500 rounded-md"
      >
        Mint ARC-69 NFT
      </button>
    </div>
  );
}

function MintingSuccessMessage({ status, congratsImg }) {
  return (
    <div className="w-80">
      <img src={congratsImg} alt="Minted NFT" className="max-w-xs mt-2" />
      <h3 className="mt-4 text-lg font-semibold text-gray-300">
        Successfully minted ARC-69 NFT
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
