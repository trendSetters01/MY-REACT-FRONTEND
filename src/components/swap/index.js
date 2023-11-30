import React, { useState, useMemo } from "react";
import CustomDropdown from "../customDropDown";
import coup from "../../images/assets/coup/icon.png";
import usdc from "../../images/assets/USDC-31566704/icon.png";
import algo from "../../images/assets/ALGO/icon.png";
import phntm from "../../images/405c177eb8e44ce2c32cf891b78f7125.webp";
import tether from "../../images/assets/USDt-312769/icon.png";
import gobtc from "../../images/assets/goBTC-386192725/icon.png";
import gousd from "../../images/assets/goUSD-672913181/icon.png";
function Swap() {
  const [firstAssetId, setFirstAssetId] = useState(0); // State for the first asset
  const [secondAssetId, setSecondAssetId] = useState(31566704); // State for the second asset
  // Example list of assets (Replace this with your actual assets list)
  const baseAssetList = [
    { id: 312769, name: "Tether USDt", icon: tether },
    { id: 672913181, name: "goUSD", icon: gousd },
    { id: 386192725, name: "goBTC", icon: gobtc },
    // { id: 386195940, name: "goETH" },
    // { id: 887406851, name: "Wrapped Ether" },
    // { id: 388592191, name: "Chips" },
    // { id: 246516580, name: "Meld Gold (g)" },
    // { id: 246519683, name: "Meld Silver (g)" },
    // { id: 329110405, name: "TacoCoin" },
    // { id: 435335235, name: "Crescendo" },
    // { id: 470842789, name: "Defly Token" },
    // { id: 287867876, name: "Opulous" },
    // { id: 700965019, name: "Vestige" },
    // { id: 1138500612, name: "GORA" },
    // { id: 441139422, name: "goMINT" },
    // { id: 465865291, name: "STBL" },
    { id: 796425061, name: "Coop Coin", icon: coup },
    // { id: 818432243, name: "Dharma Network" },
    // { id: 452399768, name: "Vote Coin" },
    // { id: 227855942, name: "STASIS EURO" },
    // { id: 523683256, name: "AKITA INU" },
    // { id: 1200094857, name: "ChainLink Token" },
    // { id: 792313023, name: "Wrapped SOL" },
    // { id: 403499324, name: "Nexus" },
    // { id: 226701642, name: "Yieldly" },
    // { id: 2751733, name: "Realio Token" },
    // { id: 1237529510, name: "Polkagold" },
    // { id: 987374809, name: "The Legend Projects" },
    // { id: 841126810, name: "STBL2" },
    // { id: 27165954, name: "PLANET" },
    // { id: 137594422, name: "HEADLINE" },
    // { id: 1096015467, name: "Pepe" },
    // { id: 712012773, name: "Cometa" },
    // { id: 1065092715, name: "Cosmic Gold" },
    // { id: 230946361, name: "AlgoGems" },
    // { id: 400593267, name: "DeFi-nite" },
    // { id: 1163259470, name: "Maple Token" },
  ];
  const assetsList = [
    { id: 0, name: "ALGO", icon: algo },
    { id: 31566704, name: "USDC", icon: usdc },
    { id: 1224920582, name: "PHNTM", icon: phntm },
    ...baseAssetList,
    // ... more assets ...
  ];
  const assetsList1 = [
    { id: 31566704, name: "USDC", icon: usdc },
    { id: 0, name: "ALGO", icon: algo },
    { id: 1224920582, name: "PHNTM", icon: phntm },
    ...baseAssetList,
    // ... more assets ...
  ];
  const widgetIframeUrl = useMemo(() => {
    return `https://hipo.github.io/ui098gh4350u9h435y-swap-widget/?platformName=Phantoms&network=mainnet&themeVariables=eyJ0aGVtZSI6ImRhcmsiLCJjb250YWluZXJCdXR0b25CZyI6IiIsIndpZGdldEJnIjoiI2EwNTZmZiIsImhlYWRlckJ1dHRvbkJnIjoiIzgzNDZkMSIsImhlYWRlckJ1dHRvblRleHQiOiIjZmZmZmZmIiwiaGVhZGVyVGl0bGUiOiIjZmZmZmZmIiwiY29udGFpbmVyQnV0dG9uVGV4dCI6IiNmZmZmZmYiLCJpZnJhbWVCZyI6IiNGOEY4RjgiLCJib3JkZXJSYWRpdXNTaXplIjoibm9uZSIsInRpdGxlIjoiU3dhcCIsInNob3VsZERpc3BsYXlUaW55bWFuTG9nbyI6ZmFsc2V9&assetIn=${firstAssetId}&assetOut=${secondAssetId}&platformFeeAccount=JUXKRQVHDITUMMZHIOH2JVNEOGZJXKPS2DHS5OSH6MAE36RIV2FXKRKV2Q&platformFeePercentage=2.5`;
  }, [firstAssetId, secondAssetId]); // Recompute the URL when asset IDs change

  return (
    <div className="flex justify-center items-center h-screen">
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
            title="Phantoms swap widget"
            src={`${widgetIframeUrl}}`}
            style={{ width: 360, height: 440, border: "none" }}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      </div>
    </div>
  );
}

export default Swap;
