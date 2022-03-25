import { useState, useEffect } from "react";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/utils";
import { ethers } from 'ethers';

// --------- Contract creation -------------
import GoodFellas from '../artifacts/contracts/GoodFellas.sol/GoodFellas.json';

const NFTCardOld = ({ addressTo, addressFrom, timestamp, message, amount, url }) => {

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const NFTCard = ({ tokenId, url }) => {

  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          {/* <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )} */}

          {tokenId}
        </div>
        <img
          src={url}
          alt="nature"
          className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
        />
      </div>
    </div>
  );
};




const Transactions = ({ currentAccount }) => {
  const  [tokens, setTokens] = useState([]);

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  // get the signer
  const signer = provider.getSigner();

  // get the smart contract (GoodFellas Contract)
  const contract = new ethers.Contract(contractAddress, GoodFellas.abi, signer);
  
  useEffect(() => {
    getMintedTokens();
  }, []);

  const getMintedTokens = async() => {
    if(!currentAccount) {
      return;
    }


    const totalMinted = await contract.count();
    const tokenIds = Array(parseInt(totalMinted)).fill(0).map((_, idx) => 1 + idx);


    const contentId = import.meta.env.VITE_CONTENT_ID;
    const tokens = tokenIds.map( (value,_) => ({ ['tokenId']: value, ['url']: `https://gateway.pinata.cloud/ipfs/${contentId}/${value}.png` }) );

    console.log(tokens);

    setTokens(tokens);
    console.log('pull');
  }

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Your minted Fellas
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see your minted Fellas
          </h3>
        )}
        
        <div className="flex flex-wrap justify-center items-center mt-10">
          {/* {Array(3 + 2)
            .fill(0)
            .map((_, i) => (
              i != 0 &&
              <NFTCard key={i} url={url} />   
            ))} */}

          {[...tokens].reverse().map((token, i) => (
            <NFTCard key={i} {...token} />   
          ))}
          
          {dummyData.length == 0 && (
            <h3 className="text-white text-xl text-center my-2">... No minted tokens ...</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
