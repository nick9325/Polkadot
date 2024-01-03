"use client"

import { useWallet } from "useink"
import Link from "next/link"

export default function page() {

    const { account } = useWallet()

    return (
        <div className="flex items-center justify-center flex-col">

            <div className="container mx-auto mt-8 p-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded-md shadow-lg border-2 border-blue-500 max-w-fit">

                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Account Details</h1>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Name</h2>
                    <p className="text-base text-gray-700">{account?.name}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Address</h2>
                    <p className="text-base text-gray-700">{account?.address}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Source</h2>
                    <p className="text-base text-gray-700">{account?.source}</p>
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Genesis Hash</h2>
                    <p className="text-base text-gray-700">{account?.genesisHash}</p>
                </div>

                <Link href={'/'}
                    className="font-bold text-blue-500 hover: text-blue-700 hover:underline underline-offset-4"
                >
                    Go Back Home
                </Link>


            </div>

        </div>
    )
}
