import { TypeNames } from './enums';
import { ProductActionTypes, ProductStateType } from './types';

const initialState: ProductStateType = {
  list: []
};

export const productReducer = (state = initialState, action: ProductActionTypes): ProductStateType => {
  switch (action.type) {
    case TypeNames.LOAD_PRODUCTS:
      return { ...state, list: action.payload };
    case TypeNames.UPDATE_SINGLE_PRODUCT: {
      const list = Array.from(state.list)
      const index = list.findIndex(item => item._id === action.payload._id)
      if (index > -1) {
        list.splice(index, 1, action.payload)
        return { ...state, list };
      }
    }
    case TypeNames.REMOVE_SINGLE_PRODUCT: {
      const list = Array.from(state.list)
      const index = list.findIndex(item => item._id === action.payload._id)
      if (index > -1) {
        list.splice(index, 1)
        return { ...state, list };
      }
    }
    case TypeNames.LOAD_SINGLE_PRODUCT: {
      const list = Array.from(state.list)
      const index = list.findIndex(item => item._id === action.payload._id)
      if (index > -1) {
        list.splice(index, 1, action.payload)
        return { ...state, list };
      } else {
        list.push(action.payload)
      }
      return { ...state, list };
    }
    default:
      return state;
  }
};
