require("@nomicfoundation/hardhat-toolbox");
// 使用hardhat-deploy-ethers插件编写合约部署脚本，
// 安装及使用参考：https://github.com/wighawag/hardhat-deploy-ethers#readme
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  namedAccounts: {
    account1: {
      default: 0,
    },
  },
};
