const hre = require("hardhat");

async function main() {

  // We get the contract to deploy
  const GoodFellas = await hre.ethers.getContractFactory("GoodFellas");
  const goodFellas = await GoodFellas.deploy();

  await goodFellas.deployed();

  console.log("GoodFellas NFT deployed to:", goodFellas.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
