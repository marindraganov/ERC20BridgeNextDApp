import { useState, useEffect } from "react";
import { shortenHex, tokens } from "../util";
import useTokenSymbol from "../hooks/useTokenSymbol";

const TokenSelector = ({setSelectedToken}) => {
    const [newToken, setNewToken] = useState("");
    let symbol = useTokenSymbol(newToken);

    const setSelected = (select) => {
        setSelectedToken(tokens.find((t) => t.address == select.target.value))
    }

    const tokenInput = (select) => {
        const newToken = select.target.value;
        setNewToken(newToken)
    }

    const importToken = () => {
        if (symbol && newToken && !tokens.some((t) => t.address == newToken)) {
            tokens.push({symbol: symbol, address: newToken, isNative: false})
            setNewToken("")
            symbol = ""
        }
    }

  return (
    <>
    <div className="flex-item">
        <label>SelectToken
            <select defaultValue={'DEFAULT'} onChange={setSelected}>
                <option disabled value='DEFAULT'>-select-</option>
                {tokens.map((token, index) => 
                    <option key={index} value={token.address}>
                        {token.symbol} {shortenHex(token.address)}</option>
                )} 
                <option value='-1'>None</option>
            </select>
        </label>
    </div>
        <div className="flex-item">
        Token Import
        <label>
            <input disabled className="token-symbol-inout" value={symbol} type="text"></input>
            <input onChange={tokenInput} value={newToken} type="text"></input>
        </label>
        <button onClick={importToken} className="inputButton">Import</button>
    </div>
    </>
  )
}

export default TokenSelector