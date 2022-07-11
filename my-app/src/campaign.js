import { ethers } from "ethers";
import abi from "./utils/Campaign.json";

const contractABI = abi.abi;
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

const CampaignClass = (address) => {
  return new ethers.Contract(address, contractABI, signer);
};

export default CampaignClass;
