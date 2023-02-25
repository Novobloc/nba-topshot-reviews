const FLOW_ENV = process.env.NEXT_PUBLIC_FLOW_ENV || "testnet";

const NETWORKS: any = {
  emulator: {
    flowNetwork: "local",
    accessApi: process.env.NEXT_PUBLIC_EMULATOR_API || "http://localhost:8888",
    walletDiscovery: "https://fcl-discovery.onflow.org/local/authn",
    walletDiscoveryApi: "https://fcl-discovery.onflow.org/api/local/authn",
    walletDiscoveryInclude: [],
    addresses: {
      FlowToken: "0x0ae53cb6e3f42a79",
      NonFungibleToken: "0x0ae53cb6e3f42a79",
      MetadataViews: "0x0ae53cb6e3f42a79",
      MonsterMaker: "0x0ae53cb6e3f42a79",
      FungibleToken: "0xee82856bf20e2aa6"
    }
  },
  testnet: {
    flowNetwork: "testnet",
    accessApi: "https://rest-testnet.onflow.org", // https://access-testnet.onflow.org
    walletDiscovery: "https://fcl-discovery.onflow.org/testnet/authn",
    walletDiscoveryApi: "https://fcl-discovery.onflow.org/api/testnet/authn",
    walletDiscoveryInclude: [
      "0x82ec283f88a62e65" // Dapper Wallet
    ],
    addresses: {
      FlowToken: "0x7e60df042a9c0868",
      NonFungibleToken: "0x631e88ae7f1d7c20",
      MetadataViews: "0x631e88ae7f1d7c20",
      MonsterMaker: "0xfd3d8fe2c8056370",
      FungibleToken: "0x9a0766d93b6608b7"
    }
  }
};

export const NETWORK = NETWORKS[FLOW_ENV];

export const getNetwork = (flowEnv = "testnet") => NETWORKS[flowEnv];
