const { task } = require("hardhat/config");
const { networkConfig, CONFIRMATIONS } = require("../help-hardhat-config");

task("lock-and-cross", "锁定NFT并进行跨链")
    .addParam("tokenid", "要锁定并跨链的tokenId")
    .addOptionalParam("chainselector", "目标链的chainselector ")
    .addOptionalParam("receiver", "目标链的receiver")
    .setAction(async(taskArgs, hre) => {
        // 获取发送跨链消息的入参
        let { tokenid, chainselector, receiver } = taskArgs
        console.log("tokenId:", tokenid)
        const { account1 } = await getNamedAccounts()
        console.log("newOwner:", account1)
        if (!chainselector) {
            chainselector = networkConfig[network.config.chainId].chainSelector
        }
        console.log("chainSelector:", chainselector)
        if (!receiver) {
            // 获取目标链 amoy NFTPoolBurnAndMint 合约
            const burnAndMint = await hre.companionNetworks.destChain.deployments.get("NFTPoolBurnAndMint")
            receiver = burnAndMint.address
        }
        console.log("receiver:", receiver)
        
        const lockAndRelease = await ethers.getContract("NFTPoolLockAndRelease", account1)

        // 转移 LINK 通证到池子中 需要先在https://faucets.chain.link/ 获取 Ethereum Sepolia Link 通证
        const linkTokenAddress = networkConfig[network.config.chainId].linkToken
        const linkToken = await ethers.getContractAt("LinkToken", linkTokenAddress)
        const oldBalance = await linkToken.balanceOf(lockAndRelease.target)
        console.log(`linkToken合约-当前LINK数量:${oldBalance}, 开始转移Link通证...`)
        // 没有LINK通证 需要转移通证到池子里
        const linkTokenTx = await linkToken.transfer(lockAndRelease.target, ethers.parseEther("10"))
        await linkTokenTx.wait(CONFIRMATIONS)
        const newBalance = await linkToken.balanceOf(lockAndRelease.target)
        console.log("转移通证成功, 当前LINK数量:", newBalance)

        // 授权
        console.log("授权中...")
        const nft = await ethers.getContract("MyToken", account1)
        await nft.approve(lockAndRelease.target, tokenid)
        console.log("授权成功")

        // 发送CCIP跨链消息
        console.log("消息发送中...")
        const lockAndCrossTx = await lockAndRelease.lockAndSendNFT(tokenid, account1, chainselector, receiver)
        console.log("消息发送成功,交易hash:", lockAndCrossTx.hash)
    })

module.exports = {}