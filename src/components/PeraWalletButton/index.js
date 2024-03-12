import { useEffect, useState, useContext } from "react";
import { PeraWalletContext } from "../PeraWalletContext"; // Import the context

export default function PeraWalletButton({ onConnect }) {
  const [accountAddress, setAccountAddress] = useState(null);
  const isConnectedToPeraWallet = !!accountAddress;

  const peraWallet = useContext(PeraWalletContext);

  useEffect(() => {
    peraWallet
      .reconnectSession()
      .then((accounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        if (accounts.length) {
          const address = accounts[0];
          setAccountAddress(address);
          onConnect(address);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        peraWallet.connector.on("disconnect", handleDisconnectWalletClick);

        const address = newAccounts[0];
        setAccountAddress(address);
        onConnect(address);
      })
      .catch((error) => {
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          console.log(error);
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();
    setAccountAddress(null);
    onConnect(null);
  }

  return (
    <button
      className={`cursor-pointer bg-gradient-to-r from-pink-500 to-blue-500 hover:from-green-400 hover:to-yellow-500 px-3 py-2 rounded-full text-md text-white`}
      onClick={
        isConnectedToPeraWallet
          ? handleDisconnectWalletClick
          : handleConnectWalletClick
      }
    >
      <h2>{isConnectedToPeraWallet ? "Disconnect" : "Connect Wallet"}</h2>
    </button>
  );
}
