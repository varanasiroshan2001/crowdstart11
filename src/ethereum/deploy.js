const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  process.env.REACT_APP_ETHEREUM_SENTENCE,
  "https://goerli.infura.io/v3/65bc3181abe44d62aa36ed4fdb857397"
);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: compiledFactory.evm.bytecode.object })
      .send({ gas: "3000000", from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
  } catch (error) {
    console.log(error);
  }
};
deploy();
