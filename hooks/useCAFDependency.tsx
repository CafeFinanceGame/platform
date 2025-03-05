import { ProductItemType, ProductEconomy, ActivityEnergyFee, ListedItem } from "@/types";

enum CompanyActivityEnergyFeeType {
    MANUFACTURE,
    SWAP
}

interface ICAFGameEconomyActions {
    getCurrentPrice(productType: ProductItemType): Promise<number>;
    getProductEconomy(productType: ProductItemType): Promise<ProductEconomy>;
    getActivityFee(activityType: CompanyActivityEnergyFeeType): Promise<ActivityEnergyFee>;
}

interface ICAFMarketplaceActions {
    buy(itemId: number): Promise<void>;
    list(itemId: number, price: number): Promise<void>;
    unlist(itemId: number): Promise<void>;
    updatePrice(itemId: number, price: number): Promise<void>;
    getListedItem(itemId: number): Promise<ListedItem>;

    // Resale store actions
    sell(itemId: number): Promise<void>;
    calculateResalePrice(itemId: number): Promise<number>;
}