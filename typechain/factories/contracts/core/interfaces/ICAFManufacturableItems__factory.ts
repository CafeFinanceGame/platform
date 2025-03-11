/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ICAFManufacturableItems,
  ICAFManufacturableItemsInterface,
} from "../../../../contracts/core/interfaces/ICAFManufacturableItems";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum ItemLibrary.ProductItemType",
        name: "productType",
        type: "uint8",
      },
    ],
    name: "ProductItemManufactured",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "enum ItemLibrary.ProductItemType",
        name: "_productType",
        type: "uint8",
      },
      {
        internalType: "uint256[]",
        name: "_componentIds",
        type: "uint256[]",
      },
    ],
    name: "manufacture",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ICAFManufacturableItems__factory {
  static readonly abi = _abi;
  static createInterface(): ICAFManufacturableItemsInterface {
    return new Interface(_abi) as ICAFManufacturableItemsInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ICAFManufacturableItems {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as ICAFManufacturableItems;
  }
}
