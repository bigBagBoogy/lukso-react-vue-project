import { useState, useEffect } from 'react';
import { Contract } from 'web3-eth-contract';
import useNotifications from '@/compositions/useNotifications';
import LSP7Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP7Mintable.json';
import LSP8Mintable from '@lukso/lsp-smart-contracts/artifacts/LSP8Mintable.json';
import { DEFAULT_GAS, DEFAULT_GAS_PRICE } from '@/helpers/config';
import Notifications from '@/components/Notification.vue';
import { toWei } from 'web3-utils';
import { ERC725 } from '@erc725/erc725.js';
import Lsp4MetadataForm from '@/components/shared/Lsp4MetadataForm.vue';
import { ContractStandard } from '@/enums';
import LSPSelect from '@/components/shared/LSPSelect.vue';
import { padLeft } from 'web3-utils';
import { TokenInfo, LSPType } from '@/helpers/tokenUtils';
import useWeb3Connection from '@/compositions/useWeb3Connection';

const MintComponent = () => {
  const [notification, setNotification] = useState(null);
  const [hasNotification, setHasNotification] = useState(false);
  const [tokenType, setTokenType] = useState(ContractStandard.LSP7);
  const [myToken, setMyToken] = useState(null);
  const [mintToken, setMintToken] = useState('');
  const [tokenId, setTokenId] = useState(padLeft(1, 64));
  const [mintReceiver, setMintReceiver] = useState('');
  const [mintAmount, setMintAmount] = useState(100);
  const [lsp4Metadata, setLsp4Metadata] = useState({
    description: 'My super description',
    links: [
      {
        title: 'LUKSO Docs',
        url: 'https://docs.lukso.tech',
      },
    ],
  });
  const [creators, setCreators] = useState([getState('address')]);

  const metadataJsonUrl =
    '0x6f357c6a6143da573459ba01321df3eb223e96b0015c2914a1907df319804573d538c311697066733a2f2f516d51357071797167637a6d6b736e4e434a734a76333453664469776e4676426d64456f74704254337642464865';

  const { getState, contract } = useWeb3Connection();

  useEffect(() => {
    setMintReceiver(getState('address'));
    setMintToken(getState('tokenAddress'));
  }, [getState]);

  const handleNewLsp4Metadata = (metadata, newCreators) => {
    setLsp4Metadata(metadata);
    setCreators(newCreators);
  };

  const handleTokenSelected = (info) => {
    setTokenType(
      info.type === LSPType.LSP7DigitalAsset
        ? ContractStandard.LSP7
        : ContractStandard.LSP8
    );
    if (info.address) {
      setMintToken(info.address);
    }
  };

  const handleMintReceiverSelected = (info) => {
    if (info.address) {
      setMintReceiver(info.address);
    }
  };

  const handleBlurTokenId = (event) => {
    const value = event.target.value;
    try {
      const newVal = padLeft(value, 64);
      if (newVal !== value) {
        setTokenId(newVal);
      }
    } catch (err) {
      console.error(err);
      // ignore
    }
  };

  const mint = async () => {
    setNotification(null);
    const erc725AccountAddress = getState('address');

    try {
      switch (tokenType) {
        case ContractStandard.LSP7:
          setMyToken(contract(LSP7Mintable.abi, mintToken));

          const isNonDivisible =
            (await myToken.methods.decimals().call()) === '0';

          const amount = isNonDivisible
            ? mintAmount.toString()
            : toWei(mintAmount.toString());

          await myToken.methods
            .mint(mintReceiver, amount, false, '0x')
            .send({ from: erc725AccountAddress });

          break;
        case ContractStandard.LSP8:
          if (!tokenId) {
            setNotification('Token ID needs to be filled', 'danger');
            return;
          }

          setMyToken(
            contract(LSP8Mintable.abi, mintToken, {
              gas: DEFAULT_GAS,
              gasPrice: DEFAULT_GAS_PRICE,
            })
          );

          await myToken.methods
            .mint(mintReceiver, tokenId, false, '0x')
            .send({ from: erc725AccountAddress });

          const metadataKey = ERC725.encodeKeyName(
            'LSP8MetadataJSON:<bytes32>',
            tokenId
          );

          await myToken.methods
            .setData(metadataKey, metadataJsonUrl)
            .send({ from: erc725AccountAddress });

          break;
        default:
          console.log('Standard not supported');
      }

      setNotification('Token minted', 'info');
    } catch (error) {
      setNotification(error.message, 'danger');
    }
  };

  return (
    <div className="tile is-4 is-parent">
      <div className="tile is-child box">
        <p className="is-size-5 has-text-weight-bold mb-4">Mint</p>
        {/* ... (rest of the template code) */}
      </div>
    </div>
  );
};

export default MintComponent;
