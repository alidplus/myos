import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IOrder, RootStoreType } from '../../../models/types';
import { OrderActionTypes } from './types';
import { toLoadAllOrders, toLoadSingleOrder, toUpdateOrder, toDeleteOrder } from './actions';

export const loadAllOrders: ActionCreator<ThunkAction<Promise<Action>, RootStoreType, void, any>> =
  () => async (dispatch: Dispatch<OrderActionTypes>): Promise<Action> => {
    const result = await fetch('/api/orders', { method: 'GET' });
    const orders = await result.json();
    return dispatch(toLoadAllOrders(orders));
  };

export const loadSingleOrder: ActionCreator<ThunkAction<Promise<Action>, RootStoreType, void, any>> =
  (id: string) => async (dispatch: Dispatch<OrderActionTypes>): Promise<Action> => {
    const result = await fetch('/api/orders/' + id, { method: 'GET' });
    const orders = await result.json();
    return dispatch(toLoadSingleOrder(orders));
  };

export const updateOrder: ActionCreator<ThunkAction<Promise<Action>, RootStoreType, void, any>> =
  (order: IOrder, update: Partial<IOrder>) => async (dispatch: Dispatch<OrderActionTypes>): Promise<Action> => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...update })
    };
    const result = await fetch(`/api/order/${order._id}`, requestOptions);
    const orders = await result.json();
    return dispatch(toUpdateOrder(orders));
  };

export const createOrder: ActionCreator<ThunkAction<Promise<Action>, RootStoreType, void, any>> =
  (data: Partial<IOrder>) => async (dispatch: Dispatch<OrderActionTypes>): Promise<Action> => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data })
    };
    const result = await fetch(`/api/orders`, requestOptions);
    const order = await result.json();
    return dispatch(toUpdateOrder(order));
  };
export const removeOrder: ActionCreator<ThunkAction<Promise<Action>, RootStoreType, void, any>> =
  (target: IOrder) => async (dispatch: Dispatch<OrderActionTypes>): Promise<Action> => {
    const result = await fetch(`/api/order/${target._id}`, { method: 'DELETE' });
    const order: IOrder = await result.json();
    return dispatch(toDeleteOrder(order));
  };

    

  