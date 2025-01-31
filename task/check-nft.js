const { task } = require("hardhat/config");

task("check-nft", "查看NFT").setAction(async(taskArgs, hre) => {
    const { account1 } = await getNamedAccounts()
    const nft = await ethers.getContract("MyToken", account1)

    const totalSupply = await nft.totalSupply()
    if (!totalSupply) {
        console.log('暂无 NFT')
        return
    }

    console.log(`检查${totalSupply}个 NFT 的状态`)
    for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
        const owner = await nft.ownerOf(tokenId)
        console.log(`tokenId-${tokenId}, owner-${owner}`);
        
    }
})

module.exports = {}