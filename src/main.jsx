// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import App from './App.jsx'
import './index.css'
import { UniversalProfile } from '@lukso/lsp-factory.js';  // might not need this here
import { UniversalGroup } from './universal-group.jsx';
import { CheckUPConnection } from './checkUPConnection'; // Import the component
import { Web3Provider } from './Web3Context';

ReactDOM.createRoot(document.getElementById('root')).render(

<BrowserRouter>  
  <Web3Provider>
    <Routes>
     <Route path="/" element={<App />} /> {/* Main page */}
     <Route path="/UniversalGroup" element={<UniversalGroup />} /> {/* Group Page */}
    </Routes>
  </Web3Provider> 
</BrowserRouter>,
)
