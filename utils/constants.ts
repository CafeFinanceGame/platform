import { Address } from "viem"
export default {
    contracts: {
        CAF_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_CAF_TOKEN_ADDRESS as Address,
        CAF_GAME_MANAGER_ADDRESS: process.env.NEXT_PUBLIC_CAF_GAME_MANAGER_ADDRESS as Address,
        CAF_MARKETPLACE_ADDRESS: process.env.NEXT_PUBLIC_CAF_MARKETPLACE_ADDRESS as Address,
        CAF_GAME_ECONOMY_ADDRESS: process.env.NEXT_PUBLIC_CAF_GAME_ECONOMY_ADDRESS as Address,
        CAF_ITEMS_MANAGER_ADDRESS: process.env.NEXT_PUBLIC_CAF_ITEMS_MANAGER_ADDRESS as Address,
        CAF_TOKEN_CONTRACT: process.env.NEXT_PUBLIC_CAF_TOKEN_CONTRACT as Address
    },
    walletconnet: {
        PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    },
}