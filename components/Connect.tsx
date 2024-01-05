"use client"

import { useWallet, useAllWallets } from 'useink';

export default function Connect() {
    const { connect } = useWallet();
    const wallets = useAllWallets();
    return (
        <div className="flex items-center justify-center list-none p-4">
            {wallets.map((w) => (
                <div key={w.title} className="m-0 mx-2">
              
                        {(
                            // w.installed ? (
                                <button
                                    className="h-32 flex flex-col items-center"
                                    onClick={() => connect(w.extensionName)}
                                >
                                    {/* <Image
                                        width={20}
                                        height={20}
                                        src={w.logo.src}
                                        alt={w.logo.alt}
                                        className="h-8 w-8 mb-2"
                                    /> */}
                                    Connect to {w.title}
                                </button>
                            // ) : (
                            //     <Link
                            //         href={w.installUrl}
                            //         className="h-32 flex flex-col items-center no-underline text-black"
                            //     >
                            //         <Image
                            //             height={20}
                            //             width={20}
                            //             src={w.logo.src}
                            //             alt={w.logo.alt}
                            //             className="h-8 w-8 mb-2"
                            //         />
                            //         Install {w.title}
                            //     </Link>
                            // )
                        )}
           
                </div>
            ))}
        </div>
    )
}
