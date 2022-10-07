import React from 'react'
import axios from 'axios'
import { shortenAddress } from "../utils/shortenAddress"; 

import { Table } from "@web3uikit/core";
import { Reload } from "@web3uikit/icons";
import { useEffect, useState } from 'react';


const { default: Moralis } = require("moralis");

const TransferHistory = ({ address, chain, transfers, setTransfers }) => {
  const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  
   useEffect(() => {
    if (address) {
      getTokenTransfers();
    }
   }, [setTransfers]);

  async function getTokenTransfers() {
    try {
      await Moralis.start({ apiKey: apiKey });
      console.log("address", address);
      console.log("chain", chain);
      console.log("breakpoint");

      const response = await axios.get("http://localhost:8000/tokenTransfers", {
        params: {
          address: address,
          chain: chain,
        },
      });
      if (response.data) {
        setTransfers(response.data);
      }
    } catch (error) { 
      
    }
  }

  return (
    <div>
      <div className="tabHeading">
        Transfer History <Reload onClick={getTokenTransfers} />
      </div>
      <div>
        {transfers.length > 0 ? (
          <Table
            pageSize={20}
            noPagination={false}
            style={{ width: "1070px" }}
            columnsConfig="200px 150px 150px 150px 150px 150px 150px"
            data={transfers.map((e) => [
              e.name,
              e.symbol,
              shortenAddress(e.address),
              ((Number(e.value) / Number(`1E${e.decimals}`)).toFixed(4)).slice(0,10),
              shortenAddress(e.from_address),
              shortenAddress(e.to_address),
              e.block_timestamp.slice(0, 10),
            ])}
            header={[
              <span>Name</span>,
              <span>Symbol</span>,
              <span>Token Address</span>,
              <span>Amount</span>,
              <span>From</span>,
              <span>To</span>,
              <span>Date</span>,
            ]}
          />
        ) : (
            <div>No transfers found</div>
        )}
      </div>

      {/* <h1>Transfer History</h1>
      <div>
        <button onClick={getTokenTransfers}>Fetch Transfers</button>

        <table>
          <tr>
            <th>Token Name</th>
            <th>Token Symbol</th>
            <th>Token Address</th>
            <th>Amount</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
          </tr>
          {transfers.length > 0 && transfers.map((e) => {
            return (
              <tr>
                <td>{e.name}</td>
                <td>{e.symbol}</td>
                <td>{shortenAddress(e.address)}</td>
                <td>
                  {Number(e.value) / Number(`1E${e.decimals}`).toFixed(4)}
                </td>
                <td>{shortenAddress(e.from_address)}</td>
                <td>{shortenAddress(e.to_address)}</td>
                <td>{(e.block_timestamp)..slice(0, 10)}</td>
              </tr>
            );
          })}
        </table>
      </div> */}
    </div>
  );
}

export default TransferHistory