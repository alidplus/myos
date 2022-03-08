import { TypeNames } from './enums';
import { CartActionTypes, PayloadTypes } from './types';

export const toAddToCart =
( payload: PayloadTypes[TypeNames.CART_ADD] ): CartActionTypes => ({
  type: TypeNames.CART_ADD,
  payload
});

export const toRemoveFromCart =
( payload: PayloadTypes[TypeNames.CART_REMOVE] ): CartActionTypes => ({
  type: TypeNames.CART_REMOVE,
  payload
});

export const toClearCart =
(): CartActionTypes => ({
  type: TypeNames.CART_CLEAR
});