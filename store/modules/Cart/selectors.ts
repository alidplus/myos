import { RootStoreType } from '../../../models/types';
import { createSelector } from 'reselect';

export const getCartsList = createSelector(
  [(state: RootStoreType) => state.cart.map],
  map => Object.values(map)
);

export const getProductCartItem = (id: string) => createSelector(
  [(state: RootStoreType) => state.cart.map, () => id],
  (map, id) => map[id]
);