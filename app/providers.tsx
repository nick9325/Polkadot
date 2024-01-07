'use client'

import { PropsWithChildren } from 'react'
import { InkConfig } from 'useink';
import { RococoContractsTestnet } from 'useink/chains';
import { NotificationsProvider } from 'useink/notifications';
import dynamic from 'next/dynamic';


const UseInkProvider: React.ComponentType<React.PropsWithChildren<InkConfig>> =
    dynamic(() => import('useink').then(({ UseInkProvider }) => UseInkProvider), {
        ssr: false,
    });


export default function ClientProviders({ children }: PropsWithChildren) {
    return (
        <UseInkProvider
            config={{
                dappName: 'InkDapps',
                chains: [RococoContractsTestnet],
            }}
        >
            <NotificationsProvider>
                {children}
            </NotificationsProvider>
        </UseInkProvider>
    )
}