import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as Exercise from '@/store/Exercise/reducer';

let store = createStore(
    combineReducers({...Exercise}),
    applyMiddleware(thunk)
);

export default store;