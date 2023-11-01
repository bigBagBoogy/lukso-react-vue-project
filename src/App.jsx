import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.svg';
import logo1 from './assets/logo-shine.svg';
import { Lukso } from './connect.jsx';
import { FetchAssetData } from './fetchassetData.jsx';
import { FetchAssets } from './fetchassets.jsx';
import { FetchAndReadAssetData } from './fetchAndReadAssetData.jsx';

function App() {
  
  return (
    <>
      <Lukso />
      <h1>Lukso Dapp</h1>      
      <div className="parent-container">   
        <img src={logo1} className="logo1" alt="logo1" />  
        <img src={logo} className="logo" alt="logo" /> 
        </div>
        <FetchAssetData /> 
        <FetchAssets /> 
      <FetchAndReadAssetData />
    </>
  );
}

export default App;
