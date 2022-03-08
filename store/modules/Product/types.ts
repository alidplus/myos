import { $Values } from 'utility-types';
import { TypeNames } from './enums';
import { IProduct } from 'models/types';

export type ProductStateType = {
  list: IProduct[]
};

export type PayloadTypes = {
  [TypeNames.LOAD_PRODUCTS]: IProduct[]
  [TypeNames.UPDATE_SINGLE_PRODUCT]: IProduct
  [TypeNames.LOAD_SINGLE_PRODUCT]: IProduct
  [TypeNames.REMOVE_SINGLE_PRODUCT]: IProduct
};

export type ActionsValueTypes = {
  toLoadAllProducts: {
    type: typeof TypeNames.LOAD_PRODUCTS;
    payload: PayloadTypes[TypeNames.LOAD_PRODUCTS];
  },
  toInsertProduct: {
    type: typeof TypeNames.LOAD_SINGLE_PRODUCT;
    payload: PayloadTypes[TypeNames.LOAD_SINGLE_PRODUCT];
  },
  toUpdateProduct: {
    type: typeof TypeNames.UPDATE_SINGLE_PRODUCT;
    payload: PayloadTypes[TypeNames.UPDATE_SINGLE_PRODUCT];
  },
  toDeleteProduct: {
    type: typeof TypeNames.REMOVE_SINGLE_PRODUCT;
    payload: PayloadTypes[TypeNames.REMOVE_SINGLE_PRODUCT];
  }
};

export type ProductActionTypes = $Values<ActionsValueTypes>