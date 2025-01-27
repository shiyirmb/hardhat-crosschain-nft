module.exports = async ({ getNamedAccounts, deployments }) => {
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
