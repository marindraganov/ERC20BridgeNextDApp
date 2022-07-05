import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { parseBalance, shortenHex } from "../util";

type Claim = {
  amount: number,
  nativeTknAddress: string,
  txHash: string,
  v: string,
  r: string,
  s: string,
};

const UnlockNativeToken = ({bridgeContract, executeTx}) => {
  const [claimTxt, setClaimTxt] = useState("");
  const [claim, setClaim] = useState<Claim>(null);

  useEffect(() => {

  },[])

  const claimUnlock = async () => {
    executeTx(
      () => bridgeContract.claimUnlock(
                            claim.amount, 
                            claim.nativeTknAddress,
                            claim.txHash,
                            claim.v,
                            claim.r,
                            claim.s), 
      () => {resetInputs();})
  }

  const resetInputs = async () => {
    setClaim(null);
    setClaimTxt("");
  }

  const claimInput = (input) => {
    setClaimTxt(input.target.value);
    try{
      const claimObj = JSON.parse(input.target.value)
      setClaim(claimObj)
    }
    catch { 
      setClaim(null)
    }
  }

return (
  <div className="flex-item">
    <div className="flex-item border-top">
      <div className="action-header">Claim Unlock Native Token</div>
      <label>
            Paste Claim: 
            <input onChange={claimInput} value={claimTxt} type="text" />
        </label>
      </div>
      { claim && (
        <>
        <div className="flex-item">
          <label>
              Amount: 
              <input disabled value={parseBalance(ethers.BigNumber.from(claim?.amount))} type="text" />
          </label>
        </div>
        <div className="flex-item">
          <label>
              ERC20Adress: 
              <input disabled value={shortenHex(claim?.nativeTknAddress, 9)} type="text" />
          </label>
        </div>
        <div className="flex-item">
          <label>
              ClaimTxHash: 
              <input disabled value={shortenHex(claim?.txHash, 9)} type="text" />
          </label>
        </div>
        </>
      )}
    <div className="flex-item border-bottom">
        <button onClick={claimUnlock}>Claim Unlock</button>
    </div>
  </div>
)
}

export default UnlockNativeToken