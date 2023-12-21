import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import CustomDropdown from "../customDropDown";
import { WidgetController } from "@tinymanorg/tinyman-swap-widget-sdk";
import { PeraWalletContext } from "../PeraWalletContext";

function Swap({ accountAddress }) {
  const [firstAssetId, setFirstAssetId] = useState(0); // State for the first asset
  const [secondAssetId, setSecondAssetId] = useState(31566704); // State for the second asset
  const [iframeUrl, setIframeUrl] = useState("");

  // Example list of assets (Replace this with your actual assets list)
  const baseAssetList = [
    { id: 312769, name: "Tether USDt" },
    { id: 672913181, name: "goUSD" },
    { id: 386192725, name: "goBTC" },
    { id: 386195940, name: "goETH" },
    { id: 887406851, name: "Wrapped Ether" },
    { id: 388592191, name: "Chips" },
    { id: 246516580, name: "Meld Gold (g)" },
    { id: 246519683, name: "Meld Silver (g)" },
    { id: 329110405, name: "TacoCoin" },
    { id: 435335235, name: "Crescendo" },
    { id: 470842789, name: "Defly Token" },
    { id: 287867876, name: "Opulous" },
    { id: 700965019, name: "Vestige" },
    { id: 1138500612, name: "GORA" },
    { id: 441139422, name: "goMINT" },
    { id: 465865291, name: "STBL" },
    { id: 796425061, name: "Coop Coin" },
    { id: 818432243, name: "Dharma Network" },
    { id: 452399768, name: "Vote Coin" },
    { id: 227855942, name: "STASIS EURO" },
    { id: 523683256, name: "AKITA INU" },
    { id: 1200094857, name: "ChainLink Token" },
    { id: 792313023, name: "Wrapped SOL" },
    { id: 403499324, name: "Nexus" },
    { id: 226701642, name: "Yieldly" },
    { id: 2751733, name: "Realio Token" },
    { id: 1237529510, name: "Polkagold" },
    { id: 987374809, name: "The Legend Projects" },
    { id: 841126810, name: "STBL2" },
    { id: 27165954, name: "PLANET" },
    { id: 137594422, name: "HEADLINE" },
    { id: 1096015467, name: "Pepe" },
    { id: 712012773, name: "Cometa" },
    { id: 1065092715, name: "Cosmic Gold" },
    { id: 230946361, name: "AlgoGems" },
    { id: 400593267, name: "DeFi-nite" },
  ];
  const assetsList = [
    { id: 0, name: "ALGO" },
    { id: 31566704, name: "USDC" },
    { id: 1224920582, name: "PHNTM" },
    ...baseAssetList,
    // ... more assets ...
  ];
  const assetsList1 = [
    { id: 31566704, name: "USDC" },
    { id: 0, name: "ALGO" },
    { id: 1224920582, name: "PHNTM" },
    ...baseAssetList,
    // ... more assets ...
  ];

  const peraWallet = useContext(PeraWalletContext);

  // Keep a reference to the widget iframe, so we can get its contentWindow for messaging
  const iframeRef = useRef(null);

  /**
   * If the callbacks have dependencies to state variables (in this case `account`),
   * make sure to wrap them in useCallback to prevent infinite loops.
   */
  const onTxnSignRequest = useCallback(
    async ({ txGroups }) => {
      try {
        // Sign the txns with the project's wallet integration
        const txn = [...txGroups];
        const signedTxns = await peraWallet.signTransaction(txn);

        // Send the signed txns to the widget, so it can send them to the blockchain
        WidgetController.sendMessageToWidget({
          data: { message: { type: "TXN_SIGN_RESPONSE", signedTxns } },
          targetWindow: iframeRef.current?.contentWindow,
        });
      } catch (error) {
        // Let widget know that the txn signing failed
        WidgetController.sendMessageToWidget({
          data: { message: { type: "FAILED_TXN_SIGN", error } },
          targetWindow: iframeRef.current?.contentWindow,
        });
      }
    },
    [accountAddress]
  );
  const onTxnSignRequestTimeout = useCallback(() => {
    console.error("txn sign request timed out");
  }, []);

  const onSwapSuccess = useCallback(async (response) => {
    console.log({ response });
  }, []);

  useEffect(() => {
    // Update iframeUrl when asset IDs change
    const newIframeUrl = WidgetController.generateWidgetIframeUrl({
      platformName: "Phantom swap",
      useParentSigner: true,
      assetIds: [firstAssetId, secondAssetId],
      network: "mainnet",
      themeVariables: {
        theme: "dark",
        containerButtonBg: "#2cbca2",
        widgetBg: "#a056ff",
        headerButtonBg: "#8346d1",
        headerButtonText: "#ffffff",
        headerTitle: "#ffffff",
        containerButtonText: "#ffffff",
        iframeBg: "#F8F8F8",
        borderRadiusSize: "none",
        title: "Phantoms Swap",
        shouldDisplayTinymanLogo: false,
      },
      accountAddress,
      platformFeePercentage: 1,
      platformFeeAccount:
        "JUXKRQVHDITUMMZHIOH2JVNEOGZJXKPS2DHS5OSH6MAE36RIV2FXKRKV2Q",
    });
    setIframeUrl(newIframeUrl);
  }, [
    firstAssetId,
    secondAssetId,
    onSwapSuccess,
    onTxnSignRequest,
    onTxnSignRequestTimeout,
  ]);

  useEffect(() => {
    // Setup widget controller and event listeners
    const swapController = new WidgetController({
      onTxnSignRequest,
      onTxnSignRequestTimeout,
      onSwapSuccess,
    });

    swapController.addWidgetEventListeners();

    return () => {
      swapController.removeWidgetEventListeners();
    };
  }, [onSwapSuccess, onTxnSignRequest, onTxnSignRequestTimeout]);

  return (
    <div
      style={{ height: "80vh" }}
      className="flex flex-col items-center justify-center text-white"
    >
      {!accountAddress && (
        <h1 className="animate-pulse text-white">
          Connect your wallet to swap assets.
        </h1>
      )}

      {accountAddress && (
        <div className="grid grid-cols-2 gap-4">
          {/* First Column for First Asset */}
          <div>
            <CustomDropdown
              label="Swap From"
              assets={assetsList}
              onSelect={setFirstAssetId}
            />
          </div>

          {/* Second Column for Second Asset */}
          <div>
            <CustomDropdown
              label="Swap To Asset"
              assets={assetsList1}
              onSelect={setSecondAssetId}
            />
          </div>

          {/* Third Column for Tinyman Widget */}
          <div className="col-span-2">
            <iframe
              ref={iframeRef}
              title={"tinyman swap widget"}
              className={"swap-widget-test-page__content__iframe"}
              style={{ width: 370, height: 440, border: "none" }}
              src={iframeUrl}
              sandbox={
                "allow-same-origin allow-scripts allow-popups allow-forms"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Swap;
