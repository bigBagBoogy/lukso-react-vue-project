import React from 'react';
import { Link } from 'react-router-dom'
import { ConnectUP } from './connect.jsx';
import { useWeb3 } from './Web3Context';



function UniversalGroup() {
  const { web3, userAddress, setConnectionData } = useWeb3();
  return (
    <div>
      <Link to="/">Home</Link>
      <ConnectUP onConnectionChange={setIsConnected} setConnectionData={setConnectionData} />        
      <h1>Group Page</h1> 
    </div>
  );
}









export {UniversalGroup};