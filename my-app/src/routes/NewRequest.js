import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { createBrowserHistory } from "history";
import { parseEther } from "ethers/lib/utils";
import { Form, Button, Message, Input } from "semantic-ui-react";

import CampaignClass from "../campaign";
import "../App.css";
import { FaArrowLeft } from "react-icons/fa";

const NewRequest = () => {
  const { address } = useParams();
  const history = createBrowserHistory();

  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const campaign = CampaignClass(address);
    setLoading(true);
    setErrorMessage("");

    try {
      await campaign.createRequest(description, parseEther(value), recipient);

      // redirect the user after successful creation of request
      history.back();
    } catch (err) {
      setErrorMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="section new-request">
      <Link to={`/campaigns/${address}/requests`}>
        <FaArrowLeft />
        {" Back"}
      </Link>
      <h3>Create a new request for Campaign @ {address}</h3>

      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
        </Form.Field>

        <Message error header="Oops!" content={errorMessage} />
        <Button secondary loading={loading}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default NewRequest;
