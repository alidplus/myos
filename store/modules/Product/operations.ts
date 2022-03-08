import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IProduct, RootStoreType } from '../../../models/types';
import { ProductActionTypes } from './types';
import { toLoadAllProducts, toLoadSingleProduct, toUpdateProduct, toDeleteProduct } from './actions';

export const loadAllProducts: ActionCreator<ThunkAction<Promise<Action>, RootStoreType, void, any>> =
  () => async (dispatch: Dispatch<ProductActionTypes>): Promise<Action> => {
    const result = await fetch('/api/products', { method: 'GET' });
    const products = await result.json();
    return dispatch(toLoadAllProducts(products));
  };

export const loadSingleProduct: ActionCreator<ThunkAction<Promise<Action>, RootStoreType, void, any>> =
  (id: string) => async (dispatch: Dispatch<ProductActionTypes>): Promise<Action> => {
    const result = await fetch('/api/products/' + id, { method: 'GET' });
    const products = await result.json();
    return dispatch(toLoadSingleProduct(products));
  };

export const updateProduct: ActionCreator<ThunkAction<Promise<Action>, RootStoreType, void, any>> =
  (product: IProduct, update: Partial<IProduct>) => async (dispatch: Dispatch<ProductActionTypes>): Promise<Action> => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...update })
    };
    const result = await fetch(`/api/product/${product._id}`, requestOptions);
    const products = await result.json();
    return dispatch(toUpdateProduct(products));
  };

export const createProduct: ActionCreator<ThunkAction<Promise<Action>, RootStoreType, void, any>> =
  (data: Partial<IProduct>) => async (dispatch: Dispatch<ProductActionTypes>): Promise<Action> => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data })
    };
    const result = await fetch(`/api/products`, requestOptions);
    const product = await result.json();
    return dispatch(toUpdateProduct(product));
  };
export const removeProduct: ActionCreator<ThunkAction<Promise<Action>, RootStoreType, void, any>> =
  (target: IProduct) => async (dispatch: Dispatch<ProductActionTypes>): Promise<Action> => {
    const result = await fetch(`/api/product/${target._id}`, { method: 'DELETE' });
    const product: IProduct = await result.json();
    return dispatch(toDeleteProduct(product));
  };

    

  