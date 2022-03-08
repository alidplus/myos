import { TypeNames } from './enums';
import { OrderActionTypes, OrderStateType } from './types';

const initialState: OrderStateType = {
  list: []
};

export const orderReducer = (state = initialState, action: OrderActionTypes): OrderStateType => {
  switch (action.type) {
    case TypeNames.LOAD_ORDERS:
      return { ...state, list: action.payload };
    case TypeNames.UPDATE_SINGLE_ORDER: {
      const list = Array.from(state.list)
      const index = list.findIndex(item => item._id === action.payload._id)
      if (index > -1) {
        list.splice(index, 1, action.payload)
        return { ...state, list };
      }
    }
    case TypeNames.REMOVE_SINGLE_ORDER: {
      const list = Array.from(state.list)
      const index = list.findIndex(item => item._id === action.payload._id)
      if (index > -1) {
        list.splice(index, 1)
        return { ...state, list };
      }
    }
    case TypeNames.LOAD_SINGLE_ORDER: {
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
