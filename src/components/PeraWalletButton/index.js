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
      className="Wallet-connect"
      onClick={
        isConnectedToPeraWallet
          ? handleDisconnectWalletClick
          : handleConnectWalletClick
      }
    >
      {isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
    </button>
  );
}
