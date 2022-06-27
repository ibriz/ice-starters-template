import { ethers } from 'ethers';

export const transferToken = async (tokenContract, tokenAmount, recipient) => {
    const res1 = await tokenContract.transfer(recipient, ethers.utils.parseEther(tokenAmount));
    await res1.wait();

    return res1.hash;
}

export const transferIcz = async (provider, iczAmount, recipient) => {

    const signer = provider.getSigner();

    const res1 = await signer.sendTransaction({
        from: signer.getAddress(),
        to: recipient,
        value: ethers.utils.parseEther(iczAmount),
    });

    await res1.wait();

    return res1.hash;
}