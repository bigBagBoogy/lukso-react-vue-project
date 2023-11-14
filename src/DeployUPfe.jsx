// DeployUPfe.jsx
import Web3 from "web3";
import { LSPFactory } from "@lukso/lsp-factory.js";
import { LSP3MetadataForm } from './LSP3MetadataForm.jsx';

async function createUniversalProfile() {
  const lsp3Profile = LSP3MetadataForm;
  console.log("running deployUP with: ", lsp3Profile);

  await ethereum.request({ method: 'eth_requestAccounts', params: [] });
  const lspFactory = new LSPFactory(ethereum, {
    chainId: 4201,
  });
  const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    console.log("owner: ", owner);

  const deployedContracts = await lspFactory.UniversalProfile.deploy({
    controllerAddresses: [owner],
    lsp3Profile: lsp3Profile,
  });
  console.log("ran create Universal Profile...");

  const myUPAddress = deployedContracts.LSP0ERC725Account.address;
  console.log("my Universal Profile address: ", myUPAddress);

  return myUPAddress;
}

export { createUniversalProfile };
