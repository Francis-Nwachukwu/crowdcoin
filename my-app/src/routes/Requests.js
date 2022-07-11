import { useParams, Link } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import CampaignClass from "../campaign";
import "../App.css";
import { useEffect, useState } from "react";
import { formatUnits } from "ethers/lib/utils";
import RequestRow from "../components/RequestRow";
import { FaArrowLeft } from "react-icons/fa";
import Loading from "../components/Loading/Loading";

const Requests = () => {
  const { address } = useParams();
  const campaign = CampaignClass(address);

  const [requestCount, setRequestCount] = useState("");
  const [approversCount, setApproversCount] = useState("");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function getInfo() {
      const requestCount = formatUnits(
        await campaign.getRequestsCount(),
        "wei"
      );
      const approversCount = formatUnits(
        await campaign.approversCount(),
        "wei"
      );

      setRequestCount(parseInt(requestCount));
      setApproversCount(parseInt(approversCount));
      setRequests(
        await Promise.all(
          Array(parseInt(requestCount))
            .fill()
            .map((element, index) => {
              return campaign.requests(index);
            })
        )
      );
    }
    getInfo();
  }, []);

  const { Header, Row, HeaderCell, Body } = Table;
  return (
    <div className="section requests">
      <h3>Requests for Campaign @ {address}</h3>
      <Link to={`/campaigns/${address}`}>
        <FaArrowLeft />
        {" Back"}
      </Link>
      <Link to={`/campaigns/${address}/requests/new`}>
        <Button secondary floated="right" style={{ marginBottom: 10 }}>
          Add Request
        </Button>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests.length === 0 ? (
            <Loading loadingText="" />
          ) : (
            requests.map((request, index) => {
              return (
                <RequestRow
                  key={index}
                  id={index}
                  description={request[0]}
                  value={formatUnits(request[1], "ether")}
                  recipient={request[2]}
                  complete={request[3]}
                  approvalCount={formatUnits(request[4], "wei")}
                  address={address}
                  approversCount={approversCount}
                />
              );
            })
          )}
        </Body>
      </Table>
      <div>
        * Found ({requests.length}) requests. Manager of the campaign creates
        the requests.
      </div>
    </div>
  );
};
export default Requests;
