import React from "react";
import PeraOnRampComponent from "../PeraOnRamp";

export default function OnRamp({ accountAddress }) {
  return (
    <div
      style={{
        wordWrap: "break-word",
        maxHeight: "100vh",
        minHeight: "71vh",
        maxWidth: "100vw",
        minWidth: "80vw",
      }}
      className="flex flex-col items-center justify-center text-white"
    >
      <div className="flex flex-col items-center justify-center ml-2 mb-4 text-white">
        No Crypto ? get some using the on ramp button below.
        {!accountAddress ? (
          <span className="text-red-400 animate-pulse">
            Ensure your wallet is connected
          </span>
        ) : (
          <></>
        )}
        <PeraOnRampComponent accountAddress={accountAddress} />
      </div>
    </div>
  );
}
