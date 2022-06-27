import useSWR from "swr";
import type { ERC20 } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useTokenContract from "./useTokenContract";

function getBridgeAllowance(contract: ERC20) {
    return async (_: string, address: string, bridgeAddress: string) => {
      const bridgeAllowance = await contract.allowance(address, bridgeAddress);
  
      return bridgeAllowance;
    };
  }

export default function useTokenBridgeAllowance(
  address: string,
  tokenAddress: string,
  bridgeAddress: string,
  suspense = false
) {
  const contract = useTokenContract(tokenAddress);

  const shouldFetch =
    typeof address === "string" &&
    typeof tokenAddress === "string" &&
    typeof bridgeAddress === "string" &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ["TokenAllowence", address, bridgeAddress] : null,
    getBridgeAllowance(contract),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);

  return result.data;
}
