const { task } = require("hardhat/config");

task("check-wrapped-nft", "查看WNFT").setAction(async(taskArgs, hre) => {
    const { account1 } = await getNamedAccounts()
    const wnft = await ethers.getContract("WrappedMyToken", account1)

    const totalSupply = await wnft.totalSupply()
    if (!totalSupply) {
        console.log('暂无 WNFT')
        return
    }

    console.log(`检查${totalSupply}个 WNFT 的状态`)
    for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
        const owner = await wnft.ownerOf(tokenId)
        console.log(`tokenId-${tokenId}, owner-${owner}`);
    }
})

module.exports = {}