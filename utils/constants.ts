import { Address } from "viem"
export default {
    contracts: {
        CAF_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_CAF_TOKEN_ADDRESS as Address,
        CAF_CONTRACT_REGISTRY_ADDRESS: process.env.NEXT_PUBLIC_CAF_CONTRACT_REGISTRY_ADDRESS as Address,
        CAF_GAME_MANAGER_ADDRESS: process.env.NEXT_PUBLIC_CAF_GAME_MANAGER_ADDRESS as Address,
        CAF_GAME_ECONOMY_ADDRESS: process.env.NEXT_PUBLIC_CAF_GAME_ECONOMY_ADDRESS as Address,
        CAF_PRODUCT_ITEMS_ADDRESS: process.env.NEXT_PUBLIC_CAF_PRODUCT_ITEMS_ADDRESS as Address,
        CAF_COMPANY_ITEMS_ADDRESS: process.env.NEXT_PUBLIC_CAF_COMPANY_ITEMS_ADDRESS as Address,
        CAF_EVENT_ITEMS_ADDRESS: process.env.NEXT_PUBLIC_CAF_EVENT_ITEMS_ADDRESS as Address,
        CAF_MATERIAL_FACTORY_ADDRESS: process.env.NEXT_PUBLIC_CAF_MATERIAL_FACTORY_ADDRESS as Address,
        CAF_MARKETPLACE_ADDRESS: process.env.NEXT_PUBLIC_CAF_MARKETPLACE_ADDRESS as Address,
        CAF_POOL_FACTORY_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CAF_POOL_FACTORY_CONTRACT_ADDRESS as Address
    },
    walletconnet: {
        PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
    },
}