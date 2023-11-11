import React from 'react';
import { Link } from 'react-router-dom'
import { Lukso } from './connect.jsx';



function UniversalGroup() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Lukso onConnectionChange={setIsConnected} setConnectionData={setConnectionData} />        
      <h1>Group Page</h1> 
    </div>
  );
}









export {UniversalGroup};