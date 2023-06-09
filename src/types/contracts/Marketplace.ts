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
  AddressLike,
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
} from "./common";

export interface MarketplaceInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "feePercent"
      | "feeRecipient"
      | "getTotalPrice"
      | "itemCounter"
      | "makeItem"
      | "marketItems"
      | "purchaseItem"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "Created" | "Sold"): EventFragment;

  encodeFunctionData(
    functionFragment: "feePercent",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "feeRecipient",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalPrice",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "itemCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "makeItem",
    values: [AddressLike, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "marketItems",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "purchaseItem",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "feePercent", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "feeRecipient",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "itemCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "makeItem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "marketItems",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "purchaseItem",
    data: BytesLike
  ): Result;
}

export namespace CreatedEvent {
  export type InputTuple = [
    itemId: BigNumberish,
    nft: AddressLike,
    tokenId: BigNumberish,
    price: BigNumberish,
    seller: AddressLike
  ];
  export type OutputTuple = [
    itemId: bigint,
    nft: string,
    tokenId: bigint,
    price: bigint,
    seller: string
  ];
  export interface OutputObject {
    itemId: bigint;
    nft: string;
    tokenId: bigint;
    price: bigint;
    seller: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace SoldEvent {
  export type InputTuple = [
    itemId: BigNumberish,
    nft: AddressLike,
    tokenId: BigNumberish,
    price: BigNumberish,
    seller: AddressLike,
    buyer: AddressLike
  ];
  export type OutputTuple = [
    itemId: bigint,
    nft: string,
    tokenId: bigint,
    price: bigint,
    seller: string,
    buyer: string
  ];
  export interface OutputObject {
    itemId: bigint;
    nft: string;
    tokenId: bigint;
    price: bigint;
    seller: string;
    buyer: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Marketplace extends BaseContract {
  connect(runner?: ContractRunner | null): Marketplace;
  waitForDeployment(): Promise<this>;

  interface: MarketplaceInterface;

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

  feePercent: TypedContractMethod<[], [bigint], "view">;

  feeRecipient: TypedContractMethod<[], [string], "view">;

  getTotalPrice: TypedContractMethod<[_itemId: BigNumberish], [bigint], "view">;

  itemCounter: TypedContractMethod<[], [bigint], "view">;

  makeItem: TypedContractMethod<
    [_nft: AddressLike, _tokenId: BigNumberish, _price: BigNumberish],
    [void],
    "nonpayable"
  >;

  marketItems: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, bigint, bigint, string, boolean] & {
        itemId: bigint;
        nft: string;
        tokenId: bigint;
        price: bigint;
        seller: string;
        isSold: boolean;
      }
    ],
    "view"
  >;

  purchaseItem: TypedContractMethod<[_itemId: BigNumberish], [void], "payable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "feePercent"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "feeRecipient"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getTotalPrice"
  ): TypedContractMethod<[_itemId: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "itemCounter"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "makeItem"
  ): TypedContractMethod<
    [_nft: AddressLike, _tokenId: BigNumberish, _price: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "marketItems"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [bigint, string, bigint, bigint, string, boolean] & {
        itemId: bigint;
        nft: string;
        tokenId: bigint;
        price: bigint;
        seller: string;
        isSold: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "purchaseItem"
  ): TypedContractMethod<[_itemId: BigNumberish], [void], "payable">;

  getEvent(
    key: "Created"
  ): TypedContractEvent<
    CreatedEvent.InputTuple,
    CreatedEvent.OutputTuple,
    CreatedEvent.OutputObject
  >;
  getEvent(
    key: "Sold"
  ): TypedContractEvent<
    SoldEvent.InputTuple,
    SoldEvent.OutputTuple,
    SoldEvent.OutputObject
  >;

  filters: {
    "Created(uint256,address,uint256,uint256,address)": TypedContractEvent<
      CreatedEvent.InputTuple,
      CreatedEvent.OutputTuple,
      CreatedEvent.OutputObject
    >;
    Created: TypedContractEvent<
      CreatedEvent.InputTuple,
      CreatedEvent.OutputTuple,
      CreatedEvent.OutputObject
    >;

    "Sold(uint256,address,uint256,uint256,address,address)": TypedContractEvent<
      SoldEvent.InputTuple,
      SoldEvent.OutputTuple,
      SoldEvent.OutputObject
    >;
    Sold: TypedContractEvent<
      SoldEvent.InputTuple,
      SoldEvent.OutputTuple,
      SoldEvent.OutputObject
    >;
  };
}
