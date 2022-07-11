import React from "react";
import { Card } from "semantic-ui-react";

import "./card.css";

const CampaignCard = ({ icon, header, meta, description }) => {
  return (
    <Card className="card">
      <div className="card-icon-container">{icon}</div>

      <Card.Content>
        <Card.Header>{header}</Card.Header>
        <Card.Meta>
          <span className="date">{meta}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default CampaignCard;
