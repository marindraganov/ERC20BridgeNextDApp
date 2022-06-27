import { useState, useEffect } from "react";
import { utils } from "ethers";

const MintToken = ({tokenAddress, bridgeContract, executeTx}) => {
    const [amount, setAmount] = useState(0);
    const [hash, setHash] = useState("");

    useEffect(() => {
      bridgeContract.on('Mint', (sender, amount, wTokenAddress) => {
        console.log(sender);
        console.log(amount);
        console.log(wTokenAddress);
      })
    },[])

    const claimMint = async () => {
      const hashBytes = utils.formatBytes32String(hash);
      executeTx(
        () => bridgeContract.claimMint(utils.parseUnits(amount.toString(), 18), tokenAddress, "CoolToken", "COOL", hashBytes), 
        () => {resetInputs();})
    }

    const resetInputs = async () => {
      setAmount(0);
      setHash("");
    }

    const amountInput = (input) => {
      setAmount(input.target.value)
    }

    const hashInput = (input) => {
      setHash(input.target.value)
    }

  return (
    <div className="flex-item">
      <div className="flex-item border-top">
        <label>
            Amount: 
            <input onChange={amountInput} value={amount} type="number" />
        </label>
      </div>
      <div className="flex-item">
        <label>
            TxHash: 
            <input onChange={hashInput} value={hash} type="text" />
        </label>
      </div>
      <div className="flex-item border-bottom">
          <button onClick={claimMint}>Claim Mint</button>
      </div>
    </div>
  )
}

export default MintToken