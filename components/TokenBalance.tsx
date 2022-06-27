import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useTokenBalance from "../hooks/useTokenBalance";
import useTokenBridgeAllowance from "../hooks/useTokenBridgeAllowance";
import { parseBalance } from "../util";

type TokenBalanceProps = {
  tokenAddress: string;
  bridgeAddress: string;
};

const TokenBalance = ({ tokenAddress, bridgeAddress }: TokenBalanceProps) => {
  const { account } = useWeb3React<Web3Provider>();
  const balance = useTokenBalance(account, tokenAddress);
  const bridgeAllowence = useTokenBridgeAllowance(account, tokenAddress, bridgeAddress);

  return (
    <div className="flex-item">
      <div>
        Token Balance: {parseBalance(balance ?? 0)}
      </div>
      <div>
        Token Bridge Allowence: {parseBalance(bridgeAllowence ?? 0)}
      </div>
      
    </div>
  );
};

export default TokenBalance;
