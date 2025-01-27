module.exports = async ({ getNamedAccounts, deployments }) => {
    const { account1 } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("NFT 合约部署中...")
    const nft = await deploy("MyToken", {
        from: account1,
        args: ["MyToken", "MT"],
        log: true,
    })
    log("NFT 合约部署成功:", nft.address)
}

module.exports.tags = ["all", "sourcechain"]
