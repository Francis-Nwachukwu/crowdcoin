const main = async () => {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address);
  console.log("Account balance: ", accountBalance.toString());

  const campaignFactory = await hre.ethers.getContractFactory(
    "CampaignFactory"
  );
  const campaignFactoryInstance = await campaignFactory.deploy();
  await campaignFactoryInstance.deployed();

  console.log("Campaign Factory address: ", campaignFactoryInstance.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
