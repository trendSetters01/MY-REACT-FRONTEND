import React, { useState } from 'react';
import PeraWalletButton from './components/PeraWalletButton';
import DisplayAccountInformation from './components/DisplayAccountInformation'; // Import the component
import './App.css';

function App() {
  const [connectedAccountAddress, setConnectedAccountAddress] = useState(null);

  return (
    <div className="App">
      <header className='App-header'>
      <PeraWalletButton onConnect={setConnectedAccountAddress} />
      {connectedAccountAddress && <DisplayAccountInformation accountAddress={connectedAccountAddress} />}
      </header>
    </div>
  );
}

export default App;
