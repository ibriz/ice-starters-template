import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import Balance from './components/Balance';
import Transfer from './components/Transfer';

import { getProvider } from 'ethereum/ethers';
import { TOKEN } from 'ethereum/contracts/token';
import { fetchBalance } from 'utils';
import { transferIcz, transferToken } from './ethereum/helpers';
import { SUPPORTED_TOKENS } from 'constants';



function App() {

  const [provider, setProvider] = useState('');
  const [tokenContract, setTokenContract] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [ICZbalance, setICZbalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    async function x() {
      try {
        const provider = await getProvider();
        setProvider(provider);

        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        setWalletAddress(userAddress);

        const tokenContract = new ethers.Contract(TOKEN.address, TOKEN.abi, signer);
        console.log(tokenContract);
        setTokenContract(tokenContract);

      } catch (err) {
        console.error(err);
        alert(JSON.stringify(err));
      }
    }
    x();
  }, []);

  useEffect(() => {
    async function x() {
      if(!provider || !walletAddress || !tokenContract){
        return;
      }
      setICZbalance(await fetchBalance(provider, walletAddress));
      setTokenBalance(await fetchBalance(provider, walletAddress, tokenContract));
    }
    x();

  }, [updateData]);

  useEffect(() => {
    async function x() {
      if(provider && walletAddress) {
        setICZbalance(await fetchBalance(provider, walletAddress));
        setTokenBalance(await fetchBalance(provider, walletAddress, tokenContract));
      }
    }
    x();
  }, [provider, tokenContract, walletAddress]);

  const handleTransfer = async (values) => {
    console.log(values);
    
    if(values.token === SUPPORTED_TOKENS.MYTOKEN[0]) {
      await transferToken(tokenContract, values.amount, values.to);
    } else {
      await transferIcz(provider, values.amount, values.to);
    }

    setUpdateData((updateData) => !updateData);
  }
  
  return(
    <>
      <h1 className='card-header'>Wallet Details</h1>
      <div className='grid-container'>
        <div className='grid-item'>
          <Balance iczBalance={ICZbalance} tokenBalance={tokenBalance} />
        </div>
        <div className='grid-item'>
          <Transfer iczBalance={ICZbalance} tokenBalance={tokenBalance} handleSubmit={handleTransfer} />
        </div>
      </div>
    </>
  );
}

export default App;
