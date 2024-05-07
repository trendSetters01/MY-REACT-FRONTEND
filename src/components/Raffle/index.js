import React, { useState, useContext, useEffect } from "react";
import { algodClient } from "../../algorand/config";
import { PeraWalletContext } from "../PeraWalletContext";
import axios from "axios";
import { send } from "../../algorand/transactionHelpers/send";
import { v4 as uuidv4 } from "uuid"; // Import the UUID generator
import phantomsImg from "../../images/raffle-phntm.png";

const Raffle = ({ accountAddress }) => {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [entryId, setEntryId] = useState("");
  const [displayParticipants, setDisplayParticipants] = useState(false);
  const [participants, setParticipants] = useState([]); // Generate 100 participants
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const peraWallet = useContext(PeraWalletContext);
  const API_BASE_URL = "https://phantoms-api.onrender.com/api/v1"; // Replace with your backend URL
  const raffleDeposit = 150; // Pre-set to 150 phntm

  const handleDeposit = async () => {
    setDisabled(true);
    try {
      // Ensure the wallet address is set
      if (!accountAddress) {
        setMessage("Wallet address is not set.");
        return;
      }

      setMessage("Processing your deposit. Please wait...");

      // Construct and send the transaction
      const txn1 = await send(
        accountAddress,
        accountAddress,
        0,
        "0", // '0' for ALGO
        `Phantom Pals: Raffle entry Confirmation receipt for ${accountAddress}${
          new Date().toUTCString() + " " + entryId
        }`
      );

      const txn2 = await send(
        accountAddress,
        "JQONXCP7LYP2O2XQLOPBM6I67LBGCZGEZGHBRRBJBAJEWEIWIRIFZIPXIQ", // Specify the recipient address here
        raffleDeposit * 100000000, // Adjust the amount based on the currency
        "1279721720", // Specify the asset ID for PHNTM or '0' for ALGO
        `Phantom Pals: Raffle Deposit`
      );

      const signedTx = await peraWallet.signTransaction([txn1, txn2]);
      let count = 0;
      for (const signedTxnGroup of signedTx) {
        const { txId } = await algodClient
          .sendRawTransaction(signedTxnGroup)
          .do();

        if (count === 1) {
          setMessage(
            "Deposit sent to the blockchain. Awaiting confirmation from Phantom Pals..."
          );
          setShowLoader(true);
          const newEntryId = `${uuidv4()}-${txId}`; // Generate a new UUID for this entry
          setEntryId(newEntryId); // Save the UUID for potential future use
          // Verify the transaction on your backend
          const response = await axios.post(
            `${API_BASE_URL}/check-raffle-deposit-tx`,
            {
              txId: txId,
              accountAddress,
              entryId: newEntryId,
            }
          );

          const { isConfirmed, correct } = response?.data;

          if (isConfirmed && correct) {
            setShowLoader(false);
            setStatus("Registered");
            setMessage(
              `Deposit confirmed. You are now registered for the raffle! Your Entry ID is: ${newEntryId}`
            );
            fetchParticipants();
          } else {
            setMessage(
              "Deposit verification failed. Please contact support@phantomshub.com or reach out to us on Discord."
            );
          }
        } else {
          setMessage("Deposit failed. Please try again.");
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
        count++;
        setTransactionId(txId);
      }
    } catch (error) {
      console.error("Deposit error:", error);
      setMessage("Deposit failed. Please try again.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    // Fetch participants when the component mounts or showParticipants changes
    if (displayParticipants) {
      fetchParticipants();
    }
  }, [displayParticipants]);

  // Adjusted fetchParticipants to handle the new structure
  const fetchParticipants = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/get-nft-raffle-one-participants`
      );
      setParticipants(response.data.participants || []);
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const toggleDisplayParticipants = () => {
    setDisplayParticipants(!displayParticipants);
  };

  // Adjusted the UI for depositing and registering
  return (
    <div className="flex flex-col items-center justify-center gap-y-2 p-4 lg:gap-x-2 lg:p-4">
      <style>
        {`
          .participants {
            overflow: auto;
            max-height: 32em;
          }
          
          .connect-wallet {
            margin-top: 24em;
          }

          @media (max-width: 768px) {
            .participants {
              max-width: 16em;
            }
            .connect-wallet {
              margin-top: 16em;
            }  
          }

          @media (min-width: 769px) {
            .participants {
              max-width: 96em;
            }
            .connect-wallet {
              margin-top: 24em;
            }  
          }
        `}
      </style>
      {!accountAddress && (
        <h1 className="connect-wallet animate-pulse text-white">
          Connect your wallet to participate.
        </h1>
      )}
      {accountAddress && (
        <>
          <div className="p-8 flex flex-col items-center justify-center">
            <div className="p-8 bg-white border-4 border-gray-600 rounded">
              <div className="items-center text-center">
                <h1 className="m-2 p-2 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-500">
                  Raffle
                </h1>
                <h2
                  style={{ wordBreak: "break-word", maxWidth: "20em" }}
                  className="p-2 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-red-500"
                >
                  Draw Date: 11th May 2024
                </h2>
                <a
                  href="https://t.co/aiJqcXi2Ae"
                  className="text-blue-500 hover:underline dark:text-blue-400"
                >
                  Join our Discord for draw results and more information.
                </a>
                <a
                  href="https://allo.info/asset/1238044254/nft"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline dark:text-blue-400"
                >
                  <h3 className="pt-2 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-black to-black">
                    Phantom #54
                  </h3>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "2px solid white",
                      borderRadius: "10px",
                      maxHeight: "20em",
                      maxWidth: "24em",
                      paddingTop: "1em",
                    }}
                    src={phantomsImg}
                    alt="roadmap"
                  />
                </a>

                <br></br>
                <div className="flex flex-col justify-end m-2 p-2">
                  <div className="bg-yellow-400 m-2 p-2 text-black font-extrabold">
                    150 PHNTM
                  </div>
                  <button
                    disabled={disabled}
                    className="btn btn-primary m-2 p-2"
                    onClick={handleDeposit}
                  >
                    Enter
                  </button>
                </div>
                <div
                  style={{
                    maxHeight: "20em",
                    maxWidth: "24em",
                  }}
                >
                  {showLoader && (
                    <span className="loading loading-spinner loading-lg text-black">
                      <div className="flex items-center justify-center">
                        Processing ...
                      </div>
                    </span>
                  )}
                  <h1 className="m-2 p-2 text-black">{status}</h1>
                  <h1
                    style={{ wordBreak: "break-word" }}
                    className="m-2 p-2 text-black"
                  >
                    {message}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <button
              className="btn btn-primary m-2 p-2"
              onClick={toggleDisplayParticipants}
            >
              Display Participants
            </button>
          </div>
          {displayParticipants && (
            <div className="m-8 p-8 flex flex-col items-center justify-center">
              <div className="p-8 bg-white border-4 border-gray-600 rounded">
                <div className="items-center text-center">
                  <h1 className="m-2 p-2 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-blue-500">
                    Participants
                  </h1>
                  <div className="participants">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Address</th>
                          <th>Entry ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {participants.map((participant, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>
                              {`${participant?.participantAddress}`.substring(
                                0,
                                4
                              )}
                              ...
                              {`${participant?.participantAddress}`.substring(
                                `${participant?.participantAddress}`.length - 4,
                                `${participant?.participantAddress}`.length
                              )}
                            </td>
                            <td>
                              {`${participant?.entryId}`.substring(0, 12)}...
                              {`${participant?.entryId}`.substring(
                                `${participant?.entryId}`.length - 12,
                                `${participant?.entryId}`.length
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Raffle;
