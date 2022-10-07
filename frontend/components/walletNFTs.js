import React from "react";
import axios from "axios";
import { shortenAddress } from "../utils/shortenAddress";
import { useState, useEffect } from "react";
import { Input, Select, CryptoLogos } from "@web3uikit/core";
import { Table } from "@web3uikit/core";
import { Reload } from "@web3uikit/icons";

const WalletNFTs = ({
  address,
  chain,
  walletNFTs,
  setWalletNFTs,
  filteredNFTs,
  setFilteredNFTs,
}) => {
  const [nameFilter, setNameFilter] = useState("");
  const [idFilter, setIdFilter] = useState("");

  useEffect(() => {
    if (idFilter.length === 0 && nameFilter.length === 0) {
      return setFilteredNFTs(walletNFTs);
    }

    let filNFTs = [];

    for (let i = 0; i < walletNFTs.length; i++) {
      if (walletNFTs[i].name.includes(nameFilter) && idFilter.length === 0) {
        filNFTs.push(walletNFTs[i]);
      } else if (
        walletNFTs[i].token_id.includes(idFilter) &&
        nameFilter.length === 0
      ) {
        filNFTs.push(walletNFTs[i]);
      } else if (
        walletNFTs[i].token_id.includes(idFilter) &&
        walletNFTs[i].name.includes(nameFilter)
      ) {
        filNFTs.push(walletNFTs[i]);
      }
    }

    setFilteredNFTs(filNFTs);
  }, [nameFilter, idFilter]);

  async function getWalletNFTs() {
    console.log("address", address);
    console.log("chain", chain);

    const response = await axios.get("http://localhost:8000/nftBalance", {
      params: {
        address: address,
        chain: chain,
      },
    });
    console.log("response", response.data);
    if (response.data) {
      nftProcessing(response.data);
    }
  }

  function nftProcessing(nftData) {
    // let nftArray = [];
    // nftData.forEach((nft) => {
    //     if (nft.token_type === "ERC721") {
    //     nftArray.push(nft);
    //     }
    // });
    // setWalletNFTs(nftArray);
    for (let i = 0; i < nftData.length; i++) {
      let meta = JSON.parse(nftData[i].metadata);
      if (meta && meta.image) {
        if (meta.image.includes(".")) {
          nftData[i].image = meta.image;
        } else {
          nftData[i].image = "https://ipfs.moralis.io:2053/ipfs/" + meta.image;
        }
      }
    }
    setWalletNFTs(nftData);
    setFilteredNFTs(nftData);
  }

  return (
    <div>
      <div className="tabHeading">
        NFT Portfolio <Reload onClick={getWalletNFTs} />
      </div>
      <div className="filters">
        <Input
          id="NameF"
          label="Name Filter"
          labelBgColor="rbg(33, 33, 33)"
          value={nameFilter}
          style={{}}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <Input
          id="IdF"
          label="Id Filter"
          labelBgColor="rbg(33, 33, 33)"
          value={idFilter}
          style={{}}
          onChange={(e) => setIdFilter(e.target.value)}
        />
      </div>
      <div className="nftList">
        {filteredNFTs.length > 0 &&
          filteredNFTs.map((e) => {
            return (
              <div className="nftInfo">
                {e.image && (
                  <img src={e.image} alt="nft" width="100" height="100"></img>
                )}
                <p>
                  <b>Name: </b>
                  {e.name}
                </p>
                <p>
                  <b>Token Id: </b>
                  {(e.token_id).slice(0,5)}
                </p>
                <p>
                  <b>Contract Type: </b>
                  {e.contract_type}
                </p>
                <p>
                  <b>Address: </b>
                  {shortenAddress(e.token_address)}
                </p>
              </div>
            );
          })}
      </div>

      {/* <div>
        <h1>NFT Transfer History</h1>
        <div>
          <button onClick={getWalletNFTs}>Fetch NFTs</button>
          <span>Name Filter</span>
          <input
            type="text"
            onChange={(e) => setNameFilter(e.target.value)}
            value={nameFilter}
          ></input>

          <span>Id Filter</span>
          <input
            type="number"
            onChange={(e) => setIdFilter(e.target.value)}
            value={idFilter}
          ></input>
          <br></br>
          {filteredNFTs.length > 0 &&
            filteredNFTs.map((e) => {
              return (
                <div>
                  {e.image && (
                    <img src={e.image} alt="nft" width="100" height="100"></img>
                  )}
                  <p>
                    <b>Name: </b>
                    {e.name}
                  </p>
                  <p>
                    <b>Token Id: </b>
                    {e.token_id}
                  </p>
                  <p>
                    <b>Contract Type: </b>
                    {e.contract_type}
                  </p>
                  <p><b>Address: </b>{shortenAddress(e.token_address)}</p>
                </div>
              );
            })}
        </div>
      </div> */}
    </div>
  );
};

export default WalletNFTs;
