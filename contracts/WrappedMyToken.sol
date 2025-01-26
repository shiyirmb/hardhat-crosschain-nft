// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.22;

import { MyToken } from './MyToken.sol';

contract WrappedMyToken is MyToken {
    constructor(string memory tokenName, string memory tokenSymbol) MyToken(tokenName, tokenSymbol) {}
    // 要做权限控制 比如：
    // 1、只允许CCIP的合约去调用
    // 2、增加白名单
    // 3、调用前增加某种测试
    function mintTokenByTokenId(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }
}