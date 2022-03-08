import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './modules';
import { composeWithDevTools } from '@redux-devtools/extension';

const composeEnhancers = composeWithDevTools({
});


const combinedRedusers = combineReducers({ ...reducers });
const configureStore = createStore(combinedRedusers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default configureStore;