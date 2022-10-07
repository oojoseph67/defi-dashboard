import React from "react";
import { Input, Select, CryptoLogos } from "@web3uikit/core";
import { shortenAddress } from "../utils/shortenAddress";
import { useState, useEffect } from "react";

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

const WalletInputs = ({
  chain,
  address,
  setChain,
  setAddress,
  disconnect,
  connectWithMetamask,
}) => {
  const isMismatched = useNetworkMismatch(); // switch to desired chain
  const [, switchNetwork] = useNetwork();

  useEffect(() => {
    networkCheck();
  }, [address, setChain, disconnect]);

  async function networkCheck() {
    if (chain != "0x1" && chain != "0x38") {
      if (isMismatched) {
        await switchNetwork(ChainId.Mainnet);
      }
    }
  }

  return (
    <div className="header">
      <div className="title">
        <svg></svg>
        <h1>DeFi Dashboard</h1>
      </div>
      <div className="walletInputs">
        {/* <Input
          id="Wallet"
          label="Wallet Address"
          labelBgColor="rbg(33, 33, 33)"
          value={address}
          style={{ height: "50px" }}
          onChange={(e) => setAddress(e.target.value)}
        /> */}

        <p>
          {/* {shortenAddress(address)} */}
          {!address ? (
            <div>
              <h6>...</h6>
            </div>
          ) : (
            <h2>{shortenAddress(address)}</h2>
          )}
        </p>
        {/* {!address ? (
          <div>
            <button onClick={connectWithMetamask}>Connect Wallet</button>
          </div>
        ) : (
          <button onClick={disconnect}>Disconnect</button>
        )} */}

        <button onClick={disconnect}>Disconnect</button>

        <Select
          defaultOptionIndex={0}
          id="Chain"
          onChange={(e) => setChain(e.value)}
          options={[
            {
              id: "eth",
              label: "ETH",
              value: "0x1",
              prefix: <CryptoLogos chain="ethereum" />,
            },
            {
              id: "bsc",
              label: "BSC",
              value: "0x38",
              prefix: <CryptoLogos chain="binance" />,
            },
          ]}
        />
      </div>

      {/* <h1>Input a Wallet and Chain</h1>
      <p>
        <span>Set Wallet</span>
        <input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        ></input>
      </p>
      <span>Set Chain</span>
      <select onChange={(e) => setChain(e.target.value)} value={chain}>
        <option value="0x1">ETH</option>
        <option value="0x60">BSC</option>
      </select> */}
    </div>
  );
};

export default WalletInputs;
