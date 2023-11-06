// deployUP.jsx

import { LSPFactory } from '@lukso/lsp-factory.js';

async function DeployUP(myLSP3MetaData) {
    console.log("got to here 1a!")
  
      // User is connected to UP extension
      await ethereum.request({ method: 'eth_requestAccounts', params: [] });
      //await ethereum.request({ method: 'eth_requestAccounts', params: [{ chainId: '0x1069' }] });

      
      const lspFactory = new LSPFactory(ethereum, {
        chainId: 4201,
      });
      console.log("got to here! 2");
      const myContracts = await lspFactory.UniversalProfile.deploy({
          controllerAddresses: [], // When empty, it will will prompt UP
          lsp3Profile: myLSP3MetaData,
        });
        console.log("got to here! 3");
        const myUPAddress = myContracts.LSP0ERC725Account.address;
        console.log("myUP: ",myUPAddress);
   
  }
  export {DeployUP};

