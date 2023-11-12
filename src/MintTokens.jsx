// MintTokensComponent.jsx
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import Web3 from 'web3';

const MintTokensComponent = () => {
  const [mintAmount, setMintAmount] = useState(0);
  const queryClient = useQueryClient();

  const mintTokens = async () => {
    const contractAddress = '0x0D1E3AaA7fD58347bCC8dAD6875f3B377Ab3C13f'; 
    const privateKey = process.env.MY_PRIVATE_KEY; 
    const web3 = new Web3('https://rpc.testnet.lukso.network'); 
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);

    // Replace 'EventTicketsNFTAbi' with the actual ABI or import it from a file
    const EventTicketsNFTAbi = [...]; // Your ABI array

    const contract = new web3.eth.Contract(EventTicketsNFTAbi, contractAddress);

    try {
      // Replace 'mint' with the actual minting function in your smart contract
      const gas = await contract.methods.mint(account.address, mintAmount, true, 'Minting tokens').estimateGas();
      const tx = await contract.methods.mint(account.address, mintAmount, true, 'Minting tokens').send({ gas });

      // Invalidate query to refetch contract state
      queryClient.invalidateQueries(['contractState']); // Replace with the actual query key

      console.log(`Tokens minted successfully! Transaction hash: ${tx.transactionHash}`);
    } catch (error) {
      console.error('Minting failed:', error.message);
    }
  };

  return (
    <div>
      <label>
        Mint Amount:
        <input
          type="number"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
        />
      </label>
      <button onClick={mintTokens}>Mint Tokens</button>
    </div>
  );
};

export default MintTokensComponent;
