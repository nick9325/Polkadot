
"use client"
import Bank from '@/components/Bank';
import Wallet from '@/components/Wallet';
import { useWallet } from 'useink';
import Link from 'next/link';
import Connect from '@/components/Connect';

export default function BankPage() {

  const { account } = useWallet();

  if (!account) {
    return (
       <Connect/>
    )
  }

  return (
    <div className='flex items-center justify-center flex-col gap-3 p-4'>
     <Wallet/>

      <div>
        <Bank />
      </div>

      <Link href={'/todo'} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none transition duration-300 transform hover:scale-105">Visit Todo Dapp</Link>

    </div>
  )
}

