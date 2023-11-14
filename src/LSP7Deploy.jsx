import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import LSP7Mintable from './GroupTokens.json';

const DeployLSP7Contract = () => {
  const [web3, setWeb3] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      // Assuming MetaMask is installed and the user is connected
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        console.log('Web3 initialized:', web3Instance);
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

    const groupTokenName = 'GroupToken';
    const groupTokenSymbol = 'LGT';
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    console.log('Deploying contract with owner:', owner);

    const deployedContract = new web3.eth.Contract(LSP7Mintable.abi);
    console.log('Contract instance created:', deployedContract);

    try {
      const deployedInstance = await deployedContract
        .deploy({
          data: LSP7Mintable.bytecode,
          arguments: [groupTokenName, groupTokenSymbol, owner],
        })
        .send({
          from: owner,
          gas: '4700000', // Adjust the gas limit as needed
        });

      console.log('Contract deployed successfully:', deployedInstance);
      setContractInstance(deployedInstance);
    } catch (error) {
      console.error('Error deploying contract:', error);
    }
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

export { DeployLSP7Contract };
