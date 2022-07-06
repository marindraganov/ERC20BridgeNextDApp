import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { parseBalance, shortenHex } from "../util";
import { NETWORKS_NAMES } from "../constants";

type Claim = {
  amount: number,
  tknAddress: string,
  tknName: string,
  tknSymbol: string,
  txHash: string,
  targetChainID: number,
  nativeChainId: number,
  v: string,
  r: string,
  s: string,
};

const MintWToken = ({bridgeContract, executeTx}) => {
    const [claimTxt, setClaimTxt] = useState("");
    const [message, setMessage] = useState("");
    const [claim, setClaim] = useState<Claim>(null);

    useEffect(() => {

      bridgeContract.on('Mint', (sender, amount, wTokenAddress, ev) => {
        //setMessage(`Minted: ${parseBalance(amount)} ${wTokenAddress}`);
      })
    },[])

    const claimMint = async () => {
      executeTx(
        () => bridgeContract.claimMint(
                              claim.amount, 
                              claim.tknAddress,
                              claim.nativeChainId,
                              claim.tknName, 
                              claim.tknSymbol,
                              claim.txHash,
                              claim.v,
                              claim.r,
                              claim.s), 
        (tx, txReceipt) => {
          setMessageFromReceipt(tx, txReceipt);
          resetInputs();
        })
    }

    const setMessageFromReceipt = async (tx, txReceipt) => {
      let abi = ["event Mint(address indexed user, uint amount, address wTknAddress)"]
      let iface = new ethers.utils.Interface(abi);
      let log;
      for (let i in txReceipt.logs) {
        try{
          log = iface.parseLog(txReceipt.logs[i]);
          setMessage(`Minted: ${parseBalance(log.args.amount)} ${log.args.wTknAddress}   ${shortenHex(tx.hash, 2)}`);
          break;
        }
        catch{}
      }
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
        setMessage("")
      }
      catch { 
        setClaim(null)
      }
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
              <input disabled value={parseBalance(ethers.BigNumber.from(claim?.amount ?? 0))} type="text" />
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
              <input disabled value={shortenHex(claim?.txHash ?? "", 9)} type="text" />
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
      {message && (<div className="flex-item">{message}</div>)}
      <div className="flex-item border-bottom">
          <button onClick={claimMint}>Claim Mint</button>
      </div>
    </div>
  )
}

export default MintWToken