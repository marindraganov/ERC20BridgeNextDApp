import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useERC20BridgeContract from "../hooks/useERC20BridgeContract";
import LoadingSpinner from "./LoadingSpinner"
import { formatEtherscanLink, shortenHex } from "../util";
import TokenSelector from './TokenSelector';
import TokenBalance from "../components/TokenBalance";
import ApproveTokenAllowence from "../components/ApproveTokenAllowence";
import MintWToken from "./MintWToken";
import BurnWToken from "./BurnWToken";
import UnlockNativeToken from "./UnlockNativeToken";
import BridgeToken from "./BridgeToken";

type ERC20BridgeContract = {
  contractAddress: string;
  chainId: number;
};

const ERC20Bridge = ({ contractAddress, chainId } : ERC20BridgeContract) => {
  const erc20BridgeContract = useERC20BridgeContract(contractAddress);

  const [selectedToken, setSelectedToken] = useState(null);
  const [txError, setTxError] = useState(null);
  const [transactionInProgress, setTransactionInProgress] = useState(null);

  useEffect(() => {
    setSelectedToken(null)
  },[chainId])

  const executeTransaction = async (txFunc, successCallcack) => {
    const tx = await txFunc()
      .catch((e)=>
        setTxError(e.error ? e.error.message + e.error?.data?.message : e.message)
      );

    if(tx) {
      setTransactionInProgress(tx);
      const txReceipt = await tx.wait();
      setTransactionInProgress(null);

      if(txReceipt.status === 1) { //success
        setTxError('');
        if(successCallcack) {
          successCallcack(tx, txReceipt);
        }
      }
      else {
        setTxError('The transaction failed!');
      }
    }
  }

  return (
    <div className="bridge flex-container">
        <div className="row">
            <TokenSelector selectedToken={selectedToken?.address} setSelectedToken={setSelectedToken} chainID={chainId} bridgeAddress={contractAddress} />
            {selectedToken && <TokenBalance tokenAddress={selectedToken.address} bridgeAddress={contractAddress}/> }
            {selectedToken && !selectedToken.isWrapped &&
            (<>
              <ApproveTokenAllowence tokenAddress={selectedToken.address} bridgeAddress={contractAddress} executeTx={executeTransaction}/>
              <BridgeToken tokenAddress={selectedToken.address} bridgeContract={erc20BridgeContract} executeTx={executeTransaction}
                currentChainId={chainId} />
            </> )}
            {selectedToken && selectedToken.isWrapped &&
            (<>
              <BurnWToken tokenAddress={selectedToken.address} bridgeContract={erc20BridgeContract} executeTx={executeTransaction}
                currentChainId={chainId} />
            </> )}
            <UnlockNativeToken bridgeContract={erc20BridgeContract} executeTx={executeTransaction}/>
            <MintWToken bridgeContract={erc20BridgeContract} executeTx={executeTransaction}/>
            {txError && (
                <div className="error"> {txError} </div>
            )}
            {
            transactionInProgress && (
            <>
                <div>Waiting for transaction</div>
                <a className="transactionLink"
                {...{
                    href: formatEtherscanLink("Transaction", [chainId, transactionInProgress.hash]),
                    target: "_blank",
                    rel: "noopener noreferrer",
                }}>
                {transactionInProgress.hash}
                </a>
                <LoadingSpinner/>
            </>)}
    
        </div>
    </div>
  );
};

export default ERC20Bridge;