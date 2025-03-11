/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export interface ICAFContractRegistryInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getContractAddress"
      | "registerContract"
      | "unregisterContract"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getContractAddress",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "registerContract",
    values: [BigNumberish, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "unregisterContract",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unregisterContract",
    data: BytesLike
  ): Result;
}

export interface ICAFContractRegistry extends BaseContract {
  connect(runner?: ContractRunner | null): ICAFContractRegistry;
  waitForDeployment(): Promise<this>;

  interface: ICAFContractRegistryInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getContractAddress: TypedContractMethod<
    [contractType: BigNumberish],
    [string],
    "view"
  >;

  registerContract: TypedContractMethod<
    [contractType: BigNumberish, contractAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  unregisterContract: TypedContractMethod<
    [contractType: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getContractAddress"
  ): TypedContractMethod<[contractType: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "registerContract"
  ): TypedContractMethod<
    [contractType: BigNumberish, contractAddress: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "unregisterContract"
  ): TypedContractMethod<[contractType: BigNumberish], [void], "nonpayable">;

  filters: {};
}
