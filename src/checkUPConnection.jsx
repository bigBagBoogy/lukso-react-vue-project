// checkUPConnection.js

import Onboard from "@web3-onboard/core";

async function CheckUPConnection(onboard) {
  try {
    if (typeof onboard !== "undefined") {
      await onboard.walletSelect();
      await onboard.walletCheck();
      const selectedWallet = onboard.getState().wallet.selected;
      const isConnected = selectedWallet === "lukso";
      console.error("UP browser extension connected?", isConnected, selectedWallet);
      return { isConnected, selectedWallet };
    } else {
      return { isConnected: false, selectedWallet: null };
    }
  } catch (error) {
    // Handle any errors here
    console.error("Error checking Lukso connection:", error);
    return { isConnected: false, selectedWallet: null };
  }
}

export { CheckUPConnection };
