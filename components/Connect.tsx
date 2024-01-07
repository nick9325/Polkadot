"use client"

import { useWallet, useAllWallets } from 'useink';
import Image from 'next/image';
import Link from 'next/link';


export default function Connect() {

    const { connect } = useWallet();
    const wallets = useAllWallets();

    return (
        <div className='text-center p-4'>
                <div className="flex items-center justify-center list-none p-4">
                    {wallets.map((w) => (
                        <div key={w.title} className="m-0 mx-2">
                            {w.installed ? (
                                <button
                                    className="h-32 flex flex-col items-center border border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition duration-300 ease-in-out"
                                    onClick={() => connect(w.extensionName)}
                                >
                                    <Image
                                        width={20}
                                        height={20}
                                        src={w.logo.src}
                                        alt={w.logo.alt}
                                        className="h-8 w-8 mb-2"
                                    />
                                    <span className="text-sm">Connect to {w.title}</span>
                                </button>
                            ) : (
                                <Link
                                    href={w.installUrl}
                                    className="h-32 flex flex-col items-center border border-gray-300 rounded-lg p-4 hover:bg-gray-100 transition duration-300 ease-in-out"
                                >
                                    <Image
                                        width={20}
                                        height={20}
                                        src={w.logo.src}
                                        alt={w.logo.alt}
                                        className="h-8 w-8 mb-2"
                                    />
                                    <span className="text-sm">Install {w.title}</span>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
        </div>
    )
}
