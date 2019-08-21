import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as dashBoard from '@/store/dashBoard/reducer';

let store = createStore(
    combineReducers({...dashBoard}),
    applyMiddleware(thunk)
);

export default store;