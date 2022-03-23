import React, { useContext } from "react";
import { useEffect, useState } from 'react';
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { ethers } from 'ethers';

// import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

import GoodFellas from '../artifacts/contracts/GoodFellas.sol/GoodFellas.json';

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the signer
const signer = provider.getSigner();

// get the smart contract (GoodFellas Contract)
const contract = new ethers.Contract(contractAddress, GoodFellas.abi, signer);

const Welcome = () => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentBalance, setCurrentBalance] = useState(0);
  const [tokenCount, setTokenCount] = useState(0);
  const [tokenId, setTokenId] = useState(1);
  const [totalSupply, setTotalSupply] = useState(0);
  const [numerToMint, setNumerToMint] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const contentId = import.meta.env.VITE_CONTENT_ID;
  const metadataURI = `ipfs://${contentId}/${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/${tokenId}.svg`;
  const costSingleToken = 0.2;

  useEffect(() => {
    checkIfWalletIsConnect();
    checkBalance();
    getCount();
  }, [currentAccount,tokenCount, tokenId, totalSupply]);


  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkBalance = async () => {
    if(!currentAccount) {
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(currentAccount);
    setCurrentBalance(ethers.utils.formatEther(balance));
  };

  const getCount = async () => {
    if(!currentAccount) {
      return;
    }

    const count = await contract.count();
    setTokenCount(parseInt(count));
    setTokenId(parseInt(count) + 1);

    const totalSupply = await contract.totalSupply();
    setTotalSupply(parseInt(totalSupply));
  };

  const singleMint = async () => {  
    try {
        // User Address
        const userAddress = await signer.getAddress();
        const result = await contract.singleMint(userAddress, metadataURI, {
          value: ethers.utils.parseEther((costSingleToken*numerToMint).toString()),
        });
        await result.wait();
    } catch (error) {
        console.log(error)
        alert(error);
    }

    getCount();
  };

  const freeMint = async () => {  
    try {
        // VIP Address
        const vipAddress1 = import.meta.env.VITE_VIP_ADDRESS_1;
        const result = await contract.singleMint(vipAddress1, metadataURI);
        await result.wait();
    } catch (error) {
        console.log(error)
        alert(error);
    }

    getCount();
  };

  const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

  const formatBalance = (balance) => {
    if (balance) {
      return balance.slice(0,5) + ' ETH';
    }

    return '-';
  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex w-full mf:flex-row flex-col items-center justify-center md:p-20 py-12 px-4">

      
        <div className="flex flex-1 flex-col items-center">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Mint your <br /> GoodFellas
          </h1>
          <p className="text-center mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Use Metamask to connect your wallet
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 pr-6 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

          <div className="p-3 flex justify-start items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-semibold text-lg mt-1">
                    {formatBalance(currentBalance)}
                    </p>
                  </div>
                    <div>
                    <p className="text-white font-bold text-lg mt-1">
                    Ethereum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        <div className="flex flex-col flex-1 items-start justify-start w-full mf:mt-0 mt-10">

          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-start blue-glassmorphism">
            <p className="text-white font-semibold text-lg mt-1">Price:  {(numerToMint*costSingleToken).toString().slice(0,4)} ETH</p>
            <p className="text-white font-semibold text-lg mt-1">Max:  10 NFT per Wallet</p>
            <p className="text-white font-semibold text-lg mt-1">Supply:  {tokenCount}/{totalSupply} Tokens</p>
            

            <div className="h-[1px] w-full bg-gray-400 my-4 mt-12" />

            <div className="flex w-full mf:flex-row items-center justify-around">
                <button
                  type="button"
                  onClick={() => {
                      if(numerToMint>1)
                      setNumerToMint((numerToMint) => (numerToMint - 1))
                    }
                  }
                  className="w-24 h-24 m-4 text-white border-[1px] border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  -
                </button>

                <p className="text-white font-semibold text-lg">
                  {numerToMint}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    if(numerToMint<10)
                    setNumerToMint((numerToMint) => (numerToMint + 1))
                  }
                }
                  className="w-24 h-24 m-4 text-white border-[1px] border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  +
                </button>
            </div>

            <div className="h-[1px] w-full bg-gray-400 my-4" />

            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={singleMint}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Mint Now
                </button>
              )}
          </div>


        </div>



      </div>
    </div>
  );
};

export default Welcome;
