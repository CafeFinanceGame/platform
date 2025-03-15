import type { Address } from "viem";
import type {
  Company,
  EventItem,
  CompanyType,
  ProductItem,
  ProductItemType,
} from "@/types";

import { useAccount } from "wagmi";
import { writeContract, readContract } from "@wagmi/core";

import constants from "@/utils/constants";
import wagmi from "@/utils/wagmi";

const contracts = constants.contracts;
const config = wagmi.wagmiConfig;

import CAFItemsManagerAbi from "@/abis/CAFItemsManager";

export interface IERC1155 {
  balanceOf(account: Address, id: number): Promise<number>;
  balanceOfBatch?(accounts: Address[], ids: number[]): Promise<number[]>;
  setApprovalForAll?(operator: Address, approved: boolean): Promise<void>;
  isApprovedForAll?(account: Address, operator: Address): Promise<boolean>;
  safeTransferFrom?(
    from: Address,
    to: Address,
    id: number,
    value: number,
    data: string,
  ): Promise<void>;
  safeBatchTransferFrom?(
    from: Address,
    to: Address,
    ids: number[],
    values: number[],
    data: string,
  ): Promise<void>;
}
export interface ICAFCompanyItemsActions {
  createCompanyItem(owner: string, role: CompanyType): Promise<void>;
  getCompanyItem(companyId: number): Promise<Company>;
  getCompanyItemIdByOwner(owner: Address): Promise<number>;
  getAllCompanyItemIds(): Promise<number[]>;
  replenishEnergy(companyId: number, itemId: number): Promise<void>;
  useEnergy(companyId: number, amount: number): Promise<void>;
  hasCompany(owner: Address): Promise<boolean>;
}

export interface ICAFProductItemsActions {
  createProductItem(companyId: number, productType: ProductItemType): void;
  getProductItem(itemId: number): Promise<ProductItem>;
  getAllProductItemIds(): Promise<number[]>;
  getProductItemIdsByOwner(owner: Address): Promise<number[]>;
  manufacture(
    productType: ProductItemType,
    componentIds: number[],
  ): Promise<number>;
  decay(itemId: number): Promise<number>;
  hasProductItem(itemId: number): Promise<boolean>;
}

export interface ICAFEventItemsActions {
  createEventItem(eventType: number, startDate: number, endDate: number): void;
  getEventItem(eventId: number): Promise<EventItem>;
  getAllEventItemIds(): Promise<number[]>;
  getAllActiveEventItemIds(): Promise<number[]>;
  startEvent(eventId: number): void;
  endEvent(eventId: number): void;
}

export interface IAutoActions {
  autoDecayAll(): void;
  autoProduceProducts(): void;
  getLastAutoDecayTime(): Promise<number>;
  getLastAutoProduceTime(): Promise<number>;
}
export interface ICAFItemsManagerActions
  extends IERC1155,
  ICAFCompanyItemsActions,
  ICAFProductItemsActions,
  ICAFEventItemsActions,
  IAutoActions {
  getNextItemId(): Promise<number>;
  popNotListedItem(): Promise<number>;
}

export const useCAFItemsManagerActions = (): ICAFItemsManagerActions => {
  const account = useAccount();

  return {
    balanceOf: async (account: Address, id: number): Promise<number> => {
      try {
        const balance = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "balanceOf",
          args: [account, BigInt(id)],
        });

        return Number(balance);
      } catch (error) {
        console.log("Error getting balance", error);
        throw error;
      }
    },

    createCompanyItem: async (
      owner: string,
      role: CompanyType,
    ): Promise<void> => {
      try {
        await writeContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "createCompanyItem",
          args: [owner as Address, role],
          account: account.address,
        });
      } catch (error) {
        console.log("Error creating company", error);
        throw error;
      }
    },

    getCompanyItem: async (companyId: number): Promise<Company> => {
      try {
        const company = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "getCompanyItem",
          args: [BigInt(companyId)],
        });

        return company as Company;
      } catch (error) {
        console.log("Error getting company", error);
        throw error;
      }
    },

    getCompanyItemIdByOwner: async (owner: Address): Promise<number> => {
      try {
        const companyId = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "getCompanyItemByOwner",
          args: [owner],
        });

        return Number(companyId);
      } catch (error) {
        console.log("Error getting company id by owner", error);
        throw error;
      }
    },

    getAllCompanyItemIds: async (): Promise<number[]> => {
      try {
        const companyIds = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "getAllCompanyItemIds",
          args: [],
        });

        return companyIds.map((id) => Number(id));
      } catch (error) {
        console.log("Error getting all company ids", error);
        throw error;
      }
    },

    hasCompany: async (owner: Address): Promise<boolean> => {
      if (!account.address) return false;

      try {
        const hasCompany = (await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "hasCompanyItem",
          args: [account.address],
        })) as boolean;

        return hasCompany;
      } catch (error) {
        console.log("Error checking company ownership", error);
        throw error;
      }
    },

    hasProductItem: async (itemId: number): Promise<boolean> => {
      if (!account.address) return false;

      try {
        const hasProductItem = (await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "hasProductItem",
          args: [account.address, BigInt(itemId)],
        })) as boolean;

        return hasProductItem;
      } catch (error) {
        console.log("Error checking product ownership", error);
        throw error;
      }
    },

    replenishEnergy: async (
      companyId: number,
      itemId: number,
    ): Promise<void> => {
      try {
        await writeContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "replenishEnergy",
          args: [BigInt(companyId), BigInt(itemId)],
          account: account.address,
        });
      } catch (error) {
        console.log("Error replenishing energy", error);
        throw error;
      }
    },

    useEnergy: async (companyId: number, amount: number): Promise<void> => {
      try {
        await writeContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "useEnergy",
          args: [BigInt(companyId), amount],
          account: account.address,
        });
      } catch (error) {
        console.log("Error using energy", error);
        throw error;
      }
    },

    createProductItem: async (
      companyId: number,
      productType: ProductItemType,
    ): Promise<void> => {
      try {
        await writeContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "createProductItem",
          args: [BigInt(companyId), productType],
          account: account.address,
        });
      } catch (error) {
        console.log("Error creating product item", error);
        throw error;
      }
    },

    getProductItem: async (itemId: number): Promise<ProductItem> => {
      try {
        const productItem = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "getProductItem",
          args: [BigInt(itemId)],
        });

        return {
          ...productItem,
          decayRatePerQuarterDay: Number(productItem.decayRatePerQuarterDay),
          mfgTime: Number(productItem.mfgTime),
          expTime: Number(productItem.expTime),
          lastDecayTime: Number(productItem.lastDecayTime),
        } as ProductItem;
      } catch (error) {
        console.log("Error getting product item", error);
        throw error;
      }
    },

    getAllProductItemIds: async (): Promise<number[]> => {
      try {
        const productItemIds = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "getAllProductItemIds",
          args: [],
        });

        return productItemIds.map((id) => Number(id));
      } catch (error) {
        console.log("Error getting all product item ids", error);
        throw error;
      }
    },

    getProductItemIdsByOwner: async (owner: Address): Promise<number[]> => {
      try {
        const productItemIds = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "getAllProductItemByOwner",
          args: [owner],
        });

        return productItemIds.map((id) => Number(id));
      } catch (error) {
        console.log("Error getting product item ids by owner", error);
        throw error;
      }
    },

    manufacture: async (
      productType: ProductItemType,
      componentIds: number[],
    ): Promise<number> => {
      try {
        const itemId = await writeContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "manufacture",
          args: [productType, componentIds.map((id) => BigInt(id))],
          account: account.address,
        });

        return Number(itemId);
      } catch (error) {
        console.log("Error manufacturing product", error);
        throw error;
      }
    },

    decay: async (itemId: number): Promise<number> => {
      try {
        const decayedItemId = await writeContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "decay",
          args: [BigInt(itemId)],
          account: account.address,
        });

        return Number(decayedItemId);
      } catch (error) {
        console.log("Error decaying product", error);
        throw error;
      }
    },

    createEventItem: async (
      eventType: number,
      startDate: number,
      endDate: number,
    ): Promise<void> => {
      try {
        await writeContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "createEventItem",
          args: [eventType, BigInt(startDate), BigInt(endDate)],
          account: account.address,
        });
      } catch (error) {
        console.log("Error creating event item", error);
        throw error;
      }
    },

    getEventItem: async (eventId: number): Promise<EventItem> => {
      try {
        const eventItem = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "getEventItem",
          args: [BigInt(eventId)],
        });

        return {
          ...eventItem,
          startDate: new Date(Number(eventItem.startDate)),
          endDate: new Date(Number(eventItem.endDate)),
        } as EventItem;
      } catch (error) {
        console.log("Error getting event item", error);
        throw error;
      }
    },

    getAllEventItemIds: async (): Promise<number[]> => {
      try {
        const eventItemIds = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "getAllEventItemIds",
          args: [],
        });

        return eventItemIds.map((id) => Number(id));
      } catch (error) {
        console.log("Error getting all event item ids", error);
        throw error;
      }
    },

    getAllActiveEventItemIds: async (): Promise<number[]> => {
      try {
        const eventItemIds = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "getAllActiveEventItemIds",
          args: [],
        });

        return eventItemIds.map((id) => Number(id));
      } catch (error) {
        console.log("Error getting all active event item ids", error);
        throw error;
      }
    },

    startEvent: async (eventId: number): Promise<void> => {
      try {
        await writeContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "startEvent",
          args: [BigInt(eventId)],
          account: account.address,
        });
      } catch (error) {
        console.log("Error starting event", error);
        throw error;
      }
    },

    endEvent: async (eventId: number): Promise<void> => {
      try {
        await writeContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "endEvent",
          args: [BigInt(eventId)],
          account: account.address,
        });
      } catch (error) {
        console.log("Error ending event", error);
        throw error;
      }
    },

    getNextItemId: async (): Promise<number> => {
      try {
        const nextItemId = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "getNextItemId",
          args: [],
        });

        return Number(nextItemId);
      } catch (error) {
        console.log("Error getting next item id", error);
        throw error;
      }
    },

    popNotListedItem: async (): Promise<number> => {
      try {
        const itemId = await writeContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "popNotListedItem",
          args: [],
          account: account.address,
        });

        return Number(itemId);
      } catch (error) {
        console.log("Error popping not listed item", error);
        throw error;
      }
    },

    autoDecayAll: async (): Promise<void> => {
      try {
        await writeContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "autoDecayAll",
          args: [],
          account: account.address,
        });
      } catch (error) {
        console.log("Error auto decaying all", error);
        throw error;
      }
    },

    autoProduceProducts: async (): Promise<void> => {
      try {
        await writeContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "autoProduceProducts",
          args: [],
          account: account.address,
        });
      } catch (error) {
        console.log("Error auto producing products", error);
        throw error;
      }
    },

    getLastAutoDecayTime: async (): Promise<number> => {
      try {
        const lastAutoDecayTime = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "getLastAutoDecayTime",
          args: [],
        });

        return Number(lastAutoDecayTime);
      } catch (error) {
        console.log("Error getting last auto decay time", error);
        throw error;
      }
    },

    getLastAutoProduceTime: async (): Promise<number> => {
      try {
        const lastAutoProduceTime = await readContract(config, {
          abi: CAFItemsManagerAbi,
          address: contracts.CAF_ITEMS_MANAGER_ADDRESS,
          functionName: "getLastAutoProduceProducts",
          args: [],
        });

        return Number(lastAutoProduceTime);
      } catch (error) {
        console.log("Error getting last auto produce time", error);
        throw error;
      }
    },
  };
};
