import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are onbrowser and user have installed Metamask
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are in server OR user doesn't have Metamask
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/65bc3181abe44d62aa36ed4fdb857397"
  );

  web3 = new Web3(provider);
}

export default web3;
