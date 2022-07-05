import { useState, useEffect } from "react";
import { utils, ethers } from "ethers";
import ChainSelector from './ChainSelector';
import { VALIDATOR_ADDRESS } from "../constants";

function BridgeToken({tokenAddress, bridgeContract, executeTx, currentChainId}) {
    const [bridgeTargetChain, setBridgeTargetChain] = useState(0);
    const [bridgeAmount, setBridgeAmount] = useState(0);
    const [claimUrl, setClaimUrl] = useState("");

    const bridgeToken = async () => {
        executeTx(
          () => bridgeContract.lockNativeToken(tokenAddress, utils.parseUnits(bridgeAmount.toString(), 18), bridgeTargetChain),
          (tx, txReceipt) => 
          {
            setClaimUrl(`${VALIDATOR_ADDRESS}/mint?sourceChainId=${currentChainId}&txHash=${tx.hash}`)
            resetBridgeToken();
          })
    }

    const bridgeAmountInput = (input) => {
        setBridgeAmount(input.target.value)
      }

    const resetBridgeToken = async () => {
        setBridgeAmount(0);
        setBridgeTargetChain(0);
    }

    return (
        <div className="flex-item">
            <div className="flex-item border-top">
                <div className="action-header">Bridge Native Token To Chain</div>
                <label>
                    Amount:
                    <input onChange={bridgeAmountInput} value={bridgeAmount} type="number" />
                </label>
            </div>
            <ChainSelector setSelectedChain={setBridgeTargetChain} selectedChain={bridgeTargetChain} currentChainID={currentChainId} />
            {claimUrl && <a className="link" href={claimUrl} target="_blank">Get Signed Claim</a>}
            <div className="flex-item border-bottom">
                <button onClick={bridgeToken}>Bridge Token</button>
            </div>
            
        </div>
    )
    }

export default BridgeToken