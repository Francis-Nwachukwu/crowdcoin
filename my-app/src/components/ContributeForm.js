import { useState } from "react";
import { useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ethers } from "ethers";
import { Form, Button, Input, Message } from "semantic-ui-react";

import CampaignClass from "../campaign";

const ContributeForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [contributeAmount, setContributeAmount] = useState("");

  const { address } = useParams();
  const history = createBrowserHistory();

  const onSubmit = async (event) => {
    event.preventDefault();
    const campaign = CampaignClass(address);

    setLoading(true);
    setErrorMessage("");

    try {
      // const { ethereum } = window;
      // await ethereum.request({
      //   method: "eth_requestAccounts",
      // });
      await campaign.contribute({
        value: ethers.utils.parseEther(contributeAmount),
      });
      history.back();
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
    setContributeAmount("");
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={contributeAmount}
          onChange={(event) => setContributeAmount(event.target.value)}
          label="ether"
          labelPosition="right"
        />
      </Form.Field>
      <Message error header="Oops!" content={errorMessage} />
      <Button floated="right" secondary loading={loading}>
        Contribute
      </Button>
    </Form>
  );
};
export default ContributeForm;
