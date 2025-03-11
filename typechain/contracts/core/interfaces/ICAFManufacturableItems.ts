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
  EventFragment,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../common";

export interface ICAFManufacturableItemsInterface extends Interface {
  getFunction(nameOrSignature: "manufacture"): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "ProductItemManufactured"): EventFragment;

  encodeFunctionData(
    functionFragment: "manufacture",
    values: [BigNumberish, BigNumberish[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "manufacture",
    data: BytesLike
  ): Result;
}

export namespace ProductItemManufacturedEvent {
  export type InputTuple = [itemId: BigNumberish, productType: BigNumberish];
  export type OutputTuple = [itemId: bigint, productType: bigint];
  export interface OutputObject {
    itemId: bigint;
    productType: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface ICAFManufacturableItems extends BaseContract {
  connect(runner?: ContractRunner | null): ICAFManufacturableItems;
  waitForDeployment(): Promise<this>;

  interface: ICAFManufacturableItemsInterface;

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

  manufacture: TypedContractMethod<
    [_productType: BigNumberish, _componentIds: BigNumberish[]],
    [bigint],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "manufacture"
  ): TypedContractMethod<
    [_productType: BigNumberish, _componentIds: BigNumberish[]],
    [bigint],
    "nonpayable"
  >;

  getEvent(
    key: "ProductItemManufactured"
  ): TypedContractEvent<
    ProductItemManufacturedEvent.InputTuple,
    ProductItemManufacturedEvent.OutputTuple,
    ProductItemManufacturedEvent.OutputObject
  >;

  filters: {
    "ProductItemManufactured(uint256,uint8)": TypedContractEvent<
      ProductItemManufacturedEvent.InputTuple,
      ProductItemManufacturedEvent.OutputTuple,
      ProductItemManufacturedEvent.OutputObject
    >;
    ProductItemManufactured: TypedContractEvent<
      ProductItemManufacturedEvent.InputTuple,
      ProductItemManufacturedEvent.OutputTuple,
      ProductItemManufacturedEvent.OutputObject
    >;
  };
}
