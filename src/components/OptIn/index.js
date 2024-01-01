import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";

export default function OptInComponent() {
  const { assetId } = useParams(); // Get the asset ID from the URL
  useEffect(() => {
    // Check if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Construct the Pera Wallet opt-in URL
      const optInUrl = `perawallet://?amount=0&asset=${assetId}`;
      // Redirect to the Pera Wallet app for opt-in
      window.location.href = optInUrl;
    }
  }, [assetId]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-10 bg-white shadow-xl rounded-lg">
        {/* Show QR code only for non-mobile users */}
        {!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && (
          <QRCode
            value={`perawallet://?amount=0&asset=${assetId}`}
            size={256}
            className="mx-auto"
          />
        )}
        <p className="text-center mt-4 text-lg font-semibold">
          Scan to Opt-In to Asset{" "}
          <a
            href={`https://allo.info/asset/${assetId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            {assetId}
          </a>
        </p>
      </div>
    </div>
  );
}
