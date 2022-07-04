import { useState, useEffect } from "react";
import { utils } from "ethers";

const BurnWToken = ({tokenAddress, bridgeContract, executeTx}) => {
    const [amount, setAmount] = useState(0);

    useEffect(() => {
      bridgeContract.on('Mint', (sender, amount, wTokenAddress) => {
        console.log(`${sender}`);
      })
    },[])

    const burnWToken = async () => {
      executeTx(
        () => bridgeContract.burnWrappedToken(tokenAddress, utils.parseUnits(amount.toString(), 18)), 
        () => {resetInputs();})
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
      <div className="flex-item border-bottom">
          <button onClick={burnWToken}>Burn Token</button>
      </div>
    </div>
  )
}

export default BurnWToken