// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// modules
import {LSP7Mintable} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol";

contract EventTicketsNFT is LSP7Mintable {
    constructor(string memory eventName, string memory tokenSymbol, address contractOwner)
        LSP7Mintable(
            eventName,
            tokenSymbol,
            contractOwner,
            true // make the token non divisible
        )
    {
        // set the token type directly to TOKEN
        _setData(_LSP4_TOKEN_TYPE_DATA_KEY, abi.encode(uint8(0))); // 0 corresponds to TokenType.TOKEN
    }
}
