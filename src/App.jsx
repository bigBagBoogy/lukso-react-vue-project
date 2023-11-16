// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.svg';
import logo1 from './assets/logo-shine.svg';
import { useWeb3 } from './Web3Context';
import { Link } from 'react-router-dom'
import { FetchAssetData } from './fetchassetData.jsx';
import { FetchAssets } from './fetchassets.jsx';
import { FetchAndReadAssetData } from './fetchAndReadAssetData.jsx';
import { LSP3MetadataForm } from './LSP3FEmetaDataFormFE.jsx';
import { CheckUPConnection } from './checkUPConnection'; 
// import { FetchProfile } from './fetch-profile.jsx';
const App = () => {
  const { isConnected, userAddress, onboard, onboardLoading } = useWeb3();
  console.log("isConnected, userAddress", isConnected, userAddress);

  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleConnectButtonClick = async () => {
    try {
      if (!onboardLoading) {
        await onboard.connectWallet();
        // Additional logic after successful wallet connection
      } else {
        console.log('Onboard is still loading. Please wait.');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

    const handleSubmit = (lsp3Profile) => {
      // This function will be called when the form is submitted in LSP3MetadataForm
      // You can handle the lsp3Profile object here, e.g., send it to the backend.
      // console.log('LSP3 Profile submitted:', lsp3Profile);
    };

  return (
    <> 
        <button onClick={handleConnectButtonClick}>Connect Wallet</button>
        <h1>Lukso Dapp</h1>      
        <div className="parent-container">   
        <img src={logo1} className="logo1" alt="logo1" />  
        <img src={logo} className="logo" alt="logo" /> 
        </div>
        {/* only show the form onClick */}
        <button onClick={handleButtonClick}>Create Universal Group</button>
        {showForm && <LSP3MetadataForm onSubmit={handleSubmit} />}      
    </>
  );
}

export default App;
