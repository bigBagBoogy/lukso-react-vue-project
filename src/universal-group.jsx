import React from 'react';
import { Link } from 'react-router-dom'
import { useWeb3 } from './Web3Context';



function UniversalGroup() {
  const { web3, userAddress, setConnectionData } = useWeb3();
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Group Page</h1> 
    </div>
  );
}









export {UniversalGroup};