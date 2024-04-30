import React from "react";
import { PeraOnramp } from "@perawallet/onramp";

export default function PeraOnRampComponent({ accountAddress }) {
  const peraOnramp = new PeraOnramp();

  function handleOnramp() {
    peraOnramp
      .addFunds({
        accountAddress,
      })
      .then(() => {
        console.log("Funds added");
      })
      .catch((error) => {
        console.log("Funds add error: ", error);
      });
  }
  return (
    <button
      disabled={!accountAddress}
      onClick={handleOnramp}
      data-tip={
        !accountAddress
          ? "Please connect your wallet to the parent app."
          : ""
      }
      className={`mt-4 mr-4 bg-gradient-to-r from-gray-500 to-white hover:from-white text-black hover:to-gray-500 rounded-md p-2 flex items-center justify-center ${
        !accountAddress ? "tooltip tooltip-info" : ""
      }`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M13.6063 5.85775C12.7438 3.60197 10.559 2 8 2C4.68629 2 2 4.68629 2 8C2 10.8667 4.01037 13.2638 6.69815 13.8584L6.26422 15.8112C2.6805 15.0184 0 11.8222 0 8C0 3.58172 3.58172 0 8 0C11.4957 0 14.4678 2.24216 15.5565 5.36681L13.6063 5.85775ZM10.4961 7H12.4961V10.498H16V12.498H12.4961V16H10.4961V12.498H7V10.498H10.4961V7Z"
          fill="currentColor"
        ></path>
      </svg>
      Add funds via Pera Onramp (Minimum 50 USD)
    </button>
  );
}
