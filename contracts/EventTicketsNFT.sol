// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
// deployed at 0x0D1E3AaA7fD58347bCC8dAD6875f3B377Ab3C13f
// modules

import {LSP7Mintable} from "@lukso/lsp-smart-contracts/contracts/LSP7DigitalAsset/presets/LSP7Mintable.sol";

import {_LSP4_TOKEN_TYPE_DATA_KEY, TokenType} from "../TokenTypes.sol";

contract EventTicketsNFT is LSP7Mintable {
    constructor(string memory eventName, string memory tokenSymbol, address contractOwner)
        LSP7Mintable(
            eventName,
            tokenSymbol,
            contractOwner,
            true // make the token non divisible
        )
    {
        // set the token type
        _setData(_LSP4_TOKEN_TYPE_DATA_KEY, abi.encode(TokenType.TOKEN));
    }
}
