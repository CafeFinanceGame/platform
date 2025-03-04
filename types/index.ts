import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

enum PlayerRole {
  COFFEE_COMPANY,
  MACHINE_COMPANY,
  MATERIAL_COMPANY
}

enum ItemType {
  UTILITY,
  PRODUCT,
  EVENT
}

enum ProductItemType {
  // Coffee Company
  COFFEE_BEAN, 
  BLACK_COFFEE,
  MILK_COFFEE,
  // Material Company
  POWDERED_MILK, 
  WATER,
  MILK, 
  // Machine Company
  MACHINE_MATERIAL,
  KETTLE,
  MILK_FROTHER 
}

enum EventItemType {
  RawMaterialPriceFluctuations,
  MarketSupplyImbalance
}

enum ContractRegistryType {
  CAF_MARKETPLACE_CONTRACT,
  CAF_POOL_CONTRACT,
  CAF_GAME_MANAGER_CONTRACT,
  CAF_GAME_ECONOMY_CONTRACT,
  CAF_MATERIAL_FACTORY_CONTRACT,
  CAF_COMPANY_ITEMS_CONTRACT,
  CAF_PRODUCT_ITEMS_CONTRACT,
  CAF_EVENT_ITEMS_CONTRACT,
  CAF_TOKEN_CONTRACT
}

enum CompanyAcitivityEnergyFeeType {
  MANUFACTURE,
  SWAP
}

type Company = {
  owner: string;
  role: PlayerRole;
  energy: number;
}

type Item = {
  owner: string;
  itemType: ItemType;
  amount: number;
}

type EventItem = {
  startDate: Date;
  endDate: Date;
  eventType: number;
}

type ProductEconomy = {
  energy: number;
  durability: number;
  decayRate: number; // uint8
  decayPeriod: number;
  costPrice: number;
  insurancePrice: number;
  freightPrice: number;
}

type ActivityEnergyFee = {
  activityType: CompanyAcitivityEnergyFeeType;
  fee: number;  // uint8
}

type ManufacturedProduct = {
  manufacturedPerHour: number;
}

type ProductItem = {
  productType: ProductItemType;
  price: number;
  energy: number;
  durability: number;
  msgTime: number;
  expTime: number;
}

type ProductItemInfo = {
  productType: ProductItemType;
  energy: number; // uint8
  durability: number; // uint8
  decayRate: number; // uint8
  decayPeriod: number; 
}

type RawMaterialProductInfo = {
  productType: ProductItemType;
  costPrice: number;
  insurancePrice: number;
  freightPrice: number;
}

type CAFDecayableItem = {
  decayRate: number; // uint8
  decayPeriod: number;
  lastDecayTime: number;
}

type ListedItem = {
  id: number;
  owner: string;
  price: number;
}