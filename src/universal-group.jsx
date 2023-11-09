import React from 'react';
import { Link } from 'react-router-dom'
import { FetchProfile } from './fetch-profile';


function UniversalGroup() {
  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Group Page</h1> 
      <FetchProfile />     
    </div>
  );
}









export {UniversalGroup};