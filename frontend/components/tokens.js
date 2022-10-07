import React from "react";
import axios from "axios";
import { shortenAddress } from "../utils/shortenAddress";
import { Table } from "@web3uikit/core";
import { Reload } from "@web3uikit/icons";

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
        t[i].address = t[i].token_address;
      }
      setTokens(t);
    }
  }

  return (
    <div>
      {chain === "0x1" ? (
        <div className="tabHeading"> ERC20 Token <Reload onClick={getTokenBalances} /> </div>
      ) : chain === "0x38" ? (
        <div className="tabHeading"> BEP20 Token <Reload onClick={getTokenBalances} /> </div>
      ) : (
        <div />
      )}

      {tokens.length > 0 && (
        <Table
          pageSize={10}
          noPagination={false}
          style={{ width: "920px" }}
          columnsConfig="184px 184px 184px 184px 184px"
          data={tokens.map((e) => [
            e.name,
            shortenAddress(e.address),
            e.symbol,
            e.bal,
            `$${e.usd}`,
          ])}
          header={[
            <span>Name</span>,
            <span>Address</span>,
            <span>Symbol</span>,
            <span>Balance</span>,
            <span>Value</span>,
          ]}
        />
      )}

      {/* <p>
        <button onClick={getTokenBalances}>Get Token</button>
      </p>
      <br></br>
      {tokens.length > 0 &&
        tokens.map((e) => {
          return (
            <div>
              <span>
                Token Name: {e.name} Token Address: {shortenAddress(e.address)}{" "}
                Symbol: {e.symbol} Balance: {e.bal}, (${e.usd})
              </span>
            </div>
          );
        })} */}
    </div>
  );
};

export default Tokens;
