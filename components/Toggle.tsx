import { useState } from 'react';
import { TOGGLE_ABI, TOGGLE_CONTRACT_ADDRESS } from "../contracts/toggle_abi";
import {
  useContractWrite,
  useContractRead,
  useContractEvent,
  useAccount,
  useEnsAvatar,
  useEnsName
} from "wagmi";

export default function Toggle() {
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: address })
  const { data: ensName } = useEnsName({ address })
  
  const url = "https://goerli.etherscan.io/address/"+TOGGLE_CONTRACT_ADDRESS;

  const { write } = useContractWrite({
    mode: "recklesslyUnprepared",
    addressOrName: TOGGLE_CONTRACT_ADDRESS,
    contractInterface: TOGGLE_ABI,
    functionName: "toggle",
    onError(error: any) {
      setLoading(false);
      console.log('Error', error)
    }
  });

  const { data, refetch } = useContractRead({
    addressOrName: TOGGLE_CONTRACT_ADDRESS,
    contractInterface: TOGGLE_ABI,
    functionName: "status"
  });

  useContractEvent({
    addressOrName: TOGGLE_CONTRACT_ADDRESS,
    contractInterface: TOGGLE_ABI,
    eventName: "changeToggle",
    listener: (event: any) => {
      setLoading(false);
      refetch();
    },
    once: true
  });

  return(
    <>
      {loading ?
        <div className="w-full h-full fixed bg-[#777] bg-opacity-80 flex z-[30]">
          <div className="w-24 h-24 mt-60 mx-auto border-b-8 border-red-300 rounded-full animate-spin"></div>
        </div>
          :
        ""
      }
      <div className="max-w-7xl mx-auto p-4 mb-48 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Toggle
          <a className="ml-16 cursor-pointer text-lg font-medium text-red-400" href={url} target="_blank" rel="noreferrer">
            Contract information @ Goerli <small className="ml-3">( {TOGGLE_CONTRACT_ADDRESS} )</small>
          </a>
        </h1>
        <table className="w-1/4 mt-10">
          <tbody>
            <tr>
              <td className="h-9 text-gray-900 font-medium">
                <button
                  className="bg-pink-700 hover:bg-pink-500 text-white font-medium text-lg ml-9 py-1 px-6 rounded"
                  onClick={() => {
                    setLoading(true);
                    write();
                  }}
                >
                  Status
                </button>
              </td>
              <td className="text-blue-500 font-medium border-b">
                { data ? "true" : "false" }
              </td>
            </tr>
          </tbody>
        </table>

        <div className="my-16">
          <img src={ensAvatar} className="w-[160px]" alt="ENS Avatar" />
          <div className="mt-5 font-semibold text-blue-500 text-lg">{ensName ? `${ensName} (${address})` : address}</div>
        </div>

      </div>
    </>
  )
}