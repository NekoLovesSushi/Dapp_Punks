const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

const ether = tokens

describe('NFT', () => {
  let nft, accounts, deployer, minter
  
  beforeEach(async () => {
    accounts = await ethers.getSigners()
    deployer = accounts[0]
    minter = accounts[1]
  })

  const NAME = 'Dapp Punks'
  const SYMBOL = 'DP'
  const COST = ether(10)
  const MAX_SUPPLY = 25
  const BASE_URI = 'ipfs://QmQ2jnDYecFhrf3asEWjyjZRX1pZSsNWG3qHzmNDvXa9qg/'

  describe('Deployment', () => {
    const ALLOW_MINTING_ON = (Date.now() + 120000).toString().slice(0, 10) // 2 minutes from now

    beforeEach(async () => {
      const NFT = await ethers.getContractFactory('NFT')
      nft = await NFT.deploy(NAME, SYMBOL, COST, MAX_SUPPLY, ALLOW_MINTING_ON, BASE_URI)
    })

    it('Has correct name', async () => {
      expect(await nft.name()).to.equal(NAME)
    })

    it('Has correct symbol', async () => {
      expect(await nft.symbol()).to.equal(SYMBOL)
    })

    it('Returns the cost to mint', async () => {
      expect(await nft.cost()).to.equal(COST)
    })

    it('Returns the maximum total supply', async () => {
      expect(await nft.maxSupply()).to.equal(MAX_SUPPLY)
    })

    it('Returns the allowed minting time', async () => {
      expect(await nft.allowMintingOn()).to.equal(ALLOW_MINTING_ON)
    })

    it('Returns the base URI', async () => {
      expect(await nft.baseURI()).to.equal(BASE_URI)
    })

    it('Returns the owner', async () => {
      expect(await nft.owner()).to.equal(deployer.address)
    })

   })

  })

  

