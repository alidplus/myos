import { TypeNames } from './enums';
import { OrderActionTypes, PayloadTypes } from './types';

export const toLoadAllOrders =
( payload: PayloadTypes[TypeNames.LOAD_ORDERS] ): OrderActionTypes => ({
  type: TypeNames.LOAD_ORDERS,
  payload
});

export const toLoadSingleOrder =
( payload: PayloadTypes[TypeNames.LOAD_SINGLE_ORDER] ): OrderActionTypes => ({
  type: TypeNames.LOAD_SINGLE_ORDER,
  payload
});

export const toUpdateOrder =
( payload: PayloadTypes[TypeNames.UPDATE_SINGLE_ORDER] ): OrderActionTypes => ({
  type: TypeNames.UPDATE_SINGLE_ORDER,
  payload
});

export const toInsertOrder =
( payload: PayloadTypes[TypeNames.LOAD_SINGLE_ORDER] ): OrderActionTypes => ({
  type: TypeNames.LOAD_SINGLE_ORDER,
  payload
});

export const toDeleteOrder = 
( payload: PayloadTypes[TypeNames.REMOVE_SINGLE_ORDER] ): OrderActionTypes => ({
  type: TypeNames.REMOVE_SINGLE_ORDER,
  payload
});