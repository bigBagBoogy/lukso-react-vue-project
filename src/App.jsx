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
  
    // Callback function to update the connection status
    const setIsConnected = (status) => {
      setConnectionData((prevData) => ({
        ...prevData,
        isConnected: status,
      }));
    }
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
        <button onClick={handleButtonClick}>Create Universal Group</button>
      {showForm && <LSP3MetadataForm onSubmit={handleSubmit} />} 
        {/* <FetchAssetData /> 
        <FetchAssets />  */}
 <Lukso onConnectionChange={setIsConnected} setConnectionData={setConnectionData} />        
   
      {connectionData.isConnected && (
        <Link to="/UniversalGroup">Go to Group Page</Link>
      )}
    </>
  );
}

export default App;
