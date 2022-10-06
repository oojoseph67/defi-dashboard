import React from "react";
import { useState, useEffect } from "react";

const PortfolioValue = ({ nativePrice, tokens }) => {
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    let val = 0;
    for (let i = 0; i < tokens.length; i++) {
      val = val + Number(tokens[i].usd);
    }
    val = val + Number(nativePrice);
    setTotalValue(val.toFixed(2));
  }, [nativePrice, tokens]);

  return (
    <div>
      <h1>Portfolio Total Value</h1>
      <p>
        <span>Total Balance: ${totalValue}</span>
      </p>
    </div>
  );
};

export default PortfolioValue;
