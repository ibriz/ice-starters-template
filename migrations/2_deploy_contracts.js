const Token = artifacts.require("Token");

module.exports = async function(deployer) {
    return deployer.deploy(Token, "MyToken", "MT", 1000000);
};