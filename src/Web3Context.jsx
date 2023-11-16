// Web3Context.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import Onboard from "@web3-onboard/core";
import injectedModule from '@web3-onboard/injected-wallets';
import { createEIP1193Provider } from "@web3-onboard/common";
import { fetchProfileFromBackend } from './fetch-profile';

const Web3Context = createContext();

const Web3Provider = ({ children }) => {
  const [userAddress, setUserAddress] = useState(null);
  const [userAddressFromLocalStorage, setUserAddressFromLocalStorage] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onboard, setOnboard] = useState(null);

  useEffect(() => {
    const initializeOnboard = async () => {
      try {
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

        const initializedOnboard = Onboard({
          wallets: [injected],
          chains: [
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
          ],
          appMetadata,
          connect: {
            iDontHaveAWalletLink:
              "https://chrome.google.com/webstore/detail/universal-profiles/abpickdkkbnbcoepogfhkhennhfhehfn?hl=en",
            removeWhereIsMyWalletWarning: true,
          },
        });

        setOnboard(initializedOnboard);

        // Check if userAddress is stored in localStorage
        const storedUserAddress = localStorage.getItem('userAddress');
        if (storedUserAddress) {
          setUserAddress(storedUserAddress);
          setUserAddressFromLocalStorage(storedUserAddress);
          setConnectionData();
        }
      } catch (error) {
        console.error('Error initializing onboard:', error);
      }
    };

    initializeOnboard();
  }, []);

  const setConnectionData = async () => {
    try {
      if (!onboard) {
        console.error('Onboard is not initialized');
        return;
      }

      const isConnected = await onboard.walletCheck();
      const address = isConnected ? isConnected[0]?.accounts[0]?.address : null;

      setIsConnected(isConnected);

      if (address) {
        setUserAddress(address);
        setUserAddressFromLocalStorage(address);
        localStorage.setItem('userAddress', address);
        await fetchProfileFromBackend(address);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  useEffect(() => {
    console.log('User Address Updated (State):', userAddress);
    console.log('User Address Updated (LocalStorage):', userAddressFromLocalStorage);
  }, [userAddress, userAddressFromLocalStorage]);

  const contextValue = { userAddress, setConnectionData, userAddressFromLocalStorage, isConnected, onboard };
  
  const debugButtonHandler = () => {
    console.log('Debug Button Clicked! User Address:', userAddress);
    localStorage.setItem('debugUserAddress', userAddress);
  };
  
  return (
    <Web3Context.Provider value={contextValue}>
      {children}
      <button onClick={debugButtonHandler}>Debug: Write User Address to Local Storage</button>
    </Web3Context.Provider>
  );
};

const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export { Web3Provider, useWeb3 };
