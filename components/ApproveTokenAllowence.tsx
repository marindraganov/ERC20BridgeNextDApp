import { useState } from "react";
import useTokenContract from "../hooks/useTokenContract";
import { utils } from "ethers";

const ApproveTokenAllowence = ({tokenAddress, bridgeAddress, executeTx}) => {
    const tokenContract = useTokenContract(tokenAddress);

    const [amountToApprove, setAmountToApprove] = useState(0);

    const approveAllowance = async () => {
      executeTx(
        () => tokenContract.approve(bridgeAddress, utils.parseUnits(amountToApprove.toString(), 18)), 
        () => {resetAmount();})
    }

    const resetAmount = async () => {
      setAmountToApprove(0);
    }

    const amountInput = (input) => {
      setAmountToApprove(input.target.value)
    }

  return (
    <div className="flex-item">
      <div className="flex-item border-top">
        <label>
            Amount: 
            <input onChange={amountInput} value={amountToApprove} type="number" name="numberOfCopies" />
        </label>
      </div>
      <div className="flex-item border-bottom">
          <button onClick={approveAllowance}>Approve Bridge Allowannce</button>
      </div>
    </div>
  )
}


export default ApproveTokenAllowence