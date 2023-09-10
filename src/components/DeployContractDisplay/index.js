import React, { useState } from 'react';

function DeployContractDisplay() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deplotContract = () => {
    setLoading(true);
    fetch("http://localhost:3001/deploy", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      setData(data);
      setLoading(false);
    })
    .catch(error => {
      setError(error);
      setLoading(false);
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={deplotContract}>Deploy</button>
    </div>
  );
}

export default DeployContractDisplay;
