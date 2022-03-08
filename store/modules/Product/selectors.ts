import { RootStoreType } from '../../../models/types';
import { createSelector } from 'reselect';

export const getProductsList = createSelector(
  [(state: RootStoreType) => state.product.list],
  list => list
);
export const getProduct = (id: string) => createSelector(
  [(state: RootStoreType) => state.product.list, () => id],
  (list, id) => list.find(product => product._id === id)
);