/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  ICAFDecayableItems,
  ICAFDecayableItemsInterface,
} from "../../../../contracts/core/interfaces/ICAFDecayableItems";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lastDecayed",
        type: "uint256",
      },
    ],
    name: "ItemDecayed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_itemId",
        type: "uint256",
      },
    ],
    name: "decay",
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

export class ICAFDecayableItems__factory {
  static readonly abi = _abi;
  static createInterface(): ICAFDecayableItemsInterface {
    return new Interface(_abi) as ICAFDecayableItemsInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): ICAFDecayableItems {
    return new Contract(address, _abi, runner) as unknown as ICAFDecayableItems;
  }
}
