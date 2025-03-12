import { Address } from "viem";

import { ProductItemType } from "@/types";
export default {
  contracts: {
    CAF_CONTRACT_REGISTRY_ADDRESS: process.env
      .NEXT_PUBLIC_CAF_CONTRACT_REGISTRY_CONTRACT_ADDRESS as Address,
    CAF_GAME_MANAGER_ADDRESS: process.env
      .NEXT_PUBLIC_CAF_GAME_MANAGER_CONTRACT_ADDRESS as Address,
    CAF_MARKETPLACE_ADDRESS: process.env
      .NEXT_PUBLIC_CAF_MARKETPLACE_CONTRACT_ADDRESS as Address,
    CAF_GAME_ECONOMY_ADDRESS: process.env
      .NEXT_PUBLIC_CAF_GAME_ECONOMY_CONTRACT_ADDRESS as Address,
    CAF_ITEMS_MANAGER_ADDRESS: process.env
      .NEXT_PUBLIC_CAF_ITEMS_MANAGER_CONTRACT_ADDRESS as Address,
    CAF_TOKEN_ADDRESS: process.env
      .NEXT_PUBLIC_CAF_TOKEN_CONTRACT_ADDRESS as Address,
  },
  walletconnet: {
    PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
  },
  images: {
    [ProductItemType.COFFEE_BEAN]: {
      image: "/assets/item-product-coffee_bean.png",
      label: "Coffee Bean",
    },
    [ProductItemType.COFFEE]: {
      image: "/assets/item-product-black_coffee.png",
      label: "Black Coffee",
    },
    [ProductItemType.MILK]: {
      image: "/assets/item-product-milk.png",
      label: "Milk",
    },
    [ProductItemType.WATER]: {
      image: "/assets/item-product-water.png",
      label: "Water",
    },
    [ProductItemType.MACHINE_MATERIAL]: {
      image: "/assets/item-product-material_machine.png",
      label: "Material Machine",
    },
    [ProductItemType.KETTLE]: {
      image: "/assets/item-product-kettle.png",
      label: "Kettle",
    },
  } as Record<
    ProductItemType,
    {
      image: string;
      label: string;
    }
  >,
};
