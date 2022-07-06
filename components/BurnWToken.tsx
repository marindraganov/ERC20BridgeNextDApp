import { useState, useEffect } from "react";
import { utils, ethers } from "ethers";
import { shortenHex } from "../util";
import { VALIDATOR_ADDRESS } from "../constants";

const BurnWToken = ({tokenAddress, bridgeContract, executeTx, currentChainId}) => {
    const [amount, setAmount] = useState(0);
    const [claimInfo, setclaimInfo] = useState(null);

    useEffect(() => {
    },[])

    const burnWToken = async () => {
      executeTx(
        () => bridgeContract.burnWrappedToken(tokenAddress, utils.parseUnits(amount.toString(), 18)), 
        (tx, txReceipt) => {
            const url = `${VALIDATOR_ADDRESS}/unlock?sourceChainId=${currentChainId}&txHash=${tx.hash}`;
            setclaimInfo({url: url, txHash: shortenHex(tx.hash)})
            resetInputs();
        })
    }

    const resetInputs = async () => {
      setAmount(0);
    }

    const amountInput = (input) => {
      setAmount(input.target.value)
    }

  return (
    <div className="flex-item">
      <div className="flex-item border-top">
        <div className="action-header">Burn Wrapped Token To Unlock Native Token</div>
        <label>
            Amount: 
            <input onChange={amountInput} value={amount} type="number" />
        </label>
      </div>
      {claimInfo && <a className="link" href={claimInfo.url} target="_blank">Get Signed Claim {claimInfo.txHash}</a>}
      <div className="flex-item border-bottom">
          <button onClick={burnWToken}>Burn Token</button>
      </div>
    </div>
  )
}

export default BurnWToken