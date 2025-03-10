import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

enum CompanyType {
  UNKNOWN,
  FACTORY_COMPANY, // Only system has role this
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
  UNKNOWN,
  // Coffee Company
  COFFEE_BEAN, // Default material product that only coffee company can import
  COFFEE, // Formula: Coffee Bean + Water + Kettle
  // Material Company
  WATER, // Default material product that only material company can import
  MILK, // Formula: Water + Kettle
  // Machine Company
  MACHINE_MATERIAL, // Default material product that only machine company can import
  KETTLE // Formula: Machine Material + Water
}

enum EventItemType {
  UNKNOWN,
  SUPPLY_FLUCTUATION,
  WEATHER_VARIATION
}

enum ContractRegistryType {
  CAF_TOKEN_CONTRACT,
  CAF_GAME_MANAGER_CONTRACT,
  CAF_MARKETPLACE_CONTRACT,
  CAF_GAME_ECONOMY_CONTRACT,
  CAF_ITEMS_MANAGER_CONTRACT
}

enum CompanyAcitivityEnergyFeeType {
  MANUFACTURE,
  BUY,
  SELL,
  LIST,
  UNLIST,
  UPDATE
}

type Company = {
  owner: string;
  role: CompanyType;
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
  decayRatePerHour: number;
  costPrice: number;
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

interface ProductItemInfo {
  productType: ProductItemType;
  energy: number;
  durability: number;
  decayRate: number;
  decayPeriod: number;
}

type ProductRecipe = {
  output: ProductItemType;
  inputs: ProductItemType[];
};

type RawMaterialProductInfo = {
  productType: ProductItemType;
  costPrice: number;
  insurancePrice: number;
  freightPrice: number;
}

type ListedItem = {
  id: number;
  owner: string;
  price: number;
}

export {
  CompanyType,
  ItemType,
  ProductItemType,
  EventItemType,
  ContractRegistryType,
  CompanyAcitivityEnergyFeeType
};

export type {
  ProductRecipe,
  Company,
  Item,
  EventItem,
  ProductEconomy,
  ActivityEnergyFee,
  ManufacturedProduct,
  ProductItem,
  ProductItemInfo,
  RawMaterialProductInfo,
  ListedItem
}