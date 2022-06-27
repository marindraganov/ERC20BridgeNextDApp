import { shortenHex } from "../util";

const TokenSelector = ({setSelectedToken}) => {
    const tokens = [{symbol: "COOL", address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"}]

    const setSelected = (select) => {
        setSelectedToken(select.target.value)
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
          
            </select>
        </label>
    </div>
  )
}

export default TokenSelector