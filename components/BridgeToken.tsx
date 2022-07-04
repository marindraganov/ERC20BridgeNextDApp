import { useState, useEffect } from "react";
import { utils, ethers } from "ethers";
import ChainSelector from './ChainSelector';

function BridgeToken({tokenAddress, bridgeContract, executeTx, currentChainId}) {
    const lockEventAbi = ["event TokenLocked(address indexed user, uint amount, address tknAddress, string tknName, string tknSymbol,uint targetChainID)"]
    const [bridgeTargetChain, setBridgeTargetChain] = useState(0);
    const [bridgeAmount, setBridgeAmount] = useState(0);
    const [claimUrl, setClaimUrl] = useState();

    const bridgeToken = async () => {
        executeTx(
          () => bridgeContract.lockNativeToken(tokenAddress, utils.parseUnits(bridgeAmount.toString(), 18), bridgeTargetChain),
          (tx, txReceipt) => 
          {
            const lockEvent = getLockEvent(tx.hash, txReceipt);
            resetBridgeToken();
          })
    }

    const getLockEvent = (txHash, txReceipt) => {
        const iface = new ethers.utils.Interface(lockEventAbi);
        const log = iface.parseLog(txReceipt.logs[2]);

        const event = {
            targetChainID: log.args.targetChainID.toString()
        }

        setClaimUrl(`http://localhost:8080/mint?sourceChainId=${event.targetChainID}&txHash=${txHash}`)
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
            <ChainSelector setSelectedChain={setBridgeTargetChain} currentChainID={currentChainId} />
            {claimUrl && <a className="link" href={claimUrl} target="_blank">Get Signed Claim</a>}
            <div className="flex-item border-bottom">
                <button onClick={bridgeToken}>Bridge Token</button>
            </div>
            
        </div>
    )
    }

export default BridgeToken