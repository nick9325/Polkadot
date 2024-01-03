
"use client"
import Bank from '@/components/Bank';
import Wallet from '@/components/Wallet';
import { useRouter } from 'next/navigation';
import { useWallet } from 'useink';
import Link from 'next/link';

export default function BankPage() {

  const { account } = useWallet();
  const router = useRouter()

  if (!account) {
    return (
          <div className='flex items-center justify-center p-10'>
                <button onClick={() => router.push('/')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none transition duration-300 transform hover:scale-105">Connect to wallet first</button>
          </div>
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

