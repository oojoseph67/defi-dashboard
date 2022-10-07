import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

import WalletInputs from "../components/walletInputs";
import NativeToken from "../components/nativeTokens";
import Tokens from "../components/tokens";
import PortfolioValue from "../components/portfolioValue";
import TransferHistory from "../components/transferHistory";
import WalletNFTs from "../components/walletNFTs";
import { Avatar, TabList, Tab } from "@web3uikit/core";
import { shortenAddress } from "../utils/shortenAddress";
import {
  ConnectWallet,
  ChainId,
  useAddress,
  useMetamask,
  useDisconnect,
  useNetworkMismatch,
  useNetwork,
  useContract,
} from "@thirdweb-dev/react";

export default function Home() {
  // const [address, setAddress] = useState(useAddress());

  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const isMismatched = useNetworkMismatch(); // switch to desired chain
  const [, switchNetwork] = useNetwork();

  const [chain, setChain] = useState("0x1");
  const [nativeBalance, setNativeBalance] = useState(0);
  const [nativePrice, setNativePrice] = useState(0);
  const [tokens, setTokens] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [walletNFTs, setWalletNFTs] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([]);

  console.log("address", address);
  useEffect(() => {
    // if (address) {
    //   getNativeBalance();
    //   getNativePrice();
    //   getTokens();
    //   getTransfers();
    //   getWalletNFTs();
    // }
    // networkCheck();
  }, [address, chain, nativeBalance, nativePrice, tokens, transfers, walletNFTs, filteredNFTs]);

  // async function networkCheck() {
  //   if (chain != "0x1" && chain != "0x38") {
  //     if (isMismatched) {
  //       await switchNetwork(ChainId.Mainnet);
  //     }
  //   }
  // }

  if (!address) {
    return (
      <div>
        <button onClick={connectWithMetamask}>Connect Wallet</button>
      </div>
    );
  }

  return (
    <div className="App">
      <div>
        <WalletInputs
          chain={chain}
          setChain={setChain}
          address={address}
          disconnect={disconnect}
          connectWithMetamask={connectWithMetamask}
          // setAddress={setAddress}
        />
        <br></br>

        <div className="contents">
          <div className="walletInfo">
            <div>
              <Avatar isRounded size={130} theme="image" />
              {!address ? (
                <div>
                  <h6>No Wallet Connected</h6>
                </div>
              ) : (
                <h2>{shortenAddress(address)}</h2>
              )}
            </div>

            <PortfolioValue nativePrice={nativePrice} tokens={tokens} />
          </div>

          <TabList>
            <Tab tabKey={1} tabName={"Tokens"}>
              <NativeToken
                address={address}
                chain={chain}
                nativeBalance={nativeBalance}
                setNativeBalance={setNativeBalance}
                nativePrice={nativePrice}
                setNativePrice={setNativePrice}
              />
              <Tokens
                address={address}
                chain={chain}
                tokens={tokens}
                setTokens={setTokens}
              />
            </Tab>
            <Tab tabKey={2} tabName={"Transfers"}>
              <TransferHistory
                address={address}
                chain={chain}
                transfers={transfers}
                setTransfers={setTransfers}
              />
            </Tab>
            <Tab tabKey={3} tabName={"NFTs"}>
              <WalletNFTs
                address={address}
                chain={chain}
                walletNFTs={walletNFTs}
                setWalletNFTs={setWalletNFTs}
                filteredNFTs={filteredNFTs}
                setFilteredNFTs={setFilteredNFTs}
              />
            </Tab>
          </TabList>
        </div>
      </div>
    </div>
  );
}
