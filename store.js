import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  isSidebarOpen: false,
  isShowModal: false,
  isFeature: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      }
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      }
    case 'RESET':
      return {
        ...state,
        count: initialState.count,
      }
    case 'MODAL':
      state.isShowModal = !state.isShowModal
      state.isFeature = false
      return {
        ...state,
        isShowModal: state.isShowModal,
        isFeature: state.isFeature
      }
    case 'MODAL2':
      state.isShowModal = !state.isShowModal
      state.isFeature = true
      return {
        ...state,
        isShowModal: state.isShowModal,
        isFeature: state.isFeature
      }
    default:
      return state
  }
}

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}
