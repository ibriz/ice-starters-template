# Running the frontend
- Enter the deployed token contract addresses in `.env` file.
- Tested with node version *v16.14.0*  
```$ npm install```  
```$ npm start```  

# Contract Deployment (Optional)
- Create a `.secret` file in the root directory and enter your wallet private key. This wallet will be used for deployment and contract interactions with truffle.
- Currently, only deployment in localhost:8545 and arctic testnet are supported. That can be modified from `truffle.config.js` file.
- Compiling contracts inside `contracts` dir:  
```$ truffle compile```
- Deploying contracts to local blockchain:  
```$ truffle deploy```

## Debug Info
- If you ever get the error message `Transaction is temporarily banned` while deploying contract, it means  that a transaction with the same hash was either:

  1. Part of recently mined block
  2. Detected as invalid during block production and removed from the pool  <br/>
  <br/>
- A transaction is only temporarily banned because it will be removed from the blacklist when either:

  1. 30 minutes pass
  2. There are more than 4,000 transactions on the blacklist