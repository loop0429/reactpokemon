import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import modalReducer, { modalState } from './reducers/modal'
import sidebarReducer, { sidebarState } from './reducers/sidebar'
import favoriteReducer, { favoriteState } from './reducers/favorite'
import filteringReducer, { filteringState } from './reducers/filtering'

const initialState = {
  ...modalState,
  ...sidebarState,
  ...favoriteState,
  ...filteringState
}

// persistの設定
const persistConfig = {
  key: 'pkmzfavorite',
  storage
}

// reducerを一つにまとめる
const reducer = combineReducers({
  modalReducer,
  sidebarReducer,
  favoriteReducer,
  filteringReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}
