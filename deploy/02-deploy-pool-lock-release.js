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
        router = sourceRouter_
        linkToken = linkToken_
    } else {
        // 非本地环境 使用相对应网络配置的数据
        router = networkConfig[network.config.chainId].router
        linkToken = networkConfig[network.config.chainId].linkToken
    }

    const nftDeployment = await deployments.get("MyToken")
    const nftAddr = nftDeployment.address

    log("NFTPoolLockAndRelease 合约部署中...")
    const NFTPoolLockAndRelease = await deploy("NFTPoolLockAndRelease", {
        from: account1,
        // _router _link nftAddr
        args: [router, linkToken, nftAddr],
        log: true,
    })
    log("NFTPoolLockAndRelease 合约部署成功:", NFTPoolLockAndRelease.address)
}

module.exports.tags = ["all", "sourcechain"]
