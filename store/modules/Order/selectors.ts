import { RootStoreType } from '../../../models/types';
import { createSelector } from 'reselect';

export const getOrder = (id: string) => createSelector(
  [
    (state: RootStoreType) => state.order.list,
    (state: RootStoreType) => state.product.list,
    () => id
  ],
  (list, products, id) => {
    let order = list.find(order => order._id === id)
    if (order) {
      order.cart = order.cart.map(cart => ({
        ...cart,
        product: {
          ...products.find(p => p._id === cart.product._id),
          ...cart.product
        }
      }))
    }
    return order
  }
);

export const getOrdersList = createSelector(
  [
    (state: RootStoreType) => state.order.list,
    (state: RootStoreType) => state
  ],
  (orders, state) => orders.map(order => getOrder(order._id)(state))
);