module.exports = async ({ getNamedAccounts, deployments }) => {
    const { account1 } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("WNFT 合约部署中...")
    const wnft = await deploy("WrappedMyToken", {
        from: account1,
        args: ["WrappedMyToken", "WMT"],
        log: true,
    })
    log("WNFT 合约部署成功:", wnft.address)
}

module.exports.tags = ["all", "destchain"]
