import { useAccount } from 'wagmi'
import { writeContract, readContract } from '@wagmi/core'
import type { ListedItem, ProductItem } from '@/types';
import constants from '@/utils/constants';
import wagmi from "@/utils/wagmi";
import CAFMarketplaceAbi from '@/abis/CAFMarketplace.json'
import { useCompanyActions, useProductActions } from './useCAFItems';
import { zeroAddress } from 'viem';

const contracts = constants.contracts;
const config = wagmi.wagmiConfig;

export interface ICAFMarketplace {
    buy(itemId: number): Promise<void>;
    list(itemId: number, price: number): Promise<void>;
    unlist(itemId: number): Promise<void>;
    updatePrice(itemId: number, price: number): Promise<void>;
    autoList(): Promise<void>;
}

export const useCAFMarketplace = (): ICAFMarketplaceActions => {
    const account = useAccount();
    const { get: getProduct } = useProductActions();

    return {
        buy: async (itemId: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'buy',
                    args: [itemId],
                    account: account.address
                });
            } catch (error) {
                console.error('Error buying item', error);
            }
        },

        list: async (itemId: number, price: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'list',
                    args: [itemId, price],
                    account: account.address
                });
            } catch (error) {
                console.error('Error listing item', error);
            }
        },

        unlist: async (itemId: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'unlist',
                    args: [itemId],
                    account: account.address
                });
            } catch (error) {
                console.error('Error unlisting item', error);
            }
        },

        updatePrice: async (itemId: number, price: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'updatePrice',
                    args: [itemId, price],
                    account: account.address
                });
            } catch (error) {
                console.error('Error updating price', error);
            }
        },

        sell: async (itemId: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'sell',
                    args: [itemId],
                    account: account.address
                });
            } catch (error) {
                console.error('Error selling item', error);
            }
        },

        calculateResalePrice: async (itemId: number): Promise<number> => {
            try {
                const price = await readContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'calculateResalePrice',
                    args: [itemId]
                });

                return Number(price);
            } catch (error) {
                console.error('Error calculating resale price', error);
                throw error;
            }
        },

        getListedItem: async (itemId: number): Promise<ListedItem> => {
            try {
                const item = await readContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'listedItems',
                    args: [itemId]
                });

                return item as ListedItem;
            } catch (error) {
                console.error('Error getting listed item', error);
                throw error;
            }
        },

        autoList: async (): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'autoList',
                    account: account.address
                });
            } catch (error) {
                console.error('Error auto listing items', error);
            }
        }
    }
}
