import {readContract} from "@wagmi/core";
import { ProductItemType, ProductEconomy, ActivityEnergyFee, ListedItem } from "@/types";
import constants from '@/utils/constants';
import wagmi from "@/utils/wagmi";
import CAFGameEconomyAbi from '@/abis/CAFGameEconomy.json'
import { useAccount } from "wagmi";

const contracts = constants.contracts;
const config = wagmi.wagmiConfig;

enum CompanyActivityEnergyFeeType {
    MANUFACTURE,
    SWAP
}

interface ICAFGameEconomyActions {
    getCurrentPrice(productType: ProductItemType): Promise<number>;
    getProductEconomy(productType: ProductItemType): Promise<ProductEconomy>;
    getActivityFee(activityType: CompanyActivityEnergyFeeType): Promise<ActivityEnergyFee>;
}

interface ICAFGameEconomyParameters {
    coffeeCompany: {
        coffeeBean: {
            energy: number;
            decayRate: number;
            decayPeriod: string;
            costPrice: number;
            insurancePrice: number;
            freightPrice: number;
            manufacturedPerHour: number;
        };
        blackCoffee: {
            energy: number;
            decayRate: number;
            decayPeriod: string;
            costPrice: number;
            insurancePrice: number;
            freightPrice: number;
        };
        milkCoffee: {
            energy: number;
            decayRate: number;
            decayPeriod: string;
            costPrice: number;
            insurancePrice: number;
            freightPrice: number;
        };
    };
    materialCompany: {
        poweredMilk: {
            energy: number;
            decayRate: number;
            decayPeriod: string;
            costPrice: number;
            insurancePrice: number;
            freightPrice: number;
            manufacturedPerHour: number;
        };
        milk: {
            energy: number;
            decayRate: number;
            decayPeriod: string;
            costPrice: number;
            insurancePrice: number;
            freightPrice: number;
        };
        water: {
            energy: number;
            decayRate: number;
            decayPeriod: string;
            costPrice: number;
            insurancePrice: number;
            freightPrice: number;
            manufacturedPerHour: number;
        };
    };
    machineCompany: {
        materialMachine: {
            durability: number;
            decayRate: number;
            decayPeriod: string;
            costPrice: number;
            insurancePrice: number;
            freightPrice: number;
            manufacturedPerHour: number;
        };
        kettle: {
            durability: number;
            decayRate: number;
            decayPeriod: string;
            costPrice: number;
            insurancePrice: number;
            freightPrice: number;
        };
        milkFrother: {
            durability: number;
            decayRate: number;
            decayPeriod: string;
            costPrice: number;
            insurancePrice: number;
            freightPrice: number;
        };
    };
}

export const useCAFGameEconomy = (): ICAFGameEconomyActions => {
    const account = useAccount();

    return {
        getActivityFee: async (activityType: CompanyActivityEnergyFeeType): Promise<ActivityEnergyFee> => {
            try {
                const fee = await readContract(config, {
                    abi: CAFGameEconomyAbi,
                    address: contracts.CAF_GAME_ECONOMY_ADDRESS,
                    functionName: 'getActivityFee',
                    args: [activityType],
                    account: account.address
                });

                return fee as ActivityEnergyFee;
            } catch (error) {
                console.error('Error getting activity fee', error);
                throw error;
            }
        },

        getCurrentPrice: async (productType: ProductItemType): Promise<number> => {
            try {
                const price = await readContract(config, {
                    abi: CAFGameEconomyAbi,
                    address: contracts.CAF_GAME_ECONOMY_ADDRESS,
                    functionName: 'getCurrentPrice',
                    args: [productType],
                    account: account.address
                });

                return Number(price);
            } catch (error) {
                console.error('Error getting current price', error);
                throw error;
            }
        },

        getProductEconomy: async (productType: ProductItemType): Promise<ProductEconomy> => {
            try {
                const economy = await readContract(config, {
                    abi: CAFGameEconomyAbi,
                    address: contracts.CAF_GAME_ECONOMY_ADDRESS,
                    functionName: 'getProductEconomy',
                    args: [productType],
                    account: account.address
                });

                return economy as ProductEconomy;
            } catch (error) {
                console.error('Error getting product economy', error);
                throw error;
            }
        }
    }
}