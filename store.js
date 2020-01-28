import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import { createWhitelistFilter } from 'redux-persist-transform-filter'
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

// TODO: 思った通りに設定できてない
// persistの設定
const persistConfig = {
  key: 'pkmzfavorite',
  storage,
  transforms: [
    createWhitelistFilter('favoriteReducer', ['favoritesPokemon'])
  ]
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
