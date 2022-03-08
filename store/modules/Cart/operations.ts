import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IOrder, RootStoreType } from '../../../models/types';
import { CartActionTypes } from './types';
import { toClearCart } from './actions';
  
export const submitOrder: ActionCreator<ThunkAction<Promise<Action>, RootStoreType, void, any>> =
  (order: IOrder) => async (dispatch: Dispatch<CartActionTypes>): Promise<Action> => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...order })
    };
    const result = await fetch(`/api/orders`, requestOptions);
    return dispatch(toClearCart());
  }
  