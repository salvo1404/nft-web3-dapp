const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("GoodFellas", function () {

  it("Should mint if balance is enough and transfer an NFT to someone", async function () {
    const GoodFellas = await ethers.getContractFactory("GoodFellas");
    const goodFellas = await GoodFellas.deploy();
    await goodFellas.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    let metadataURI = 'cid/test.png';

    // Verify recipient owns 0 tokens
    let balance = await goodFellas.balanceOf(recipient);
    expect(balance).to.equal(0);

    // Mint 1st token to the recipient
    let newlyMintedToken = await goodFellas.singleMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.0005') });
    await newlyMintedToken.wait();

    // Verify there is 1 token minted
    expect(await goodFellas.count()).to.equal(1);

    // Veirify recipient owns 1 token
    balance = await goodFellas.balanceOf(recipient);
    expect(balance).to.equal(1);

    // Verify token URI was correctly assigned
    expect(await goodFellas.tokenURI(1)).to.equal(metadataURI);

    // Mint 2nd token to the recipient
    metadataURI = 'cid/test2.png';
    newlyMintedToken = await goodFellas.singleMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.0005') });
    await newlyMintedToken.wait();

    // Verify there are 2 tokens minted
    expect(await goodFellas.count()).to.equal(2);

    // Veirify recipient owns 2 tokens
    balance = await goodFellas.balanceOf(recipient);
    expect(balance).to.equal(2);

    // Verify token URI was correctly assigned
    expect(await goodFellas.tokenURI(2)).to.equal(metadataURI);
  });

  it("Should whitelist mint if balance is enough and transfer an NFT to recipient", async function () {
    const GoodFellas = await ethers.getContractFactory("GoodFellas");
    const goodFellas = await GoodFellas.deploy();
    await goodFellas.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    let metadataURI = 'cid/test.png';

    // Verify recipient owns 0 tokens
    let balance = await goodFellas.balanceOf(recipient);
    expect(balance).to.equal(0);

    // Mint 1st token to the recipient
    let newlyMintedToken = await goodFellas.whitelistMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.0001') });
    await newlyMintedToken.wait();

    // Verify there is 1 token minted
    expect(await goodFellas.count()).to.equal(1);

    // Veirify recipient owns 1 token
    balance = await goodFellas.balanceOf(recipient);
    expect(balance).to.equal(1);

    // Verify token URI was correctly assigned
    expect(await goodFellas.tokenURI(1)).to.equal(metadataURI);
  });

  it("Should free mint if recipient is VIP and transfer an NFT to recipient", async function () {
    const GoodFellas = await ethers.getContractFactory("GoodFellas");
    const goodFellas = await GoodFellas.deploy();
    await goodFellas.deployed();

    const recipientVIP = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    let metadataURI = 'cid/test.png';

    // Verify recipient owns 0 tokens
    let balance = await goodFellas.balanceOf(recipientVIP);
    expect(balance).to.equal(0);

    // Mint 1st token to the recipient
    let newlyMintedToken = await goodFellas.freeMint(recipientVIP, metadataURI);
    await newlyMintedToken.wait();

    // Verify there is 1 token minted
    expect(await goodFellas.count()).to.equal(1);

    // Veirify recipient owns 1 token
    balance = await goodFellas.balanceOf(recipientVIP);
    expect(balance).to.equal(1);

    // Verify token URI was correctly assigned
    expect(await goodFellas.tokenURI(1)).to.equal(metadataURI);
  });

  it("Should multi mint if balance is enough and transfer NFTs to recipient", async function () {
    const GoodFellas = await ethers.getContractFactory("GoodFellas");
    const goodFellas = await GoodFellas.deploy();
    await goodFellas.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    let metadataURI_1 = 'cid/1.png';
    let metadataURI_2 = 'cid/2.png';
    let metadataURI_3 = 'cid/3.png';
    let metadataURI_4 = 'cid/4.png';
    let metadataURI_5 = 'cid/5.png';
    let URI_array = [metadataURI_1, metadataURI_2, metadataURI_3, metadataURI_4, metadataURI_5]


    // Verify recipient owns 0 tokens
    let balance = await goodFellas.balanceOf(recipient);
    expect(balance).to.equal(0);

    // Mint 1st token to the recipient
    let mintedTokens = await goodFellas.multiMint(recipient, URI_array, 5, { value: ethers.utils.parseEther('0.003') });
    await mintedTokens.wait();

    // Verify there is 1 token minted
    expect(await goodFellas.count()).to.equal(5);

    // Veirify recipient owns 1 token
    balance = await goodFellas.balanceOf(recipient);
    expect(balance).to.equal(5);

    // Verify token URI was correctly assigned
    expect(await goodFellas.tokenURI(1)).to.equal(metadataURI_1);
  });

  it("Should withdraw if balance is enough and transfer amount to owner", async function () {
    // Retrieve signer address and balance
    const [signer] = await ethers.getSigners();
    const signerBalance = await ethers.provider.getBalance(signer.address);
    // console.log('Signer address = ' + signer.address);
    // console.log('Signer balance = ' + ethers.utils.formatEther(signerBalance));
   
    const GoodFellas = await ethers.getContractFactory("GoodFellas");
    const goodFellas = await GoodFellas.deploy();
    await goodFellas.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92267';
    let metadataURI = 'cid/test.png';

    // Retrieve contract balance and owner
    const contractOwner = await goodFellas.owner();
    let ownerBalance = await goodFellas.provider.getBalance(goodFellas.owner());
    expect(contractOwner).to.equal(signer.address);
    // console.log('Contract Owner address = ' + await goodFellas.owner());
    // console.log('Contract Owner balance = ' + ethers.utils.formatEther( ownerBalance ));

    // Verify contract balance before Minting
    let contractBalance = await goodFellas.getBalance();
    expect(contractBalance).to.equal(0);
    // console.log('Contract address = ' + goodFellas.address);
    // console.log('Contract balance in ETH = ' + ethers.utils.formatEther( balance ));

    // Mint tokens to the recipient
    let newlyMintedToken = await goodFellas.whitelistMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.12') });
    let newlyMintedToken_2 = await goodFellas.whitelistMint(recipient, metadataURI + '2', { value: ethers.utils.parseEther('0.23') });

    // Verify contract balance before withdraw
    contractBalance = await goodFellas.getBalance();
    expect(Number(ethers.utils.formatEther( contractBalance ))).to.equal(0.35);
    // console.log('Contract balance in ETH = ' + ethers.utils.formatEther( contractBalance ));

    // Verify owner balance before withdraw
    ownerBalance = await goodFellas.provider.getBalance(goodFellas.owner());
    // console.log('Contract Owner balance = ' + ethers.utils.formatEther( ownerBalance ));

    // Withdraw
    await goodFellas.withdraw();
    // await goodFellas.withdrawTo(recipient);

    // Verify owner balance after withdraw is greater than owner before withdraw
    const ownerBalanceAfterWithdraw = await goodFellas.provider.getBalance(goodFellas.owner());
    expect(Number(ownerBalanceAfterWithdraw)).to.greaterThan(Number(ownerBalance));
    // console.log('Contract Owner balance = ' + ethers.utils.formatEther( ownerBalance ));

    // Verify contract balance after withdraw
    contractBalance = await goodFellas.getBalance();
    expect(contractBalance).to.equal(0);
    // console.log('Contract balance in ETH = ' + ethers.utils.formatEther( contractBalance ));

    // Verify recipient balance
    // const recipientBalance = await goodFellas.provider.getBalance(recipient);
    // expect(Number(ethers.utils.formatEther( recipientBalance ))).to.equal(0.35);
    // console.log('Recipient balance = ' + ethers.utils.formatEther( recipientBalance ));

  });
});
