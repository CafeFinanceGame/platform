import { useAccount } from 'wagmi'
import type { Address } from 'viem';
import { waitForTransactionReceipt, writeContract, readContract } from '@wagmi/core'
import type { Company, EventItem, CompanyType, ProductItem, ProductItemType } from '@/types';
import constants from '@/utils/constants';
import wagmi from "@/utils/wagmi";

const contracts = constants.contracts;
const config = wagmi.wagmiConfig;

import CAFItemsManagerAbi from '@/abis/CAFItemsManager'

export interface ICAFCompanyItemsActions {
    createCompanyItem(owner: string, role: CompanyType): Promise<void>;
    getCompanyItem(companyId: number): Promise<Company>;
    getAllCompanyItemIds(): Promise<number[]>;
    replenishEnergy(companyId: number, itemId: number): Promise<void>;
    useEnergy(companyId: number, amount: number): Promise<void>;
    hasCompany(owner: Address): Promise<boolean>;
}

export interface ICAFProductItemsActions {
    createProductItem(companyId: number, productType: ProductItemType): void;
    getProductItem(itemId: number): Promise<ProductItem>;
    getAllProductItemIds(): Promise<number[]>;
    manufacture(productType: ProductItemType, componentIds: number[]): Promise<number>;
    decay(itemId: number): Promise<number>;
}

export interface ICAFEventItemsActions {
    createEventItem(eventType: number, startDate: number, endDate: number): void;
    getEventItem(eventId: number): Promise<EventItem>;
    getAllEventItemIds(): Promise<number[]>;
    getAllActiveEventItemIds(): Promise<number[]>;
    startEvent(eventId: number): void;
    endEvent(eventId: number): void;
}

export interface ICAFItemsManagerActions extends ICAFCompanyItemsActions, ICAFProductItemsActions, ICAFEventItemsActions {
    getNextItemId(): Promise<number>;
    popNotListedItem(): Promise<number>;
}

export const useCAFItemsManagerActions = (): ICAFItemsManagerActions => {
    const account = useAccount();

    return {
        createCompanyItem: async (owner: string, role: CompanyType): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'createCompanyItem',
                    args: [owner as Address, role],
                    account: account.address
                });
            } catch (error) {
                console.error('Error creating company', error);
                throw error;
            }
        },

        getCompanyItem: async (companyId: number): Promise<Company> => {
            try {
                const company = await readContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'getCompanyItem',
                    args: [BigInt(companyId)],
                });

                return company as Company;
            } catch (error) {
                console.error('Error getting company', error);
                throw error;
            }
        },

        getAllCompanyItemIds: async (): Promise<number[]> => {
            try {
                const companyIds = await readContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'getAllCompanyItemIds',
                    args: []
                });

                return companyIds.map(id => Number(id));
            } catch (error) {
                console.error('Error getting all company ids', error);
                throw error;
            }
        },

        hasCompany: async (owner: Address): Promise<boolean> => {
            if (!account.address) return false;

            try {
                const hasCompany = await readContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'hasCompanyItem',
                    args: [account.address]
                }) as boolean;

                return hasCompany;
            } catch (error) {
                console.error('Error checking company ownership', error);
                throw error;
            }
        },

        replenishEnergy: async (companyId: number, itemId: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'replenishEnergy',
                    args: [BigInt(companyId), BigInt(itemId)],
                    account: account.address
                });
            } catch (error) {
                console.error('Error replenishing energy', error);
                throw error;
            }
        },

        useEnergy: async (companyId: number, amount: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'useEnergy',
                    args: [BigInt(companyId), amount],
                    account: account.address
                });
            } catch (error) {
                console.error('Error using energy', error);
                throw error;
            }
        },

        createProductItem:
            async (companyId: number, productType: ProductItemType): Promise<void> => {
                try {
                    await writeContract(config, {
                        abi: CAFItemsManagerAbi,
                        address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                        functionName: 'createProductItem',
                        args: [BigInt(companyId), productType],
                        account: account.address
                    });
                } catch (error) {
                    console.error('Error creating product item', error);
                    throw error;
                }
            },

        getProductItem: async (itemId: number): Promise<ProductItem> => {
            try {
                const productItem = await readContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'getProductItem',
                    args: [BigInt(itemId)]
                });

                return {
                    ...productItem,
                    price: Number(productItem.price),
                    decayRatePerHour: Number(productItem.decayRatePerHour),
                    msgTime: Number(productItem.msgTime),
                    expTime: Number(productItem.expTime),
                    lastDecayedTime: Number(productItem.lastDecayedTime)
                } as ProductItem;
            } catch (error) {
                console.error('Error getting product item', error);
                throw error;
            }
        },

        getAllProductItemIds: async (): Promise<number[]> => {
            try {
                const productItemIds = await readContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'getAllProductItemIds',
                    args: []
                });

                return productItemIds.map(id => Number(id));
            } catch (error) {
                console.error('Error getting all product item ids', error);
                throw error;
            }
        },

        manufacture: async (productType: ProductItemType, componentIds: number[]): Promise<number> => {
            try {
                const itemId = await writeContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'manufacture',
                    args: [productType, componentIds.map(id => BigInt(id))],
                    account: account.address
                });

                return Number(itemId);
            } catch (error) {
                console.error('Error manufacturing product', error);
                throw error;
            }
        },

        decay: async (itemId: number): Promise<number> => {
            try {
                const decayedItemId = await writeContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'decay',
                    args: [BigInt(itemId)],
                    account: account.address
                });

                return Number(decayedItemId);
            } catch (error) {
                console.error('Error decaying product', error);
                throw error;
            }
        },

        createEventItem: async (eventType: number, startDate: number, endDate: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'createEventItem',
                    args: [eventType, BigInt(startDate), BigInt(endDate)],
                    account: account.address
                });
            } catch (error) {
                console.error('Error creating event item', error);
                throw error;
            }
        },

        getEventItem: async (eventId: number): Promise<EventItem> => {
            try {
                const eventItem = await readContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'getEventItem',
                    args: [BigInt(eventId)]
                });

                return {
                    ...eventItem,
                    startDate: new Date(Number(eventItem.startDate)),
                    endDate: new Date(Number(eventItem.endDate))
                } as EventItem;
            } catch (error) {
                console.error('Error getting event item', error);
                throw error;
            }
        },

        getAllEventItemIds: async (): Promise<number[]> => {
            try {
                const eventItemIds = await readContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'getAllEventItemIds',
                    args: []
                });

                return eventItemIds.map(id => Number(id));
            } catch (error) {
                console.error('Error getting all event item ids', error);
                throw error;
            }
        },

        getAllActiveEventItemIds: async (): Promise<number[]> => {
            try {
                const eventItemIds = await readContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'getAllActiveEventItemIds',
                    args: []
                });

                return eventItemIds.map(id => Number(id));
            } catch (error) {
                console.error('Error getting all active event item ids', error);
                throw error;
            }
        },

        startEvent: async (eventId: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'startEvent',
                    args: [BigInt(eventId)],
                    account: account.address
                });
            } catch (error) {
                console.error('Error starting event', error);
                throw error;
            }
        },

        endEvent: async (eventId: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'endEvent',
                    args: [BigInt(eventId)],
                    account: account.address
                });
            } catch (error) {
                console.error('Error ending event', error);
                throw error;
            }
        },

        getNextItemId: async (): Promise<number> => {
            try {
                const nextItemId = await readContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'getNextItemId',
                    args: []
                });

                return Number(nextItemId);
            } catch (error) {
                console.error('Error getting next item id', error);
                throw error;
            }
        },

        popNotListedItem: async (): Promise<number> => {
            try {
                const itemId = await writeContract(config, {
                    abi: CAFItemsManagerAbi,
                    address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
                    functionName: 'popNotListedItem',
                    args: [],
                    account: account.address
                });

                return Number(itemId);
            } catch (error) {
                console.error('Error popping not listed item', error);
                throw error;
            }
        }
    }
}