import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.svg';
import logo1 from './assets/logo-shine.svg';
import { Lukso } from './connect.jsx';
import { FetchAssetData } from './fetchassetData.jsx';
import { FetchAssets } from './fetchassets.jsx';
import { FetchAndReadAssetData } from './fetchAndReadAssetData.jsx';
import { LSP3MetadataForm } from './LSP3MetadataForm.jsx';

  function App() {
    const handleSubmit = (lsp3Profile) => {
      // This function will be called when the form is submitted in LSP3MetadataForm
      // You can handle the lsp3Profile object here, e.g., send it to the backend.
      // console.log('LSP3 Profile submitted:', lsp3Profile);
    };

  return (
    <>
      <Lukso />
      <h1>Lukso Dapp</h1>      
      <div className="parent-container">   
        <img src={logo1} className="logo1" alt="logo1" />  
        <img src={logo} className="logo" alt="logo" /> 
        </div>
        <h2>Create Universal Group</h2>
        <LSP3MetadataForm onSubmit={handleSubmit} /> 
        <FetchAssetData /> 
        <FetchAssets /> 
      <FetchAndReadAssetData />
    </>
  );
}

export default App;
