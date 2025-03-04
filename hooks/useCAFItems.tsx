import { useAccount } from 'wagmi'
import { waitForTransactionReceipt, writeContract, readContract } from '@wagmi/core'
import type { Company, PlayerRole } from '@/types';
import constants from '@/utils/constants';
import wagmi from "@/utils/wagmi";

const contracts = constants.contracts;
const config = wagmi.wagmiConfig;

import CAFCompanyItemsAbi from '@/abis/CAFCompanyItems.json'

export interface ICAFCompanyActions {
    create(owner: string, role: PlayerRole): Promise<number>;

    get(companyId: number): Promise<Company>;

    getByOwner(owner: string): Promise<number>;

    replenishEnergy(companyId: number, itemId: number): Promise<void>;

    useEnergy(companyId: number, amount: number): Promise<void>;

    role(companyId: number): Promise<PlayerRole>;

    energy(companyId: number): Promise<number>;

    isCompany(id: number): Promise<boolean>;

    hasCompany(owner: string): Promise<boolean>;
}

interface ICAFProductActions { }
interface ICAFItemsActions extends ICAFCompanyActions, ICAFProductActions { }

export const useCompanyActions = (): ICAFCompanyActions => {
    const account = useAccount();

    return {
        create: async (owner: string, role: PlayerRole): Promise<number> => {
            try {
                const hash = await writeContract(config, {
                    abi: CAFCompanyItemsAbi,
                    address: contracts.CAF_COMPANY_ITEMS_ADDRESS,
                    functionName: 'create',
                    args: [owner, role],
                    account: account.address
                });

                const receitp = await waitForTransactionReceipt(config, {
                    hash
                });

                const id: number = Number(receitp.logs[0].data);

                return id;

            } catch (error) {
                console.error('Error creating company', error);
                throw error;
            }
        },

        get: async (companyId: number): Promise<Company> => {
            try {
                const company = await readContract(config, {
                    abi: CAFCompanyItemsAbi,
                    address: contracts.CAF_COMPANY_ITEMS_ADDRESS,
                    functionName: 'get',
                    args: [companyId]
                });

                return company as Company;
            } catch (error) {
                console.error('Error getting company', error);
                throw error;
            }
        },

        getByOwner: async (owner: string): Promise<number> => {
            try {
                const companyId = await readContract(config, {
                    abi: CAFCompanyItemsAbi,
                    address: contracts.CAF_COMPANY_ITEMS_ADDRESS,
                    functionName: 'getByOwner',
                    args: [owner]
                });

                return Number(companyId);
            } catch (error) {
                console.error('Error getting company by owner', error);
                throw error;
            }
        },

        replenishEnergy: async (companyId: number, itemId: number): Promise<void> => {
            try {
                await writeContract(config, {
                    abi: CAFCompanyItemsAbi,
                    address: contracts.CAF_COMPANY_ITEMS_ADDRESS,
                    functionName: 'replenishEnergy',
                    args: [companyId, itemId],
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
                    abi: CAFCompanyItemsAbi,
                    address: contracts.CAF_COMPANY_ITEMS_ADDRESS,
                    functionName: 'useEnergy',
                    args: [companyId, amount],
                    account: account.address
                });
            } catch (error) {
                console.error('Error using energy', error);
                throw error;
            }
        },

        role: async (companyId: number): Promise<PlayerRole> => {
            try {
                const role = await readContract(config, {
                    abi: CAFCompanyItemsAbi,
                    address: contracts.CAF_COMPANY_ITEMS_ADDRESS,
                    functionName: 'role',
                    args: [companyId]
                });

                return role as PlayerRole;
            } catch (error) {
                console.error('Error getting role', error);
                throw error;
            }
        },

        energy: async (companyId: number): Promise<number> => {
            try {
                const energy = await readContract(config, {
                    abi: CAFCompanyItemsAbi,
                    address: contracts.CAF_COMPANY_ITEMS_ADDRESS,
                    functionName: 'energy',
                    args: [companyId]
                });

                return Number(energy);
            } catch (error) {
                console.error('Error getting energy', error);
                throw error;
            }
        },

        isCompany: async (id: number): Promise<boolean> => {
            try {
                const isCompany = await readContract(config, {
                    abi: CAFCompanyItemsAbi,
                    address: contracts.CAF_COMPANY_ITEMS_ADDRESS,
                    functionName: 'isCompany',
                    args: [id]
                });

                return isCompany as boolean;
            } catch (error) {
                console.error('Error checking if company', error);
                throw error;
            }
        },

        hasCompany: async (owner: string): Promise<boolean> => {
            try {
                const hasCompany = await readContract(config, {
                    abi: CAFCompanyItemsAbi,
                    address: contracts.CAF_COMPANY_ITEMS_ADDRESS,
                    functionName: 'hasCompany',
                    args: [owner]
                });

                return hasCompany as boolean;
            } catch (error) {
                console.error('Error checking if owner has company', error);
                throw error;
            }
        }
    }
}
