const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address);

    // Deploy BlueCarbonRegistry
    const Registry = await hre.ethers.getContractFactory("BlueCarbonRegistry");
    const registry = await Registry.deploy();
    console.log("BlueCarbonRegistry deployed to:", registry.target);

    // Deploy CarbonCreditToken
    const Token = await hre.ethers.getContractFactory("CarbonCreditToken");
    const token = await Token.deploy();
    console.log("CarbonCreditToken deployed to:", token.target);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
