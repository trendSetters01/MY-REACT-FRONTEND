import React, { useState, useEffect } from 'react';

function DisplayAccountInformation({ accountAddress }) {
    const [accountData, setAccountData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (accountAddress) {
            fetchAccountData();
        }
    }, [accountAddress]);

    const fetchAccountData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/account-info/${accountAddress}`);
            const data = await response.json();
            if (data.success) {
                setAccountData(data);
            } else {
                setError(data.message);
            }
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch account data:", err);
            setError("Error fetching account data. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <p>Loading account data...</p>}
            {error && <p>Error: {error}</p>}
            {accountData && (
                <div>
                    <p><strong>Address:</strong> {accountData.address}</p>
                    <p><strong>Balance:</strong> {accountData.balance} microAlgos</p>
                    {/* Add other fields as required */}
                </div>
            )}
        </div>
    );
}

export default DisplayAccountInformation;
