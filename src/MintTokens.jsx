// MintTokensComponent.jsx
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import Web3 from 'web3';
import {
  LSPFactory,
  useWeb3Connection,
} from '@lukso/lsp-factory.js/build/main/src/lib/index';
import { ProfileDataForEncoding } from '@lukso/lsp-factory.js/build/main/src/lib/interfaces/lsp3-profile'
import {
  DeployedUniversalProfileContracts,
  LSPFactory,
  ContractDeploymentOptions,
  ProfileDataBeforeUpload,
  ProfileDeploymentOptions,
} from '@lukso/lsp-factory.js'

import { UploadOptions } from '@lukso/lsp-factory.js/build/main/src/lib/interfaces/profile-upload-options'
import { getSelectedNetworkConfig } from '@/helpers/config'
import {
  DeployedLSP7DigitalAsset,
  DigitalAssetDeploymentOptions,
  LSP7DigitalAssetDeploymentOptions,
} from '@lukso/lsp-factory.js/build/main/src/lib/interfaces/digital-asset-deployment'
import useWeb3Connection from './useWeb3Connection'


let lspFactory;

const { getProvider } = useWeb3Connection();

const setupLSPFactory = () => {
  const provider = getProvider();
  lspFactory = new LSPFactory(provider, {
    chainId: getSelectedNetworkConfig().chainId,
  });
};


const deployLSP7DigitalAsset = async (digitalAssetDeploymentOptions) => {
  return await lspFactory.LSP7DigitalAsset.deploy(digitalAssetDeploymentOptions);
};

export function useLspFactory() {
  const hasExtension = !!getProvider();
  if (!hasExtension) {
    throw new Error('Extension not installed');
  }
  setupLSPFactory();

  return {    
    deployLSP7DigitalAsset,
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
