import { useState, useEffect } from "react";
import { shortenHex, tokensHolder } from "../util";
import useTokenSymbol from "../hooks/useTokenSymbol";
import useIsWrappedToken from "../hooks/useIsWrappedToken";

const TokenSelector = ({selectedToken, setSelectedToken, chainID, bridgeAddress}) => {
    const [newToken, setNewToken] = useState("");
    const [tokens, setTokens] = useState(tokensHolder.get(chainID));
    const [selectedVal, setSelectedVal] = useState("DefaultValue");
    let symbol = useTokenSymbol(newToken);
    let isWrapped = useIsWrappedToken(bridgeAddress, newToken)

    useEffect(() => {
        setTokens(tokensHolder.get(chainID))
        setSelectedVal("DefaultValue")
    },[chainID])

    const setSelected = (select) => {
        setSelectedToken(tokensHolder.get(chainID).find((t) => t.address == select.target.value))
        setSelectedVal(select.target.value)
    }

    const tokenInput = (select) => {
        const newToken = select.target.value;
        setNewToken(newToken)
    }

    const importToken = () => {
        if (symbol && newToken && !tokens.some((t) => t.address == newToken)) {
            tokensHolder.add({symbol: symbol, address: newToken, isWrapped: isWrapped, chainID: chainID})
            setTokens(tokensHolder.get(chainID))
            setNewToken("")
            symbol = ""
        }
    }

  return (
    <>
    <div className="flex-item">
        <label>SelectToken
            <select value={selectedVal} onChange={setSelected}>
                <option disabled value="DefaultValue">-select-</option>
                {tokens.map((token, index) => 
                    <option key={index} value={token.address}>
                        {token.symbol} {shortenHex(token.address)}</option>
                )} 
                <option value='-1'>None</option>
            </select>
        </label>
        <label>
            <input disabled className="token-symbol-inout" value={symbol} type="text"></input>
            <input onChange={tokenInput} value={newToken} type="text"></input>
        </label>
        <button onClick={importToken} className="inputButton">ImportToken</button>
    </div>
    <div className="flex-item">

    </div>
    </>
  )
}

export default TokenSelector