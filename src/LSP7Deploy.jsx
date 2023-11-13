import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';

const DeployContractComponent = () => {
  const [web3, setWeb3] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      // Assuming MetaMask is installed and the user is connected
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
      }
    };

    initializeWeb3();
  }, []);

  const deployContract = async () => {
    if (!web3) {
      console.error('Web3 not initialized');
      return;
    }

    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];

    const deployedContract = new web3.eth.Contract(LSP7Mintable.abi);

    const deployedInstance = await deployedContract
      .deploy({
        data: LSP7Mintable.bytecode,
        arguments: [owner], // Pass constructor arguments if any
      })
      .send({
        from: owner,
        gas: '4700000', // Adjust the gas limit as needed
      });

    setContractInstance(deployedInstance);
  };

  return (
    <div>
      <button onClick={deployContract}>Deploy LSP7Mintable</button>
      {contractInstance && (
        <div>
          Contract Deployed at Address: {contractInstance.options.address}
        </div>
      )}
    </div>
  );
};

export default DeployContractComponent;
