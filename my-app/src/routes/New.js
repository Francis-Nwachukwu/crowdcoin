import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { ethers } from "ethers";
import { FaArrowLeft } from "react-icons/fa";
import { createBrowserHistory } from "history";
import abi from "../utils/CampaignFactory.json";

import "../App.css";

const CampaignNew = () => {
  const contractAddress = "0x0A39c77558d808e20c4Df02F16467Bfe02a97B41";
  const contractABI = abi.abi;

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [minimumContribution, setMinimumContribution] = useState("");

  const history = createBrowserHistory();

  const onSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = await provider.getSigner();
        const campaignFactoryContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        await campaignFactoryContract.createCampaign(minimumContribution);
        history.back();
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };
  return (
    <div className="section">
      <h1>New campaign</h1>
      <Link to={`/`}>
        <FaArrowLeft />
        {" Back"}
      </Link>

      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Minimum Contribution (100 wei)</label>
          <Input
            label="wei"
            labelPosition="left"
            value={minimumContribution}
            onChange={(event) => {
              setMinimumContribution(event.target.value);
            }}
          />
        </Form.Field>

        <Message error header="Error!" content={errorMessage} />

        <Button loading={loading} secondary>
          Create Campaign
        </Button>
      </Form>
    </div>
  );
};

export default CampaignNew;
