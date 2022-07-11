import React from "react";
import { Icon, Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Link className="item" to="/">
          <Menu.Item name="CrowdCoin">
            <Icon name="dollar sign" /> CrowdCoin
          </Menu.Item>
        </Link>

        <Menu.Menu position="right">
          <Link className="item" to="/">
            <Menu.Item name="Campaign" />
          </Link>
          <Link className="item" to="/campaigns/new">
            +
          </Link>
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};

export default Navigation;
