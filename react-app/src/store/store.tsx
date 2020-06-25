import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as goalListData from '@/store/Exercise/reducer'

const store = createStore(
  combineReducers({ ...goalListData }),
  applyMiddleware(thunk)
)

export default store
