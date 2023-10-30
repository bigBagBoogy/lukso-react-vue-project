// App.jsx

import { useState } from 'react'
import './App.css'
import logo from './assets/logo.svg'
import logo1 from './assets/logo-shine.svg'
import { ConnectUPButton } from './ConnectUPButton.jsx';


function App() {

  return (
    <>
      <ConnectUPButton/>  
      <h1>Lukso Dapp</h1> 
      <div className="parent-container">   
      <img src={logo1} className="logo1" alt="logo1" />  
      <img src={logo} className="logo" alt="logo" />      
      </div>   
    </>
  )
}

export default App
