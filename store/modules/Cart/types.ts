import { $Values } from 'utility-types';
import { TypeNames } from './enums';
import { ICart, IProduct } from 'models/types';

export type CartStateType = {
  map: Record<string, ICart>
};

export type PayloadTypes = {
  [TypeNames.CART_ADD]: IProduct
  [TypeNames.CART_REMOVE]: IProduct
};

export type ActionsValueTypes = {
  toAddToCart: {
    type: typeof TypeNames.CART_ADD;
    payload: PayloadTypes[TypeNames.CART_ADD];
  },
  toRemoveFromCart: {
    type: typeof TypeNames.CART_REMOVE;
    payload: PayloadTypes[TypeNames.CART_REMOVE];
  },
  toClearCart: {
    type: typeof TypeNames.CART_CLEAR;
  }
};

export type CartActionTypes = $Values<ActionsValueTypes>