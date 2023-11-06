import { DeployUP } from "./deployUP";
import { act } from "react-dom/test-utils";

describe("DeployUP Function", () => {
  it("should deploy the UP", async () => {
    // Mock the ethereum object and other necessary objects
    const ethereum = {
      request: jest.fn().mockResolvedValue(["account1"]),
    };

    const lspFactory = {
      UniversalProfile: {
        deploy: jest.fn().mockResolvedValue({
          LSP0ERC725Account: { address: "UP_ADDRESS" },
        }),
      },
    };

    // Mock your LSP3 metadata object
    const myLSP3MetaData = {
      /* your metadata object here */
    };

    await act(async () => {
      await DeployUP(ethereum, lspFactory, myLSP3MetaData);
    });

    // Verify that the function interacts with the Ethereum provider and deploys the UP
    expect(ethereum.request).toHaveBeenCalledWith({
      method: "eth_requestAccounts",
      params: [],
    });
    expect(lspFactory.UniversalProfile.deploy).toHaveBeenCalledWith({
      controllerAddresses: [],
      lsp3Profile: myLSP3MetaData,
    });
  });
});
