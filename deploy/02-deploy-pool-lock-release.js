module.exports = async ({ getNamedAccounts, deployments }) => {
    const { account1 } = await getNamedAccounts()
    const { deploy, log } = deployments

    const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator")
    const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeployment.address)
    const [
        chainSelector_, 
        sourceRouter, 
        destinationRouter_, 
        wrappedNative_, 
        linkToken, 
        ccipBnM_, 
        ccipLnM_
    ] = await ccipSimulator.configuration()

    const nftDeployment = await deployments.get("MyToken")
    const nftAddr = nftDeployment.address

    log("NFTPoolLockAndRelease 合约部署中...")
    const NFTPoolLockAndRelease = await deploy("NFTPoolLockAndRelease", {
        from: account1,
        // _router _link nftAddr
        args: [sourceRouter, linkToken, nftAddr],
        log: true,
    })
    log("NFTPoolLockAndRelease 合约部署成功:", NFTPoolLockAndRelease.address)
}

module.exports.tags = ["all", "sourcechain"]
