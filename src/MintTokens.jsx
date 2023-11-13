import React, { useState } from 'react';
import { web3 } from 'web3'; // Make sure 'web3' is properly imported

const MintButton = ({ contractAbi, contractBytecode }) => {
  const [mintingStatus, setMintingStatus] = useState(null);

  const handleMint = async () => {
    try {
      // Check if the browser has the necessary web3 object
      if (!window.web3) {
        throw new Error('No web3 object found. Make sure Lukso extension is installed.');
      }

      const accounts = await web3.eth.getAccounts();
      const deployer = accounts[0];

      // Replace 'LSP7GroupToken' with the correct contract class
      const LSP7GroupToken = new web3.eth.Contract(contractAbi);

      // Deploy the contract
      const deployedContract = await LSP7GroupToken.deploy({
        data: contractBytecode,
        arguments: ['Group-token', 'LGT', deployer],
      }).send({
        from: deployer,
      });

      setMintingStatus(`Contract deployed at address: ${deployedContract.options.address}`);
    } catch (error) {
      setMintingStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={handleMint}>Mint Tokens</button>
      {mintingStatus && <p>{mintingStatus}</p>}
    </div>
  );
};

export default MintButton;
