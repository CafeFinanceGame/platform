'use client'

import { useAccount } from 'wagmi'
import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import { CAFButton } from './button'

const compactHash = (hash: string) => {
    return hash.slice(0, 7) + '...' + hash.slice(-5)
}

export const ConnectButton = () => {
    const wagmiAccount = useAccount()
    const account = useAppKitAccount()
    const { open } = useAppKit()

    const compactAddress = compactHash(account.address || '')
    const compactAddressWagmi = compactHash(wagmiAccount.address || '')

    return (
        <div className="column">
            <span className="text-black">useAppKitAccount: {compactAddress}</span>
            <span className="text-black">useAccount (wagmi): {compactAddressWagmi}</span>
            <CAFButton
                isLoading={wagmiAccount.isConnecting}
                onPress={() => open()}
                className="mt-4"
            >
                Connect
            </CAFButton>
        </div>
    )
}