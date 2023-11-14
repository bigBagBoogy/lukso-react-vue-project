// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.svg';
import logo1 from './assets/logo-shine.svg';
import { ConnectUP } from './connect.jsx';
import { Link } from 'react-router-dom'
import { FetchAssetData } from './fetchassetData.jsx';
import { FetchAssets } from './fetchassets.jsx';
import { FetchAndReadAssetData } from './fetchAndReadAssetData.jsx';
import { LSP3MetadataForm } from './LSP3FEmetaDataFormFE.jsx';
import { CheckUPConnection } from './checkUPConnection'; 
// import { FetchProfile } from './fetch-profile.jsx';



  function App() {
    const [connectionData, setConnectionData] = useState({
      isConnected: false,
      userAddress: null,
    });
    const [showForm, setShowForm] = useState(false);

    const handleButtonClick = () => {
      setShowForm(!showForm);
    };
  
    // Callback function to update the connection status and user address  
const setIsConnected = (status, userAddress) => {
  console.log('Connection Status:', status);
  console.log('User Address:', userAddress);
  setConnectionData((prevData) => ({
    ...prevData,
    isConnected: status,
    userAddress: userAddress,
  }));
};
    const handleSubmit = (lsp3Profile) => {
      // This function will be called when the form is submitted in LSP3MetadataForm
      // You can handle the lsp3Profile object here, e.g., send it to the backend.
      // console.log('LSP3 Profile submitted:', lsp3Profile);
    };

  return (
    <>
        <h1>Lukso Dapp</h1>      
        <div className="parent-container">   
        <img src={logo1} className="logo1" alt="logo1" />  
        <img src={logo} className="logo" alt="logo" /> 
        </div>
        {/* only show the form onClick */}
        <button onClick={handleButtonClick}>Create Universal Group</button>
        {showForm && <LSP3MetadataForm onSubmit={handleSubmit} />} 
        {/* if connected, show the "go group page button" */}
        <ConnectUP
        onConnectionChange={(status, userAddress) => setIsConnected(status, userAddress)}
        setConnectionData={setConnectionData}
      />        
        {connectionData.isConnected && (
        <Link to="/UniversalGroup">Go to Group Page</Link>
      )}
    </>
  );
}

export default App;
