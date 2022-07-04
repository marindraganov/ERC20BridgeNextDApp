import { shortenHex, tokens } from "../util";

const TokenSelector = ({setSelectedToken}) => {

    const setSelected = (select) => {
        setSelectedToken(tokens.find((t) => t.address == select.target.value))
    }

  return (
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
  )
}

export default TokenSelector