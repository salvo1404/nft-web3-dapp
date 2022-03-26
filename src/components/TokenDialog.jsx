import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'

export default function TokenDialog({openState, handleStateChange, tokenId}) {
  let [isOpen, setIsOpen] = useState(false);

  const openSea = import.meta.env.VITE_RINKEBY_OPENSEA + '/assets/' + import.meta.env.VITE_CONTRACT_ADDRESS + '/' +tokenId;
  // TODO: Additional button Copy your Token URI
  const tokenURI = `ipfs://${import.meta.env.VITE_CONTENT_ID}/${tokenId}.json`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${import.meta.env.VITE_CONTENT_ID}/${tokenId}.svg`;

  console.log('Here = ' + tokenId);
  useEffect(() => {
    checkState();
    console.log('There = ' + tokenId);
  }, [openState]);

  function checkState() {
    if (openState) {
        openModal();
    }
  }

  function closeModal() {
    handleStateChange(false);
    // setIsOpen(false)   // Enable this to enable closing dialog by clicking outside
  }

  function openModal() {
    handleStateChange(true);
    setIsOpen(true)
  }

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          View Token
        </button>
      </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed blue-glassmorphism inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform blue-glassmorphism shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-3xl font-bold leading-6 text-white"
                >
                  Your GoodFellas is minted !
                </Dialog.Title>

                <div className="mt-2 py-3">
                  <p className="text-sm text-white pb-4">
                    Congratulation, your GoodFellas has been successfully minted.
                    <br/> Please visit <a href={openSea} target="_blank" className="underline">OpenSea</a> and enjoy your NFT.
                  </p>
                  <img className="token-dialog-img-loading w-full items-center justify-center text-center" src={tokenId ? imageURI : '../images/placeholder.png'}></img>
                  
                </div>

                
                    {/* <div className="mt-4">
                    <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                    >
                        Got it, thanks!
                    </button>
                    </div> */}

                    <div className="text-center mt-3">
                    <a
                        href={openSea} target="_blank"
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-md font-semibold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                        Take me to OpenSea
                    </a>
                    </div>
                
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}