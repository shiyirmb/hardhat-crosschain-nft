module.exports = async ({ getNamedAccounts, deployments }) => {
    const { account1 } = await getNamedAccounts()
    const { deploy, log } = deployments

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

    const wnftDeployment = await deployments.get("WrappedMyToken")
    const wnftAddr = wnftDeployment.address

    log("NFTPoolBurnAndMint 合约部署中...")
    const NFTPoolBurnAndMint = await deploy("NFTPoolBurnAndMint", {
        from: account1,
        // _router _link nftAddr
        args: [destinationRouter_, linkToken_, wnftAddr],
        log: true,
    })
    log("NFTPoolBurnAndMint 合约部署成功:", NFTPoolBurnAndMint.address)
}

module.exports.tags = ["all", "destchain"]
