import { ethers } from "ethers";
import abi from "./utils/CampaignFactory.json";

const contractABI = abi.abi;
const { ethereum } = window;
const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();

export const campaignFactoryContract = new ethers.Contract(
  "0x0A39c77558d808e20c4Df02F16467Bfe02a97B41",
  contractABI,
  signer
);
