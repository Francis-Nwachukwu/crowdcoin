import { Link } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { campaignFactoryContract } from "../factory";

import Loading from "../components/Loading/Loading";

import "../App.css";

const Home = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function getCampaigns() {
      setCampaigns(await campaignFactoryContract.getDeployedCampaigns());
    }
    getCampaigns();
  }, [campaigns]);

  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        style: { overflowWrap: "break-word" },
        description: <Link to={`/campaigns/${address}`}>View Campaign</Link>,
      };
    });
    return <Card.Group items={items} />;
  };
  return (
    <div className="section">
      <h3>Open Campaigns</h3>

      <Link to="/campaigns/new">
        <Button
          content="Create Campaign"
          icon="add circle"
          secondary
          style={{ marginBottom: 10 }}
        />
      </Link>

      {campaigns.length === 0 ? <Loading loadingText="" /> : renderCampaigns()}
      <div>
        * Found ({campaigns.length}) requests. Create a new campaign to become
        the Manager of the campaign.
      </div>
    </div>
  );
};

export default Home;
