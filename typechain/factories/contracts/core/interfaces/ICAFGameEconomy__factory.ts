/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ICAFGameEconomy,
  ICAFGameEconomyInterface,
} from "../../../../contracts/core/interfaces/ICAFGameEconomy";

const _abi = [
  {
    inputs: [
      {
        internalType: "enum ICAFGameEconomy.CompanyAcitivityEnergyFeeType",
        name: "_activityType",
        type: "uint8",
      },
    ],
    name: "getActivityFee",
    outputs: [
      {
        components: [
          {
            internalType: "enum ICAFGameEconomy.CompanyAcitivityEnergyFeeType",
            name: "activityType",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "fee",
            type: "uint8",
          },
        ],
        internalType: "struct ICAFGameEconomy.ActivityEnergyFee",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum ItemLibrary.ProductItemType",
        name: "_productType",
        type: "uint8",
      },
    ],
    name: "getCurrentPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum ItemLibrary.ProductItemType",
        name: "_productType",
        type: "uint8",
      },
    ],
    name: "getManufacturedProduct",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "manufacturedPerHour",
            type: "uint256",
          },
        ],
        internalType: "struct ICAFGameEconomy.ManufacturedProduct",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum ItemLibrary.ProductItemType",
        name: "_productType",
        type: "uint8",
      },
    ],
    name: "getProductEconomy",
    outputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "energy",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "durability",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "decayRatePerHour",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "costPrice",
            type: "uint256",
          },
        ],
        internalType: "struct ICAFGameEconomy.ProductEconomy",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum ICAFGameEconomy.CompanyAcitivityEnergyFeeType",
        name: "_activityType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    name: "updateActivityFee",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updateAllPrices",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum ItemLibrary.ProductItemType",
        name: "_productType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_manufacturedPerHour",
        type: "uint256",
      },
    ],
    name: "updateManufacturedProduct",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum ItemLibrary.ProductItemType",
        name: "_productType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_energy",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_durability",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_decayRatePerHour",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_costPrice",
        type: "uint256",
      },
    ],
    name: "updateProductEconomy",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class ICAFGameEconomy__factory {
  static readonly abi = _abi;
  static createInterface(): ICAFGameEconomyInterface {
    return new Interface(_abi) as ICAFGameEconomyInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ICAFGameEconomy {
    return new Contract(address, _abi, runner) as unknown as ICAFGameEconomy;
  }
}
