
"use client"

import Todo from '@/components/Todo'

import { useWallet, useAllWallets } from 'useink';






export default function Home() {

  const { account, connect, disconnect } = useWallet();
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



    </div>
  )
}

