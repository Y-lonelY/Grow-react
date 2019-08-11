import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import dashBoard from './dashBoard/reducer';

let store = createStore(
    dashBoard,
    applyMiddleware(thunk)
);

export default store;