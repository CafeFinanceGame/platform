import { readContract } from "@wagmi/core";
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
    COFFEE_BEAN: ProductEconomy;
    BLACK_COFFEE: ProductEconomy;
    MILK_COFFEE: ProductEconomy;
    POWERED_MILK: ProductEconomy;
    MILK: ProductEconomy;
    WATER: ProductEconomy;
    MATERIAL_MACHINE: ProductEconomy;
    KETTLE: ProductEconomy;
    MILK_FOTHER: ProductEconomy;
};

interface ICAFGameEconomyHook extends ICAFGameEconomyActions, ICAFGameEconomyParameters { }
export const useCAFGameEconomy = (): ICAFGameEconomyHook => {
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
        },

        COFFEE_BEAN: {
            energy: 50,
            durability: 0,
            decayRate: 1,
            decayPeriod: 3,
            costPrice: 5,
            insurancePrice: 1,
            freightPrice: 1,
            manufacturedPerHour: 10
        },
        BLACK_COFFEE: {
            energy: 100,
            durability: 0,
            decayRate: 1,
            decayPeriod: 2,
            costPrice: 10,
            insurancePrice: 1,
            freightPrice: 1
        },
        MILK_COFFEE: {
            energy: 250,
            durability: 0,
            decayRate: 6,
            decayPeriod: 1,
            costPrice: 20,
            insurancePrice: 3,
            freightPrice: 4
        },
        POWERED_MILK: {
            energy: 180,
            durability: 0,
            decayRate: 4,
            decayPeriod: 1,
            costPrice: 9,
            insurancePrice: 1,
            freightPrice: 2,
            manufacturedPerHour: 20
        },
        MILK: {
            energy: 120,
            durability: 0,
            decayRate: 3,
            decayPeriod: 1,
            costPrice: 8,
            insurancePrice: 1,
            freightPrice: 2
        },
        WATER: {
            energy: 30,
            durability: 0,
            decayRate: 1,
            decayPeriod: 6,
            costPrice: 3,
            insurancePrice: 1,
            freightPrice: 1,
            manufacturedPerHour: 30
        },
        MATERIAL_MACHINE: {
            energy: 0,
            durability: 500,
            decayRate: 3,
            decayPeriod: 1,
            costPrice: 50,
            insurancePrice: 5,
            freightPrice: 8,
            manufacturedPerHour: 5
        },
        KETTLE: {
            energy: 0,
            durability: 400,
            decayRate: 2,
            decayPeriod: 1,
            costPrice: 40,
            insurancePrice: 4,
            freightPrice: 6
        },
        MILK_FOTHER: {
            energy: 0,
            durability: 600,
            decayRate: 4,
            decayPeriod: 1,
            costPrice: 60,
            insurancePrice: 6,
            freightPrice: 10,
        }
    }
}