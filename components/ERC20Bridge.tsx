import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useERC20BridgeContract from "../hooks/useERC20BridgeContract";
import LoadingSpinner from "./LoadingSpinner"
import { formatEtherscanLink, shortenHex } from "../util";
import { utils } from "ethers";
import { ethers } from "ethers";
import TokenSelector from './TokenSelector';
import ChainSelector from './ChainSelector';
import TokenBalance from "../components/TokenBalance";
import ApproveTokenAllowence from "../components/ApproveTokenAllowence";
import MintToken from "./MintToken";

type ERC20BridgeContract = {
  contractAddress: string;
};

const ERC20Bridge = ({ contractAddress } : ERC20BridgeContract) => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const erc20BridgeContract = useERC20BridgeContract(contractAddress);

  const [isWrappedToken, setIsWrappedToken] = useState(null);
  const [selectedToken, setSelectedToken] = useState('');
  const [bridgeAmount, setBridgeAmount] = useState(0);
  const [bridgeTargetChain, setBridgeTargetChain] = useState(0);
  const [numberOfCopies, setNumberOfCopies] = useState<number | undefined>(0);
  const [txError, setTxError] = useState(null);
  const [transactionInProgress, setTransactionInProgress] = useState(null);
  const [books, setBooks] = useState<[]>([]);

  useEffect(() => {

  },[])

  const getIsWrappedToken = async (tokenAddress) => {
    const nativeTknAddress = await erc20BridgeContract.getNativeTokenAddress(tokenAddress);
    const isWTkn = nativeTknAddress ? true : false;
    setIsWrappedToken(isWTkn);
  }

  const bridgeToken = async () => {
    executeTransaction(
      () => erc20BridgeContract.lockNativeToken(selectedToken, utils.parseUnits(bridgeAmount.toString(), 18), bridgeTargetChain),
      () => {resetBridgeToken();})
  }

  const executeTransaction = async (txFunc, successCallcack) => {
    const tx = await txFunc()
      .catch((e)=>
        setTxError(e.error ? e.error.message : e.message)
      );

    if(tx) {
      setTransactionInProgress(tx);
      var txReceipt = await tx.wait();
      setTransactionInProgress(null);

      if(txReceipt.status === 1) { //success
        setTxError('');
        if(successCallcack) {
          successCallcack();
        }
      }
      else {
        setTxError('The transaction failed!');
      }
    }
  }

  const bridgeAmountInput = (input) => {
    setBridgeAmount(input.target.value)
  }

  const resetBridgeToken = async () => {
    setBridgeAmount(0);
  }

  return (
    <div className="bridge flex-container">
        <div className="row">
            <TokenSelector setSelectedToken={setSelectedToken} />
            <TokenBalance tokenAddress={selectedToken} bridgeAddress={contractAddress}/>
            <ApproveTokenAllowence tokenAddress={selectedToken} bridgeAddress={contractAddress} executeTx={executeTransaction}/>
            <div className="flex-item">
                <div className="flex-item border-top">
                    <label>
                        Amount:
                        <input onChange={bridgeAmountInput} value={bridgeAmount} type="number" name="bookIdToRent" />
                    </label>
                </div>
                <ChainSelector setSelectedChain={setBridgeTargetChain}/>
                <div className="flex-item border-bottom">
                    <button onClick={bridgeToken}>Bridge Token</button>
                </div>
            </div>
            <MintToken tokenAddress={selectedToken} bridgeContract={erc20BridgeContract} executeTx={executeTransaction}/>
            {txError && (
                <div className="error"> {txError} </div>
            )}
            {
            transactionInProgress && (
            <>
                <div>Waiting for transaction</div>
                {console.log(transactionInProgress)}
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