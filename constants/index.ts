
  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    1: "https://ethereumnode.defiterm.io",
    3: "https://ethereumnode.defiterm-dev.net",
    31337: "http://localhost:8545"
  };

  export const VALIDATOR_ADDRESS = "http://localhost:8080"

  // Network chain ids
  export const supportedMetamaskNetworks = [1, 3, 4, 5, 42, 31337];
  export const NETWORKS_NAMES= { 
    1: "Mainnet", 
    3: "Ropsten",  
    4: "Rinkeby", 
    5: "Goerli",
    42: "Kovan",
    31337: "Local ETH Node"
  };

  export const TOKEN_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
  export const BRIDGE_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";