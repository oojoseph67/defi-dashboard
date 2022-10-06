import React from "react";
import axios from "axios";

const NativeToken = ({
  address,
  chain,
  nativeBalance,
  setNativeBalance,
  nativePrice,
  setNativePrice,
}) => {
  async function getNativeBalance() {
    // const response = await axios.get(
    //   `http://localhost:8000/nativeBalance?address=${wallet}&chain=${chain}`
    // );

    console.log("address", address);
    console.log("chain", chain);

    const response = await axios.get("http://localhost:8000/nativeBalance", {
      params: {
        address: address,
        chain: chain,
      },
    });
    console.log("response", response);
    if (response.data.balance && response.data.usd) {
      setNativeBalance((Number(response.data.balance) / 10 ** 18).toFixed(4));
      setNativePrice(
        (
          (Number(response.data.balance) / 10 ** 18) *
          Number(response.data.usd)
        ).toFixed(2)
      );
      console.log('nativeBalance', nativeBalance)
    }
  }
  return (
    <div>
      <div>
        <h1>Fetch Tokens</h1>
        <p>
          <button onClick={getNativeBalance}>Fetch Native Balance</button>
          <br></br>
          {
            nativeBalance === '0.0000' ? (
              <span>
                No ETH or BNB balance found. Please input a wallet and chain.
              </span>
            ): (
              <span>
                ETH Balance: {nativeBalance}, (${nativePrice})
              </span>
            )
          }
          
        </p>
      </div>
    </div>
  );
};

export default NativeToken;
