import React, { useState, useContext, useEffect } from "react";
import { algodClient } from "../../algorand/config";
import { PeraWalletContext } from "../PeraWalletContext";
import axios from "axios";
import { send } from "../../algorand/transactionHelpers/send";
import { v4 as uuidv4 } from "uuid"; // Import the UUID generator
import phantomsImg from "../../images/raffle-phntm.png";
import Confetti from "react-confetti";

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
  const [raffleResults, setRaffleResults] = useState([]);

  const peraWallet = useContext(PeraWalletContext);
  const API_BASE_URL = "https://phantoms-api.onrender.com/api/v1"; // Replace with your backend URL
  const raffleDeposit = 150; // Pre-set to 150 phntm

  // Fetch results from the backend
  const fetchResults = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/raffle-results`);
      setRaffleResults(response.data.results);
    } catch (error) {
      console.error("Error fetching raffle results:", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

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

  // Function to handle social media sharing
  const shareOnSocialMedia = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      "I just entered the @PhantomPaals Raffle!\nJoin me at"
    );
    const hashtags = encodeURIComponent("PhantomPals,Raffle,Algorand");

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`,
        "_blank"
      );
    }
    // Add more platforms as needed
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
      <div className="flex flex-col items-center justify-center">
        <div className="p-8 bg-gradient-to-br from-gray-700 to-gray-600 border-4 border-gray-600 rounded">
          <div className="items-center text-center">
            <h1
              style={{ fontFamily: "trebuchet ms" }}
              className="m-2 p-2 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-teal-500"
            >
              Raffle
            </h1>
            <h2
              style={{ wordBreak: "break-word", maxWidth: "20em" }}
              className="p-2 text-xl font-extrabold text-yellow-300"
            >
              Draw Date: 11th May 2024
            </h2>
            <a
              href="https://allo.info/asset/1238044254/nft"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline dark:text-blue-400"
            >
              <h3 className="pt-2 pb-4 text-xl font-extrabold text-white">
                Phantom #54
              </h3>
              <img
                className="raffle-image"
                src={phantomsImg}
                alt="Raffle Item"
              />
            </a>

            <br></br>
            <div className="flex flex-col justify-end m-2 p-2">
              <div className="bg-yellow-400 m-2 p-2 text-black font-extrabold">
                150 PHNTM
              </div>
              {accountAddress && raffleResults.length === 0 ? (
                <button
                  disabled={disabled}
                  className="btn btn-primary m-2 p-2"
                  onClick={handleDeposit}
                >
                  Enter
                </button>
              ) : raffleResults.length > 0 ? (
                <span className="pt-4 text-xl text-red-300 animate-pulse">
                  Raffle has ended
                </span>
              ) : (
                <span className="pt-4 text-red-400 animate-pulse">
                  To Enter, Ensure your wallet is connected
                </span>
              )}
            </div>
            <div
              style={{
                maxHeight: "20em",
                maxWidth: "24em",
              }}
            >
              {showLoader && (
                <span className="loading loading-spinner loading-lg text-white">
                  <div className="flex items-center justify-center">
                    Processing ...
                  </div>
                </span>
              )}
              <h1 className="m-2 p-2 text-white">{status}</h1>
              {status === "Registered" && (
                <button
                  class="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 border border-blue-900 rounded"
                  onClick={() => shareOnSocialMedia("twitter")}
                >
                  <Confetti width={window.width} height={window.height} />
                  <div className="flex items-center justify-center gap-2">
                    Share on Twitter
                    <svg
                      width="1.25em"
                      height="1.25em"
                      viewBox="0 0 1200 1227"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="bg-black rounded p-1"
                    >
                      <path
                        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </button>
              )}
              {status !== "Registered" && (<h1
                style={{ wordBreak: "break-word" }}
                className="m-2 p-2 text-white"
              >
                {message}
              </h1>)}
              {status === "Registered" && (
                <div className="tickets">
                  <div className="ticket">
                    <div className="top left"></div>
                    <div className="top right"></div>
                    <div className="bottom left"></div>
                    <div className="bottom right"></div>
                    <div className="ticket_border--dotted">
                      <div className="ticket__text">
                        Raffle Ticket:
                        <div className="ticket__number">
                          {entryId}
                        </div>
                        Good Luck!
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {raffleResults.length === 0 && (
        <div className="mb-2">
          <button
            className="btn btn-primary m-2 p-2"
            onClick={toggleDisplayParticipants}
          >
            Display Participants
          </button>
        </div>
      )}
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
                      <th>Raffle Ticket</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((participant, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>
                          {`${participant?.participantAddress}`.substring(0, 4)}
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
      {raffleResults.length > 0 && (
        <div
          className="m-8 p-8 flex flex-col items-center justify-center bg-white border-4 border-gray-600 rounded text-black"
          style={{ wordBreak: "break-word", maxWidth: "28em" }}
        >
          <h1 className="text-red-600 text-xl">Raffle Results</h1>
          <ul>
            {raffleResults.map((result, index) => (
              <li key={index}>{`Winner Address: ${result.winnerAddress}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Raffle;
