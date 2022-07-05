
  export interface Networks {
    [key: number]: string;
  }
  export const walletConnectSupportedNetworks: Networks = {
    // Add your network rpc URL here
    1: "https://ethereumnode.defiterm.io",
    3: "https://ethereumnode.defiterm-dev.net",
    31337: "http://localhost:8545"
  };

  export const VALIDATOR_ADDRESS = "https://erc20-validator.herokuapp.com"//http://localhost:8080"

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
  export const BRIDGE_ADDRESS = {
    3: "0x5ffE3D69f6bF1f651eeb808D4bA972f7719b0630",
    4: "0xC6Dd3324Db4F3e740D260D258Ac760339856566A"
  };