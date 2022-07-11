import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";

import CampaignNew from "./routes/New";
import Home from "./routes/Home";
import Navigation from "./routes/Navigation";
import SingleCampaign from "./routes/SingleCampaign";
import Footer from "./components/footer/footer";
import Requests from "./routes/Requests";
import NewRequest from "./routes/NewRequest";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object");
      }

      /*
       * Check if we're authorized to access the user's wallet
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account");
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div>
      <Router>
        <Navigation />

        <Container>
          {/*
           * If there is no currentAccount, render this button
           */}
          {!currentAccount && (
            <Button
              onClick={connectWallet}
              content="Connect Wallet"
              icon="ban"
              color="red"
              style={{ marginBottom: 10 }}
            />
          )}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/campaigns/new" element={<CampaignNew />} />
            <Route path="/campaigns/:address" element={<SingleCampaign />} />
            <Route path="/campaigns/:address/requests" element={<Requests />} />
            <Route
              path="/campaigns/:address/requests/new"
              element={<NewRequest />}
            />
          </Routes>
        </Container>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
