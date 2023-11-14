import React, { useEffect, useState } from 'react';
import LSP7Mintable from './GroupTokens.json';
import { useWeb3 } from './Web3Context';

const DeployLSP7Contract = () => {
  const { web3, userAddress, setConnectionData } = useWeb3();
  const [contractInstance, setContractInstance] = useState(null);

  useEffect(() => {
    // Assuming userAddress is a variable in the scope of your component
    if (userAddress) {
      // Update connection data using setConnectionData if userAddress is available
      setConnectionData((prevData) => ({
        ...prevData,
        additionalData: 'value', // Add any additional data you need
      }));
    }
  }, [userAddress, setConnectionData]);
  

  const deployContract = async () => {
    if (!web3 || !userAddress) {
      console.error('Web3 not initialized or userAddress not available');
      return;
    }

    const groupTokenName = 'GroupToken';
    const groupTokenSymbol = 'LGT';

    const deployedContract = new web3.eth.Contract(LSP7Mintable.abi);

    try {
      const deployedInstance = await deployedContract
        .deploy({
          data: LSP7Mintable.bytecode,
          arguments: [groupTokenName, groupTokenSymbol, userAddress],
        })
        .send({
          from: userAddress,
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
