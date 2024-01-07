
"use client"

import { useWallet } from 'useink';
import Wallet from '@/components/Wallet';
import Link from 'next/link';
import Connect from '@/components/Connect';


export default function Home() {

  const { account } = useWallet();

  if (!account) {
    return <Connect/>
  }

  return (
    <div className='flex items-center justify-center flex-col gap-3 p-4'>
      <Wallet />
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

