const { network } = require("hardhat")
const { devlopmentChains } = require("../help-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    // 非本地环境 跳过ccip mock 合约的部署
    if (!devlopmentChains.includes(network.name)) return

    // 本地环境 部署ccip mock 合约
    const { account1 } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("CCIPLocalSimulator 合约部署中...")
    const CCIPLocalSimulator = await deploy("CCIPLocalSimulator", {
        from: account1,
        args: [],
        log: true,
    })
    log("CCIPLocalSimulator 合约部署成功:", CCIPLocalSimulator.address)
}

module.exports.tags = ["all", "test"]
