import useSWR from "swr";
import type { ERC20 } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useERC20BridgeContract from "./useERC20BridgeContract";

function isWrappedToken(contract: ERC20) {
  return async (_: string, tokenAddress: string) => {
    const isWrapped = await contract.isWrappedToken(tokenAddress);

    return isWrapped;
  };
}

export default function useIsTokenWrapped(
  bridgeAddress: string,
  tokenAddress: string,
  suspense = false
) {

  const contract = useERC20BridgeContract(bridgeAddress);

  const shouldFetch =
    typeof bridgeAddress === "string" &&
    typeof tokenAddress === "string" &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ["IsWrappedToken", tokenAddress] : "",
    isWrappedToken(contract),
    {
      suspense,
    }
  );

  return result.data ?? "";
}