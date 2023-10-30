import { Device, Platform, WalletModule } from "@web3-onboard/common";

/**
 * Define an InjectedWalletModule object in JavaScript.
 */
const InjectedWalletModule = {
  injectedNamespace: "",
  checkProviderIdentity: ({ provider, device }) => false,
  platforms: [],
  externalUrl: undefined,
};

export default InjectedWalletModule;
