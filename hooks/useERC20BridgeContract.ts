import ERC20Bridge_ABI from "../contracts/ERC20Bridge.json";
import type { ERC20Bridge } from "../contracts/types";
import useContract from "./useContract";

export default function useERC20Bridge_ABIContract(contractAddress?: string) {
  return useContract<ERC20Bridge>(contractAddress, ERC20Bridge_ABI);
}