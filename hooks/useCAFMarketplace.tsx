import { useAccount } from 'wagmi'
import { writeContract, readContract, waitForTransactionReceipt } from '@wagmi/core'
import type { ListedItem, ProductItem } from '@/types';
import constants from '@/utils/constants';
import wagmi from "@/utils/wagmi";

import CAFMarketplaceAbi from '@/abis/CAFMarketplace'

const contracts = constants.contracts;
const config = wagmi.wagmiConfig;
export interface ICAFMarketplaceActions {
    buy(itemId: number): Promise<void>;
    list(itemId: number, price: number): Promise<void>;
    unlist(itemId: number): Promise<void>;
    updatePrice(itemId: number, price: number): Promise<void>;
    autoList(): Promise<void>;
    resell(itemId: number): Promise<void>;
    calculateResalePrice(itemId: number): Promise<number>;
    getListedItem(itemId: number): Promise<ListedItem>;
    getAllListedItemIds(): Promise<number[]>;
}

export const useCAFMarketplace = (): ICAFMarketplaceActions => {
    const account = useAccount();

    return {
        buy: async (itemId: number): Promise<void> => {
            try {
                const tx = await writeContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'buy',
                    args: [BigInt(itemId)],
                    account: account.address
                });

                const receipt = await waitForTransactionReceipt(config, {
                    hash: tx
                });

                if (receipt.status === 'reverted') {
                    throw new Error('Transaction failed');
                }
            } catch (error) {
                console.log('Error buying item', error);
                throw new Error('Error buying item');
            }
        },

        list: async (itemId: number, price: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'list',
                    args: [BigInt(itemId), BigInt(price)],
                    account: account.address
                });
            } catch (error) {
                console.log('Error listing item', error);
                throw new Error('Error listing item');
            }
        },

        unlist: async (itemId: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'unlist',
                    args: [BigInt(itemId)],
                    account: account.address
                });
            } catch (error) {
                console.log('Error unlisting item', error);
                throw new Error('Error unlisting item');
            }
        },

        updatePrice: async (itemId: number, price: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'updatePrice',
                    args: [BigInt(itemId), BigInt(price)],
                    account: account.address
                });
            } catch (error) {
                console.log('Error updating price', error);
                throw new Error('Error updating price');
            }
        },

        resell: async (itemId: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'resell',
                    args: [BigInt(itemId)],
                    account: account.address
                });
            } catch (error) {
                console.log('Error reselling item', error);
                throw new Error('Error reselling item');
            }
        },

        calculateResalePrice: async (itemId: number): Promise<number> => {
            try {
                const price = await readContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'calculateResalePrice',
                    args: [BigInt(itemId)]
                });

                return Number(price);
            } catch (error) {
                console.log('Error calculating resale price', error);
                throw error;
            }
        },

        getListedItem: async (itemId: number): Promise<ListedItem> => {
            try {
                const item = await readContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'getListedItem',
                    args: [BigInt(itemId)]
                });

                return {
                    id: Number(item.id),
                    owner: item.owner,
                    price: Number(item.price)
                } as ListedItem;
            } catch (error) {
                console.log('Error getting listed item', error);
                throw error;
            }
        },

        getAllListedItemIds: async (): Promise<number[]> => {
            try {
                const items = await readContract(config, {
                    abi: CAFMarketplaceAbi,
                    address: contracts.CAF_MARKETPLACE_ADDRESS,
                    functionName: 'getAllListedItemIds'
                });

                return items.map(item => Number(item));
            } catch (error) {
                console.log('Error getting all listed items', error);
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
                console.log('Error auto listing items', error);
                throw new Error('Error auto listing items');
            }
        }
    }
}
