"use client"

import { useWallet, useAllWallets } from 'useink';
import Image from 'next/image';

export default function Connect() {
    const { connect } = useWallet();
    const wallets = useAllWallets();
    return (
        <div className="flex items-center justify-center list-none p-4">
            {wallets.map((w) => (
                <div key={w.title} className="m-0 mx-2">

                    {(
                        <button
                            className="h-32 flex flex-col items-center"
                            onClick={() => connect(w.extensionName)}
                        >
                            <Image
                                width={20}
                                height={20}
                                src={w.logo.src}
                                alt={w.logo.alt}
                                className="h-8 w-8 mb-2"
                            />
                            Connect to {w.title}
                        </button>

                    )}

                </div>
            ))}
        </div>
    )
}
