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