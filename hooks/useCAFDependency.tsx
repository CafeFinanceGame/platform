import { readContract } from "@wagmi/core";
import { useAccount } from "wagmi";

import { ProductItemType, ProductEconomy, ActivityEnergyFee } from "@/types";
import constants from "@/utils/constants";
import wagmi from "@/utils/wagmi";
import CAFGameEconomyAbi from "@/abis/CAFGameEconomy";

const contracts = constants.contracts;
const config = wagmi.wagmiConfig;

enum CompanyActivityEnergyFeeType {
  MANUFACTURE,
  SWAP,
}

interface ICAFGameEconomyActions {
  getCurrentPrice(productType: ProductItemType): Promise<number>;
  getProductEconomy(productType: ProductItemType): Promise<ProductEconomy>;
  getActivityFee(
    activityType: CompanyActivityEnergyFeeType,
  ): Promise<ActivityEnergyFee>;
}

interface ICAFGameEconomyParameters {
  COFFEE_BEAN: ProductEconomy;
  COFFEE: ProductEconomy;
  WATER: ProductEconomy;
  MILK: ProductEconomy;
  MATERIAL_MACHINE: ProductEconomy;
  KETTLE: ProductEconomy;
}

interface ICAFGameEconomyHook
  extends ICAFGameEconomyActions,
    ICAFGameEconomyParameters {}
export const useCAFGameEconomy = (): ICAFGameEconomyHook => {
  const account = useAccount();

  return {
    getActivityFee: async (
      activityType: CompanyActivityEnergyFeeType,
    ): Promise<ActivityEnergyFee> => {
      try {
        const fee = await readContract(config, {
          abi: CAFGameEconomyAbi,
          address: contracts.CAF_GAME_ECONOMY_ADDRESS,
          functionName: "getActivityFee",
          args: [activityType],
          account: account.address,
        });

        return fee as ActivityEnergyFee;
      } catch (error) {
        console.log("Error getting activity fee", error);
        throw error;
      }
    },

    getCurrentPrice: async (productType: ProductItemType): Promise<number> => {
      try {
        const price = await readContract(config, {
          abi: CAFGameEconomyAbi,
          address: contracts.CAF_GAME_ECONOMY_ADDRESS,
          functionName: "getCurrentPrice",
          args: [productType],
          account: account.address,
        });

        return Number(price);
      } catch (error) {
        console.log("Error getting current price", error);
        throw error;
      }
    },

    getProductEconomy: async (
      productType: ProductItemType,
    ): Promise<ProductEconomy> => {
      try {
        const economy = await readContract(config, {
          abi: CAFGameEconomyAbi,
          address: contracts.CAF_GAME_ECONOMY_ADDRESS,
          functionName: "getProductEconomy",
          args: [productType],
          account: account.address,
        });

        return {
          ...economy,
          costPrice: Number(economy.costPrice),
        } as ProductEconomy;
      } catch (error) {
        console.log("Error getting product economy", error);
        throw error;
      }
    },

    COFFEE_BEAN: {
      energy: 80,
      durability: 0,
      decayRatePerQuarterDay: 4,
      costPrice: 5,
    },
    COFFEE: {
      energy: 100,
      durability: 0,
      decayRatePerQuarterDay: 8,
      costPrice: 10,
    },
    WATER: {
      energy: 80,
      durability: 0,
      decayRatePerQuarterDay: 8,
      costPrice: 3,
    },
    MILK: {
      energy: 100,
      durability: 0,
      decayRatePerQuarterDay: 4,
      costPrice: 8,
    },
    MATERIAL_MACHINE: {
      energy: 0,
      durability: 100,
      decayRatePerQuarterDay: 1,
      costPrice: 50,
    },
    KETTLE: {
      energy: 0,
      durability: 80,
      decayRatePerQuarterDay: 1,
      costPrice: 40,
    },
  };
};
