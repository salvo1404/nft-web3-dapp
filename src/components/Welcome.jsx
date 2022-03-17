import React, { useContext } from "react";
import { useEffect, useState } from 'react';
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

// import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";




const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [numerToMint, setNumerToMint] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useState(0);

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);


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

        // getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

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
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
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
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>

        </div>


        <div className="flex flex-col flex-1 items-start justify-start w-full mf:mt-0 mt-10">


          

          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-start blue-glassmorphism">
            <p className="text-white font-semibold text-lg mt-1">Price:  0.2 ETH</p>
            <p className="text-white font-semibold text-lg mt-1">Max:  10 NFT per Wallet</p>
            <p className="text-white font-semibold text-lg mt-1">Supply:  0/8000 NFT</p>
            

            <div className="h-[1px] w-full bg-gray-400 my-4" />

            <div className="flex w-full mf:flex-row items-center justify-around">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-24 h-24 m-4 text-white border-[1px] border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  -
                </button>

                <p className="text-white font-light">
                  {numerToMint}
                </p>

                <button
                  type="button"
                  onClick={handleSubmit}
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
                  onClick={handleSubmit}
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
