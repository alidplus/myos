import { TypeNames } from './enums';
import { CartActionTypes, CartStateType } from './types';

const initialState: CartStateType = {
  map: {}
};

export const cartReducer = (state = initialState, action: CartActionTypes): CartStateType => {
  switch (action.type) {
    case TypeNames.CART_CLEAR: {
      return { map: {} };
    }
    case TypeNames.CART_ADD: {
      const productId = action.payload._id
      if (!state.map[productId]) {
        state.map[productId] = { count: 0, product: { ...action.payload } }
      }
      state.map[productId] = { ...state.map[productId], count: state.map[productId].count + 1 }
      return { ...state, map: { ...state.map } };
    }
    case TypeNames.CART_REMOVE: {
      const productId = action.payload._id
      if (state.map[productId]) {
        state.map[productId] = { ...state.map[productId], count: state.map[productId].count - 1 }
        if (state.map[productId].count < 1) delete state.map[productId]
        return { ...state, map: { ...state.map } };
      }
      return state
    }
    default:
      return state;
  }
};
