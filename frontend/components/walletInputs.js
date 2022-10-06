import React from "react";

const WalletInputs = ({ chain, address, setChain, setAddress }) => {
  return (
    <div>
      <h1>Input a Wallet and Chain</h1>
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
      </select>
    </div>
  );
};

export default WalletInputs;
