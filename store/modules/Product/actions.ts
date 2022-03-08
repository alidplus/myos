import { TypeNames } from './enums';
import { ProductActionTypes, PayloadTypes } from './types';

export const toLoadAllProducts =
( payload: PayloadTypes[TypeNames.LOAD_PRODUCTS] ): ProductActionTypes => ({
  type: TypeNames.LOAD_PRODUCTS,
  payload
});

export const toLoadSingleProduct =
( payload: PayloadTypes[TypeNames.LOAD_SINGLE_PRODUCT] ): ProductActionTypes => ({
  type: TypeNames.LOAD_SINGLE_PRODUCT,
  payload
});

export const toUpdateProduct =
( payload: PayloadTypes[TypeNames.UPDATE_SINGLE_PRODUCT] ): ProductActionTypes => ({
  type: TypeNames.UPDATE_SINGLE_PRODUCT,
  payload
});

export const toInsertProduct =
( payload: PayloadTypes[TypeNames.LOAD_SINGLE_PRODUCT] ): ProductActionTypes => ({
  type: TypeNames.LOAD_SINGLE_PRODUCT,
  payload
});

export const toDeleteProduct = 
( payload: PayloadTypes[TypeNames.REMOVE_SINGLE_PRODUCT] ): ProductActionTypes => ({
  type: TypeNames.REMOVE_SINGLE_PRODUCT,
  payload
});