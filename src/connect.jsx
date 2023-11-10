import React, { useMemo } from 'react';

import { createEIP1193Provider } from "@web3-onboard/common";
import Onboard from "@web3-onboard/core";
import injectedModule from '@web3-onboard/injected-wallets';

const Lukso = ({ onConnectionChange }) => {
  // Define the Lukso wallet module
  const lukso = {
    injectedNamespace: "lukso",
    label: "Universal Profiles",
    getIcon: async () => (await import("./icon.js")).default,
    checkProviderIdentity: ({ provider }) =>
      !!provider && !!provider.isUniversalProfileExtension,
    getInterface: async () => {
      if ("lukso" in window) {
        const anyWindow = window;
        return {
          provider: createEIP1193Provider(anyWindow.lukso),
        };
      }
      window.open(
        "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
        "_blank"
      );
      throw new Error(
        "Please install LUKSO Universal Profile extension before proceeding"
      );
    },
    platforms: ["all"],
    externalUrl:
      "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
  };

  // Define the injected wallet module using Lukso
  const injected = injectedModule({
    custom: [lukso],
    sort: (wallets) => {
      const sorted = wallets.reduce((sorted, wallet) => {
        if (wallet.label === "Universal Profiles") {
          sorted.unshift(wallet);
        } else {
          sorted.push(wallet);
        }
        return sorted;
      }, []);
      return sorted;
    },
    displayUnavailable: ["Universal Profiles"],
  });

  // Define chains and other configurations as needed
  const chains = [
    {
      id: 1,
      token: "LYX",
      label: "LUKSO Mainnet",
      rpcUrl: "https://rpc.lukso.gateway.fm/",
    },
    {
      id: 2,
      token: "LYXt",
      label: "LUKSO Testnet",
      rpcUrl: "https://rpc.testnet.lukso.gateway.fm/",
    },
  ];

  const LOGO = `<svg></svg>`;

  const appMetadata = {
    name: "LUKSO Test dApp",
    icon: LOGO,
    logo: LOGO,
    description: "My test dApp using Web3 Onboard",
    recommendedInjectedWallets: [
      {
        name: "Universal Profiles",
        url: "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
      },
    ],
  };

  // Define connect options
  const connect = {
    iDontHaveAWalletLink:
      "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
    removeWhereIsMyWalletWarning: true,
  };

  // Initialize Onboard
  const onboard = useMemo(() => {
    return Onboard({
    wallets: [injected], // Injected wallet module
    chains,
    appMetadata,
    connect,
  });
}, []); // Pass an empty dependency array to ensure it's created once

  // Connect the wallet
  const connectWallet = async () => {
    try {
      const connectedWallets = await onboard.connectWallet();
      console.log('Connected wallets:', connectedWallets);
      console.log('user address:',  connectedWallets[0].accounts[0].address);
  
      // Check for the 'Universal Profiles' wallet by label
      onConnectionChange(connectedWallets.some(wallet => wallet.label === 'Universal Profiles'));
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };
  


  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};

export {Lukso};
