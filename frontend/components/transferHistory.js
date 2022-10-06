import React from 'react'
import axios from 'axios'
import { shortenAddress } from "../utils/shortenAddress"; 

const TransferHistory = ({ address, chain, transfers, setTransfers }) => {

  async function getTokenTransfers() {
    console.log("address", address);
    console.log("chain", chain);

    const response = await axios.get("http://localhost:8000/tokenTransfers", {
      params: {
        address: address,
        chain: chain,
      },
    });
    if (response.data) {
      setTransfers(response.data);
    }
  }

  return (
    <div>
      <h1>Transfer History</h1>
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
                <td>{e.block_timestamp}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default TransferHistory