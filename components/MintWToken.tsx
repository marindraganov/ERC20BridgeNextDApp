import { useState, useEffect } from "react";
import { ethers, utils } from "ethers";
import { parseBalance, shortenHex } from "../util";
import { NETWORKS_NAMES } from "../constants";

type Claim = {
  amount: number,
  tknAddress: string,
  tknName: string,
  tknSymbol: string,
  txHash: string,
  targetChainID: number,
  v: string,
  r: string,
  s: string,
};

const MintWToken = ({bridgeContract, executeTx}) => {
    const [claimTxt, setClaimTxt] = useState("");
    const [claim, setClaim] = useState<Claim>(null);
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
        () => bridgeContract.claimMint(
                              claim.amount, 
                              claim.tknAddress, 
                              claim.tknName, 
                              claim.tknSymbol,
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

    const hashInput = (input) => {
      setHash(JSON.parse(input.target.value))
    }

  return (
    <div className="flex-item">
      <div className="flex-item border-top">
        <div className="action-header">Mint Wrapped Token</div>
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
              NativeName: 
              <input disabled value={claim?.tknName} type="text" />
          </label>
        </div>
        <div className="flex-item">
          <label>
              ClaimTxHash: 
              <input disabled value={shortenHex(claim?.txHash)} type="text" />
          </label>
        </div>
        <div className="flex-item">
          <label>
              TargetChain: 
              <input disabled value={NETWORKS_NAMES[claim?.targetChainID]} type="text" />
          </label>
        </div>
        </>
      )}
      <div className="flex-item border-bottom">
          <button onClick={claimMint}>Claim Mint</button>
      </div>
    </div>
  )
}

export default MintWToken