const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const campaignFactory = await hre.ethers.getContractFactory(
    "CampaignFactory"
  );
  const campaignFactoryInstance = await campaignFactory.deploy();
  await campaignFactoryInstance.deployed();

  console.log("Contract deployed to:", campaignFactoryInstance.address);
  console.log("Contract deployed by:", owner.address);

  /*
   * Get Contract balance
   */
  //   let contractBalance = await hre.ethers.provider.getBalance(
  //     waveContract.address
  //   );
  //   console.log(
  //     "Contract balance:",
  //     hre.ethers.utils.formatEther(contractBalance)
  //   );

  let campaignInstance;
  campaignInstance = await campaignFactoryInstance.createCampaign(
    hre.ethers.utils.parseEther("0.001")
  );
  await campaignInstance.wait(); // Wait for the transaction to be mined

  let campaigns;
  campaigns = await campaignFactoryInstance.getDeployedCampaigns();
  console.log("Addresses of the campaigns are ", campaigns);

  /*
   * Get Contract balance to see what happened!
  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    "Contract balance:",
    hre.ethers.utils.formatEther(contractBalance)
  );
   */

  //   waveCount = await waveContract.getTotalWaves();
  //   console.log(waveCount.toNumber());

  //   let allWaves = await waveContract.getAllWaves();
  //   console.log(allWaves);
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
