import React from 'react';
import PaymentQRCodeComponent from '../PaymentsWithQRCode'; // Adjust the import path based on your file structure

// Example component for a Special Dinner payment
const SpecialDinnerPayment = () => {
  return (
    <>
      <PaymentQRCodeComponent amount="100000" /> {/* 10 ALGO, note: amount is in microAlgos (1 ALGO = 1,000,000 microAlgos) */}
    </>
  );
};

// Example component for Merchandise Payment using PHNTM tokens
const MerchandisePayment = () => {
  return (
    <>
      <PaymentQRCodeComponent amount="500000" assetId="1279721720" /> {/* 50 PHNTM, amount is in the smallest unit of the ASA */}
    </>
  );
};

export { SpecialDinnerPayment, MerchandisePayment };
