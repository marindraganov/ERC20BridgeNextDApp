import { NETWORKS_NAMES } from "../constants";

const NetworkInfo = ({chainID}) => {
    const networkName = !!NETWORKS_NAMES[chainID] ? NETWORKS_NAMES[chainID] : "UNKNOWN"
  return (
    <div>You Are Connected To <b>{networkName}</b> Network</div>
  )
}

export default NetworkInfo