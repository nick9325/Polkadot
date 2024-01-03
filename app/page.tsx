
"use client"

import { useWallet, useAllWallets } from 'useink';
import Wallet from '@/components/Wallet';
import Link from 'next/link';

export default function Home() {

  const { account, connect } = useWallet();
  const wallets = useAllWallets();

  if (!account) {
    return (
      <ul className="flex items-center justify-center list-none p-4">
        {wallets.map((w) => (
          <li key={w.title} className="m-0 mx-2">
            {w.installed ? (
              <button
                className="h-32 flex flex-col items-center"
                onClick={() => connect(w.extensionName)}
              >
                <img
                  src={w.logo.src}
                  alt={w.logo.alt}
                  className="h-8 w-8 mb-2"
                />
                Connect to {w.title}
              </button>
            ) : (
              <a
                href={w.installUrl}
                className="h-32 flex flex-col items-center no-underline text-black"
              >
                <img
                  src={w.logo.src}
                  alt={w.logo.alt}
                  className="h-8 w-8 mb-2"
                />
                Install {w.title}
              </a>
            )}
          </li>
        ))}
      </ul>
    )
  }


  return (
    <div className='flex items-center justify-center flex-col gap-3 p-4'>
      <Wallet/>
      <div className='p-10'>
        <nav className="bg-gradient-to-r from-blue-800 to-gray-800 p-20 rounded-lg">
          <div className="container mx-auto flex justify-between items-center">
            <div className="space-x-4">
              <Link href={'/todo'} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none transition duration-300 transform hover:scale-105">Visit Todo Dapp</Link>
              <Link href={'/bank'} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none transition duration-300 transform hover:scale-105">Visit Bank Dapp</Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

