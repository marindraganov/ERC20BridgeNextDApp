import useSWR from "swr";
import type { ERC20 } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";
import useTokenContract from "./useTokenContract";

function getTokenSymbol(contract: ERC20) {
  return async (_: string, address: string) => {
    const symbol = await contract.symbol();

    return symbol;
  };
}

export default function useTokenSymbol(
  tokenAddress: string,
  suspense = false
) {
  const contract = useTokenContract(tokenAddress);

  const shouldFetch =
    typeof tokenAddress === "string" &&
    !!contract;

  const result = useSWR(
    shouldFetch ? ["TokenSymbol", tokenAddress] : "",
    getTokenSymbol(contract),
    {
      suspense,
    }
  );

  return result.data ?? "";
}