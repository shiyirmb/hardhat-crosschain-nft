const { task } = require("hardhat/config");
const { CONFIRMATIONS } = require("../help-hardhat-config")

task("mint-nft", "铸造NFT").setAction(async(taskArgs, hre) => {
    const { account1 } = await getNamedAccounts()
    const nft = await ethers.getContract("MyToken", account1)

    console.log("铸造 NFT 中...");
    const mintTx = await nft.safeMint(account1)
    await mintTx.wait(CONFIRMATIONS)
    console.log("铸造 NFT 成功");
})

module.exports = {}