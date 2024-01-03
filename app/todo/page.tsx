
"use client"

import Todo from '@/components/Todo'

import { useWallet } from 'useink';
import { useRouter } from 'next/navigation';




export default function TodoPage() {

  const { account, disconnect } = useWallet();
  const router = useRouter();


  if (!account) {
    return (
          <div className='flex items-center justify-center p-10'>
                <button onClick={() => router.push('/')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none transition duration-300 transform hover:scale-105">Connect to wallet first</button>
          </div>
    )
  }

  return (
    <div className='flex items-center justify-center flex-col gap-3 p-4'>

      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <div className="text-lg">
          Wallet name: <strong className="text-blue-500">{account.name}</strong>
        </div>
        <button
          onClick={disconnect}
          className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Disconnect from wallet
        </button>
      </div>

      <div>
        <Todo />
      </div>

      <button onClick={() => router.push('/bank')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none transition duration-300 transform hover:scale-105">Visit Bank Dapp</button>

    </div>
  )
}

