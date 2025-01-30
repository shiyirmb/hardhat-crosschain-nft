const { network } = require("hardhat")
const { devlopmentChains, networkConfig } = require("../help-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { account1 } = await getNamedAccounts()
    const { deploy, log } = deployments

    let router, linkToken
    // 本地环境 使用mock合约提供的数据
    if (devlopmentChains.includes(network.name)) {
        const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator")
        const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeployment.address)
        const {
            chainSelector_, 
            sourceRouter_, 
            destinationRouter_, 
            wrappedNative_, 
            linkToken_, 
            ccipBnM_, 
            ccipLnM_
        } = await ccipSimulator.configuration()
        router = destinationRouter_
        linkToken = linkToken_
    } else {
        // 非本地环境 使用相对应网络配置的数据
        router = networkConfig[network.config.chainId].router
        linkToken = networkConfig[network.config.chainId].linkToken
    }

    const wnftDeployment = await deployments.get("WrappedMyToken")
    const wnftAddr = wnftDeployment.address

    log("NFTPoolBurnAndMint 合约部署中...")
    const NFTPoolBurnAndMint = await deploy("NFTPoolBurnAndMint", {
        from: account1,
        // _router _link nftAddr
        args: [router, linkToken, wnftAddr],
        log: true,
    })
    log("NFTPoolBurnAndMint 合约部署成功:", NFTPoolBurnAndMint.address)
}

module.exports.tags = ["all", "destchain"]
