import React from 'react';
import QRCode from 'qrcode.react';

const PaymentsWithQRCode = ({ amount, assetId }) => {
  // Check if the user is on a mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const basePeraWalletUrl = 'perawallet://';
  let paymentUrl;

  // Adjusted to include the transaction note for ASA transfers
  if (assetId) {
    // Construct the URL for ASA transfer with an note
    console.log("assetId", assetId);
    paymentUrl = `${basePeraWalletUrl}JQONXCP7LYP2O2XQLOPBM6I67LBGCZGEZGHBRRBJBAJEWEIWIRIFZIPXIQ?amount=${amount}&asset=${assetId}&xnote=Thankyou%20for%20your%20purchase!`;
  } else {
    // Construct the URL for ALGO transfer
    paymentUrl = `${basePeraWalletUrl}JQONXCP7LYP2O2XQLOPBM6I67LBGCZGEZGHBRRBJBAJEWEIWIRIFZIPXIQ?amount=${amount}&note=Thank%20you%20for%20your%20purchase!`;
  }

  // Redirect mobile users to Pera Wallet for payment
  if (isMobile) {
    window.location.href = paymentUrl;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-10 bg-white shadow-xl rounded-lg">
        {/* Show QR code only for non-mobile users */}
        {!isMobile && (
          <QRCode
            value={paymentUrl}
            size={256}
            className="mx-auto"
          />
        )}
        <p className="text-center mt-4 text-lg font-semibold">
          Scan to Pay with {assetId ? `Asset ID: ${assetId}` : 'ALGO'}
        </p>
        {assetId && !isMobile && (
          <a
            href={`https://allo.info/asset/${assetId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 block text-center mt-2"
          >
            View Asset on Allo
          </a>
        )}
      </div>
    </div>
  );
};

export default PaymentsWithQRCode;
