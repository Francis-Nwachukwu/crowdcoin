import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Grid, Button } from "semantic-ui-react";
import { FaArrowLeft } from "react-icons/fa";
import ContributeForm from "../components/ContributeForm";
import CampaignCard from "../components/Card/Card";
import {
  FaMale,
  FaCoins,
  FaFileInvoiceDollar,
  FaCheck,
  FaEthereum,
} from "react-icons/fa";

import CampaignClass from "../campaign";
import { formatUnits } from "ethers/lib/utils";

import "../App.css";

const SingleCampaign = () => {
  const [summary, setSummary] = useState([]);
  const { address } = useParams();
  const campaign = CampaignClass(address);

  useEffect(() => {
    async function getSummary() {
      try {
        const data = await campaign.getSummary();
        const dataObj = {
          address: address,
          minimumContribution: formatUnits(data[0], "wei"),
          balance: formatUnits(data[1], "ether"),
          requestsCount: formatUnits(data[2], "wei"),
          approversCount: formatUnits(data[3], "wei"),
          manager: data[4],
        };
        const {
          minimumContribution,
          balance,
          requestsCount,
          approversCount,
          manager,
        } = dataObj;
        setSummary([
          minimumContribution,
          balance,
          requestsCount,
          approversCount,
          manager,
        ]);
      } catch (error) {
        console.log(error);
      }
    }
    getSummary();
  }, []);

  const items = [
    {
      id: 1,
      icon: <FaMale className="card-icon" />,
      header: summary[4],
      meta: "Address of Manager",
      description:
        "The Manager created this campaign and can create project requests to withdraw money",
    },
    {
      id: 2,
      icon: <FaCoins className="card-icon" />,
      header: summary[0],
      meta: "minimumContribution (wei)",
      description: "You must contribute at least this much wei to enter",
    },
    {
      id: 3,
      icon: <FaFileInvoiceDollar className="card-icon" />,
      header: summary[2],
      meta: "Number of requests",
      description:
        "A request tries to withdraw money from the contract. Requests must be approved by approvers",
    },
    {
      id: 4,
      icon: <FaCheck className="card-icon" />,
      header: summary[3],
      meta: "Number of Approvers",
      description:
        "Number of people who have already contributed/donated to this campaign",
    },
    {
      id: 5,
      icon: <FaEthereum className="card-icon" />,
      header: summary[1],
      meta: "Campaign Balance (ether)",
      description: "The balance is how much money this campaign has",
    },
  ];

  return (
    <div className="section">
      <Link to={`/`}>
        <FaArrowLeft />
        {" Back"}
      </Link>
      <h4>Campaign @{address}</h4>

      <Grid>
        <Grid.Row>
          <Grid.Column width={5}>
            <Link to={`/campaigns/${address}/requests`}>
              <Button secondary>View Requests</Button>
            </Link>
          </Grid.Column>
          <Grid.Column width={11}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        {items.map((item) => {
          const { id, icon, header, meta, description } = item;
          return (
            <CampaignCard
              key={id}
              icon={icon}
              header={header}
              meta={meta}
              description={description}
            />
          );
        })}
      </Grid>
    </div>
  );
};
export default SingleCampaign;
