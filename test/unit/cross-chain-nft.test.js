const { getNamedAccounts, ethers, deployments } = require("hardhat")
const { expect } = require("chai")

// 获取测试需要用的变量
let account1, ccipSimulator, nft, lockAndReleasePool, wnft, burnAndMintPool, chainSelector
before(async () => {
    account1 = (await getNamedAccounts()).account1
    await deployments.fixture(["all"])
    ccipSimulator = await ethers.getContract("CCIPLocalSimulator", account1)
    chainSelector = (await ccipSimulator.configuration()).chainSelector_
    nft = await ethers.getContract("MyToken", account1)
    lockAndReleasePool = await ethers.getContract("NFTPoolLockAndRelease", account1)
    wnft = await ethers.getContract("WrappedMyToken", account1)
    burnAndMintPool = await ethers.getContract("NFTPoolBurnAndMint", account1)
})

describe("测试跨链NFT: 源链 => 目标链", async () => {
    it("测试是否能成功在源链铸造NFT", async () => {
        await nft.safeMint(account1)
        const owner = await nft.ownerOf(0)
        expect(owner).to.equal(account1)
    })
    it("测试是否能成功在源链锁定NFT并发送跨链消息", async () => {
        // 给lockAndReleasePool合约赋权 参数：合约地址, tokenId
        await nft.approve(lockAndReleasePool.target, 0)
        // 给账号一些balance 参数： 给谁, 给多少
        await ccipSimulator.requestLinkFromFaucet(lockAndReleasePool.target, ethers.parseEther("10"))
        // 锁定NFT并发送跨链消息
        await lockAndReleasePool.lockAndSendNFT(0, account1, chainSelector, burnAndMintPool.target)
        const owner = await nft.ownerOf(0)
        expect(owner).to.equal(lockAndReleasePool)
    })
    it("测试是否能成功在目标链接收跨链消息并铸造WNFT", async () => {
        // 没有铸造WNFT的情况下owner会是空的
        const owner = await wnft.ownerOf(0)
        expect(owner).to.equal(account1)
    })
})
describe("测试跨链NFT: 目标链 => 源链", async () => {
    it("测试是否能成功在目标链燃烧WNFT并发送跨链消息", async () => {
        await wnft.approve(burnAndMintPool.target, 0)
        await ccipSimulator.requestLinkFromFaucet(burnAndMintPool, ethers.parseEther("10"))
        await burnAndMintPool.burnAndSendNFT(0, account1, chainSelector, lockAndReleasePool.target)
        // wnft合约有多少NFT, 如果为零则已经烧掉
        const totalSupply = await wnft.totalSupply()
        expect(totalSupply).to.equal(0)
    })
    it("测试是否能成功在源链解锁NFT", async () => {
        const owner = await nft.ownerOf(0)
        expect(owner).to.equal(account1)
    })
})