import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'

import WalletInputs from '../components/walletInputs'
import NativeToken from '../components/nativeTokens';
import Tokens from '../components/tokens';
import PortfolioValue from '../components/portfolioValue'
import TransferHistory from '../components/transferHistory'
import WalletNFTs from '../components/walletNFTs'
import {Avatar, TabList, Tab} from "@web3uikit/core"

export default function Home() {
  const [address, setAddress] = useState('')
  const [chain, setChain] = useState('0x1')
  const [nativeBalance, setNativeBalance] = useState(0)
  const [nativePrice, setNativePrice] = useState(0)
  const [tokens, setTokens] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [walletNFTs, setWalletNFTs] = useState([]);
  const [filteredNFTs, setFilteredNFTs] = useState([])

  return (
    <div className="App">
      <div>
        <WalletInputs
          chain={chain}
          setChain={setChain}
          address={address}
          setAddress={setAddress}
        />

        <div className="contents">
          <PortfolioValue
            nativePrice={nativePrice}
            tokens={tokens} 
          />
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
