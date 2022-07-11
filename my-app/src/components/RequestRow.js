import { Table, Button } from "semantic-ui-react";
import CampaignClass from "../campaign";

const RequestRow = ({
  id,
  address,
  description,
  value,
  recipient,
  complete,
  approvalCount,
  approversCount,
}) => {
  const campaign = CampaignClass(address);

  const onApprove = async () => {
    await campaign.approveRequest(id);
  };

  const onFinalize = async () => {
    await campaign.finalizeRequest(id);
  };

  const { Row, Cell } = Table;
  const readyToFinalize = parseInt(approvalCount) > approversCount / 2;

  return (
    <Row disabled={complete} positive={readyToFinalize && !complete}>
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{value} eth</Cell>
      <Cell>{recipient}</Cell>
      <Cell>
        {approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {complete ? null : (
          <Button color="green" basic onClick={onApprove}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {complete ? null : (
          <Button color="teal" basic onClick={onFinalize}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};
export default RequestRow;
