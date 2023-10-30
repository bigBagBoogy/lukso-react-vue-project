// ConnectUPButton.jsx

import React, { useState } from 'react';
import { connectLUKSO } from './connect';

function ConnectUPButton() {
  const [isConnected, setIsConnected] = useState(false);

  const connectUP = async () => {
    try {
      await connectLUKSO();

      // Check if the user approved the connection
      if (window.ethereum.selectedAddress) {
        setIsConnected(true);
      } else {
        // UP extension not available or not installed
        alert("Please install the LUKSO UP Browser Extension to connect.");
      }
    } catch (error) {
      console.error("Connection error:", error);
      alert("Connection error. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={connectUP}>
        {isConnected ? "Connected" : "Connect UP"}
      </button>
    </div>
  );
}

export { ConnectUPButton };
