"use client"

import { useWallet } from 'useink';
import Link from 'next/link';


export default function Wallet() {
    
    const { account, disconnect } = useWallet();
    console.log(useWallet)
    return (
        <div className="bg-gray-100 p-4 rounded-md shadow-md flex items-center justify-center flex-col">
            <div className="text-lg">
                You are logged in as <Link href="/profile" className="font-bold text-blue-500 hover: text-blue-700 hover:underline underline-offset-4">{account?.name}</Link>
            </div>

            <button
                onClick={disconnect}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
            >
                Disconnect from wallet
            </button>
        </div>
    )
}
