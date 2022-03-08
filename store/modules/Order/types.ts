import { $Values } from 'utility-types';
import { TypeNames } from './enums';
import { IOrder } from 'models/types';

export type OrderStateType = {
  list: IOrder[]
};

export type PayloadTypes = {
  [TypeNames.LOAD_ORDERS]: IOrder[]
  [TypeNames.UPDATE_SINGLE_ORDER]: IOrder
  [TypeNames.LOAD_SINGLE_ORDER]: IOrder
  [TypeNames.REMOVE_SINGLE_ORDER]: IOrder
};

export type ActionsValueTypes = {
  toLoadAllOrders: {
    type: typeof TypeNames.LOAD_ORDERS;
    payload: PayloadTypes[TypeNames.LOAD_ORDERS];
  },
  toInsertOrder: {
    type: typeof TypeNames.LOAD_SINGLE_ORDER;
    payload: PayloadTypes[TypeNames.LOAD_SINGLE_ORDER];
  },
  toUpdateOrder: {
    type: typeof TypeNames.UPDATE_SINGLE_ORDER;
    payload: PayloadTypes[TypeNames.UPDATE_SINGLE_ORDER];
  },
  toDeleteOrder: {
    type: typeof TypeNames.REMOVE_SINGLE_ORDER;
    payload: PayloadTypes[TypeNames.REMOVE_SINGLE_ORDER];
  }
};

export type OrderActionTypes = $Values<ActionsValueTypes>