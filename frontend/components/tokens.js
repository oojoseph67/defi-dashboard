import React from "react";
import axios from "axios";
import { shortenAddress } from "../utils/shortenAddress"; 

const Tokens = ({ address, chain, tokens, setTokens }) => {
  async function getTokenBalances() {
    // const response = await axios.get(
    //   `http://localhost:8000/nativeBalance?address=${wallet}&chain=${chain}`
    // );

    console.log("address", address);
    console.log("chain", chain);

    const response = await axios.get("http://localhost:8000/tokenBalance", {
      params: {
        address: address,
        chain: chain,
      },
    });

    if (response.data) {
      let t = response.data;

      for (let i = 0; i < t.length; i++) {
        t[i].bal = (
          Number(t[i].balance) / Number(`1E${t[i].decimals}`)
        ).toFixed(4);
        t[i].usd = (t[i].bal * Number(t[i].usd)).toFixed(2);
        t[i].address = t[i].token_address
      }
      setTokens(t);
    }
  }

  return (
    <div>
      <p>
        <button onClick={getTokenBalances}>Get Token</button>
      </p>
      <br></br>
      {tokens.length > 0 &&
        tokens.map((e) => {
          return (
            <div>
              <span>
                Token Name: {e.name} Token Address: {shortenAddress(e.address)} Symbol: {e.symbol} Balance: {e.bal}, (${e.usd})
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default Tokens;
