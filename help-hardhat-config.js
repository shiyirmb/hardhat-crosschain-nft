const devlopmentChains = ["local", "hardhat"]

const networkConfig = {
    11155111: {
        name: "sepolia",
        // https://docs.chain.link/ccip/directory/testnet/chain/ethereum-testnet-sepolia
        router: "0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59",
        linkToken: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
        chainSelector: "16281711391670634445", // 目标链的chainSelector，这里为amoy链的
    },
    80002: {
        name: "amoy",
        // https://docs.chain.link/ccip/directory/testnet/chain/polygon-testnet-amoy
        router: "0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2",
        linkToken: "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904",
        chainSelector: "16015286601757825753", // 目标链的chainSelector，这里为sepolia链的
    },
}

module.exports = {
    devlopmentChains,
    networkConfig,
}