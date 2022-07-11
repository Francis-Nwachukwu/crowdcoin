import { Loader, Dimmer, Segment } from "semantic-ui-react";

import "./Loading.css";

const Loading = ({ loadingText }) => {
  return (
    <Segment className="loader-container">
      <Dimmer active inverted>
        <Loader size="huge" indeterminate>
          {loadingText}
        </Loader>
      </Dimmer>
    </Segment>
  );
};
export default Loading;
