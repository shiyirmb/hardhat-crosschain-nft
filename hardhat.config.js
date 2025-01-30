require("@nomicfoundation/hardhat-toolbox");
// 使用hardhat-deploy-ethers插件编写合约部署脚本，
// 安装及使用参考：https://github.com/wighawag/hardhat-deploy-ethers#readme
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

require('@chainlink/env-enc').config();

const { SEPOLIA_JSON_URL, PRIVATE_KEY, AMOY_JSON_URL } = process.env

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  namedAccounts: {
    account1: {
      default: 0,
    },
  },
  networks: {
    sepolia: {
      chainId: 11155111,
      url: SEPOLIA_JSON_URL,
      accounts: [PRIVATE_KEY],
      blockConfirmations: 6,
    },
    amoy: {
      chainId: 80002,
      url: AMOY_JSON_URL,
      accounts: [PRIVATE_KEY],
      blockConfirmations: 6,
    }
  }
};
