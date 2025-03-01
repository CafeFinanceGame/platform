import { cookieStorage, createStorage } from '@wagmi/core'
import { coreDao } from 'wagmi/chains'
import { type Chain } from 'viem';
import constants from './constants';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

export const coreTestnet = {
    id: 1114,
    name: 'Core Blockchain Testnet2',
    rpcUrls: {
        default: {
            http: ['https://rpc.test2.btcs.network'],
        },
    },
    nativeCurrency: {
        name: 'Testnet Core 2',
        symbol: 'tCORE2',
        decimals: 18,
    },
    blockExplorers: {
        default: {
            name: 'Block Explorer',
            url: 'https://scan.test2.btcs.network',
        }
    },

} as const satisfies Chain

const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage,
    }),
    networks: [coreDao, coreTestnet],
    projectId: constants.walletconnet.PROJECT_ID,
    ssr: true,
})

export default wagmiAdapter;