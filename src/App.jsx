// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.svg';
import logo1 from './assets/logo-shine.svg';
import { Lukso } from './connect.jsx';
import { Link } from 'react-router-dom'
import { FetchAssetData } from './fetchassetData.jsx';
import { FetchAssets } from './fetchassets.jsx';
import { FetchAndReadAssetData } from './fetchAndReadAssetData.jsx';
import { LSP3MetadataForm } from './LSP3MetadataForm.jsx';
import { CheckUPConnection } from './checkUPConnection'; 



  function App() {
    const [isConnected, setIsConnected] = useState(false);
     // Callback function to update the connection status
  const handleConnectionChange = (status) => {
    setIsConnected(status);
  };

    useEffect(() => {
      async function checkConnection() {
        const connectionInfo = await CheckUPConnection();
        setIsConnected(connectionInfo.isConnected);
        if (connectionInfo.isConnected) {
          console.log('Connected to UP browser extension', connectionInfo.selectedWallet);
        } else {
          console.log('Not connected to UP browser extension');
        }
      }
  
      checkConnection();
    }, []);
    const handleSubmit = (lsp3Profile) => {
      // This function will be called when the form is submitted in LSP3MetadataForm
      // You can handle the lsp3Profile object here, e.g., send it to the backend.
      // console.log('LSP3 Profile submitted:', lsp3Profile);
    };

  return (
    <>
      <Lukso onConnectionChange={handleConnectionChange} />
      {isConnected && (
       <Link to="/UniversalGroup">Go to Group Page</Link>      )}
      <h1>Lukso Dapp</h1>      
      <div className="parent-container">   
        <img src={logo1} className="logo1" alt="logo1" />  
        <img src={logo} className="logo" alt="logo" /> 
        </div>
        <h2>Create Universal Group</h2>
        <LSP3MetadataForm onSubmit={handleSubmit} /> 
        {/* <FetchAssetData /> 
        <FetchAssets /> 
      <FetchAndReadAssetData /> */}
    </>
  );
}

export default App;
