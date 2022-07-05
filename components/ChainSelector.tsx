import { NETWORKS_NAMES } from "../constants";
import { useState } from "react";

const ChainSelector = ({setSelectedChain, selectedChain, currentChainID}) => {

    const setSelected = (select) => {
        setSelectedChain(select.target.value)
    }

    return (
    <div className="flex-item">
        <label>TargetChain
            <select value={selectedChain} onChange={setSelected}>
                <option disabled value="0">-select-</option>
                {Object.keys(NETWORKS_NAMES).filter(key => key != currentChainID)
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