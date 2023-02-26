import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as fcl from "@onflow/fcl";
import { NETWORK } from "../constants/networks";
import { init } from "@onflow/fcl-wc";
import { IWeb3Context } from "../utils/types";
import Logo from "../assets/nba-logo.jpeg";
import { getMomentsWithHighestBurnedTopshotScore, getAllPlayers } from "../utils/graphql";

export const Web3Context = createContext<IWeb3Context>({} as IWeb3Context);

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error("useWeb3Context must be used within a Web3ContextProvider");
  }
  return context;
};

export const Web3ContextProvider = ({ children }: { children: ReactNode; network?: string }) => {
  const [user, setUser] = useState({ loggedIn: null, addr: "" });
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<number | null>(null);
  const [transactionError, setTransactionError] = useState("");
  const [txId, setTxId] = useState(null);
  const [client, setClient] = useState(null);

  const wcSetup = useCallback(async (appTitle: string, iconUrl: string) => {
    const DEFAULT_APP_METADATA = {
      name: appTitle,
      description: appTitle,
      url: window.location.origin,
      icons: [iconUrl]
    };

    const { FclWcServicePlugin, client } = await init({
      projectId: "12ed93a2aae83134c4c8473ca97d9399", // required
      metadata: DEFAULT_APP_METADATA, // optional
      includeBaseWC: true // optional, default: false
    });

    setClient(client);
    fcl.pluginRegistry.add(FclWcServicePlugin);
  }, []);

  useEffect(() => {
    const { flowNetwork, accessApi, walletDiscovery, walletDiscoveryApi, walletDiscoveryInclude, addresses } = NETWORK;
    const iconUrl = window.location.origin + "/nba-logo-black.png";
    const appTitle = "NBA Chronos";

    fcl.config({
      "app.detail.title": appTitle,
      "app.detail.icon": iconUrl,
      "accessNode.api": accessApi, // connect to Flow
      "flow.network": flowNetwork,
      "discovery.wallet": walletDiscovery, // use wallets on public discovery
      "discovery.authn.endpoint": walletDiscoveryApi, // public discovery api endpoint
      "discovery.authn.include": walletDiscoveryInclude, // opt-in wallets
      "0xFungibleToken": addresses.FungibleToken,
      "0xFlowToken": addresses.FlowToken,
      "0xNonFungibleToken": addresses.NonFungibleToken,
      "0xMetadataViews": addresses.MetadataViews,
      "0xMonsterMaker": addresses.MonsterMaker,
      "0xTOPSHOTADDRESS": "0x877931736ee77cff", //https://flow-view-source.com/testnet/account/0x877931736ee77cff/contract/TopShot
      "0xTopShotMarketV3": "0x547f177b243b4d80" //https://flow-view-source.com/testnet/account/0x547f177b243b4d80/contract/TopShotMarketV3
    });

    if (!client) {
      wcSetup(appTitle, iconUrl);
    }
  }, []);

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const connect = useCallback(() => {
    fcl.authenticate();
  }, []);

  const logout = useCallback(async () => {
    await fcl.unauthenticate();
  }, []);

  const getTopShotMomentsByPlayerQuery = useCallback(async () => {
    const result = await fcl.query({
      cadence: `
      import TopShot from 0xTOPSHOTADDRESS

      pub fun main(account: Address): [UInt64] {

          let acct = getAccount(account)

          let collectionRef = acct.getCapability(/public/MomentCollection)
                                  .borrow<&{TopShot.MomentCollectionPublic}>()!

          return collectionRef.getIDs()
      }
      `,
      args: (arg: any, t: any) => [
        arg("0x5bd3724a9bbd7411", t.Address) // addr: Address
      ]
    });
    console.log(result); // 13
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getAllPlayers();
      console.log(data, "data");
    })();
  }, []);

  const executeTransaction = useCallback(async (cadence: string, args: any = () => [], options: any = {}) => {
    setTransactionInProgress(true);
    setTransactionStatus(-1);

    const transactionId = await fcl
      .mutate({
        cadence,
        args,
        limit: options.limit || 50
      })
      .catch((e: Error) => {
        setTransactionInProgress(false);
        setTransactionStatus(500);
        setTransactionError(String(e));
      });

    if (transactionId) {
      setTxId(transactionId);
      fcl.tx(transactionId).subscribe((res: any) => {
        setTransactionStatus(res.status);
        setTransactionInProgress(false);
      });
    }
  }, []);

  const executeScript = useCallback(async (cadence: string, args: any = () => []) => {
    try {
      return await fcl.query({
        cadence: cadence,
        args
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const providerProps = useMemo(
    () => ({
      connect,
      logout,
      user,
      executeTransaction,
      executeScript,
      transaction: {
        id: txId,
        inProgress: transactionInProgress,
        status: transactionStatus,
        errorMessage: transactionError
      }
    }),
    [connect, logout, txId, transactionInProgress, transactionStatus, transactionError, executeTransaction, executeScript, user]
  );

  return (
    <Web3Context.Provider
      value={{
        ...providerProps
      }}>
      {children}
    </Web3Context.Provider>
  );
};
