import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x7b5CB1e0701132bc7c7019Efa4069514870b4e13"
);

export default instance;
