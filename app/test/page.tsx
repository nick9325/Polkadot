
"use client"

import { useWallet } from "useink"

export default function page() {
    const {account} = useWallet();
  return (
    <div>
        <h1>Hello: {account?account.name:"No account found"}</h1>

    </div>
  )
}
