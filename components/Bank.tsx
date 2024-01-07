import React, { useState } from 'react';
import { useCallSubscription, useContract, useTx } from 'useink';
import { useTxNotifications } from 'useink/notifications';
import { BANK_CONTRACT_ADDRESS } from '../constants'; // Make sure to replace this with your actual contract address
import metadata from '../assets/bank.json'; // Replace with your bank contract metadata
import { pickDecoded } from 'useink/utils';
import { useWallet } from 'useink';
import { useEvents, useEventSubscription } from 'useink';

function Bank() {
    const contract = useContract(BANK_CONTRACT_ADDRESS, metadata);
    const { account } = useWallet();

    const getBalanceSub = useCallSubscription(contract, 'getBalance', [account?.address], {
        defaultCaller: true,
    });
    const [transferTo, setTransferTo] = useState('');
    const [transferAmount, setTransferAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [addBalanceAmount, setAddBalanceAmount] = useState(0);

    const transferToAccount = useTx(contract, 'transferToAccount');
    useTxNotifications(transferToAccount);

    const withdraw = useTx(contract, 'withdraw');
    useTxNotifications(withdraw);

    const addBalance = useTx(contract, 'addBalance');
    useTxNotifications(addBalance);

    const handleTransfer = () => {
        transferToAccount.signAndSend([transferTo, transferAmount]);
        setTransferTo('');
        setTransferAmount(0);
    };

    const handleWithdraw = () => {
        withdraw.signAndSend([withdrawAmount]);
        setWithdrawAmount(0);
    };

    const handleAddBalance = () => {
        addBalance.signAndSend([addBalanceAmount]);
        setAddBalanceAmount(0);
    };

    useEventSubscription(contract); 

    const { events: transferEvents } = useEvents(BANK_CONTRACT_ADDRESS, ['Transfer']);

    return (
        <div className="p-6 border rounded-lg shadow-md">

            <h1 className="text-2xl font-bold mb-4">Smart contract name: <span className="text-blue-500">{metadata.contract.name}</span></h1>

            <p className="mb-4 flex flex-row">
                <span className="text-gray-600">Your Balance:</span>
                {pickDecoded(getBalanceSub.result)?<p className="text-green-600 ml-2 font-bold">{pickDecoded(getBalanceSub.result)?.toString()}</p>:<p className='text-gray-500 ml-2'>Fetching..</p>}
            </p>


            <div className="mb-4">
                <input
                    type="text"
                    value={transferTo}
                    onChange={(e) => setTransferTo(e.target.value)}
                    placeholder="Recipient's address"
                    className="border rounded-md p-2"
                />
                <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.valueAsNumber)}
                    placeholder="Transfer amount"
                    className="border rounded-md p-2 ml-2"
                />
                <button
                    onClick={handleTransfer}
                    className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
                >
                    Transfer
                </button>
            </div>

            <div className="mb-4">
                <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.valueAsNumber)}
                    placeholder="Withdraw amount"
                    className="border rounded-md p-2"
                />
                <button
                    onClick={handleWithdraw}
                    className="bg-red-500 text-white px-4 py-2 ml-2 rounded-md"
                >
                    Withdraw
                </button>
            </div>

            <div className='mb-4'>
                <input
                    type="number"
                    value={addBalanceAmount}
                    onChange={(e) => setAddBalanceAmount(e.target.valueAsNumber)}
                    placeholder="Amount to add"
                    className="border rounded-md p-2"
                />
                <button
                    onClick={handleAddBalance}
                    className="bg-green-500 text-white px-4 py-2 ml-2 rounded-md"
                >
                    Add Balance
                </button>
            </div>

            <div className='bg-gray-100 p-4 rounded-md shadow-md'>
                <h3 className='text-xl font-semibold mb-2 text-blue-600'>Transfer Events</h3>
                <ul className='list-disc pl-4'>
                    {transferEvents.map((event) => (
                        <li key={event.id} className='mb-2'>
                            <p className='text-gray-700'>Event Name: {event.name}</p>
                            <p className='text-gray-700'>
                                Transfer Occurred: From {JSON.stringify(event.args[0])} to{' '}
                                {JSON.stringify(event.args[1])}, Amount: {JSON.stringify(event.args[2])}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='mt-4'>
                <i className='text-sm border'>Note: All balances are in pROC, 
                1 ProCurrency(pROC) = 0.000160 Polkadot (DOT)</i>
            </div>

        </div>
    );
}

export default Bank;
