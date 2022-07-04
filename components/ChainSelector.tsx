import { NETWORKS_NAMES } from "../constants";

const ChainSelector = ({setSelectedChain, currentChainID}) => {
    const setSelected = (select) => {
        setSelectedChain(select.target.value)
    }

    return (
    <div className="flex-item">
        <label>TargetChain
            <select defaultValue={'DEFAULT'} onChange={setSelected}>
                <option disabled value='DEFAULT'>-select-</option>
                {Object.keys(NETWORKS_NAMES).filter(key => true)//key != currentChainID)
                    .map((key, index) => 
                        <option key={index} value={key}>
                        {key} {NETWORKS_NAMES[key]}</option>
                )} 

            </select>
        </label>
    </div>
    )
}

export default ChainSelector