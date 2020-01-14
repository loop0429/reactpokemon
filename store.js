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
      return tickReduce(state, action)
    case 'INCREMENT':
      return incrementReduce(state, action)
    case 'DECREMENT':
      return decrementReduce(state, action)
    case 'RESET':
      return resetReduce(state, action)
    case 'MODAL':
      return modalReduce(state, action)
    case 'MODAL2':
      return modalReduce2(state, action)
    default:
      return state
  }
}

const tickReduce = (state, action) => {
  return {
    ...state,
    lastUpdate: action.lastUpdate,
    light: !!action.light,
  }
}

const incrementReduce = (state, action) => {
  return {
    ...state,
    count: state.count + 1,
  }
}

const decrementReduce = (state, action) => {
  return {
    ...state,
    count: state.count - 1,
  }
}

const resetReduce = (state, action) => {
  return {
    ...state,
    count: initialState.count,
  }
}

const modalReduce = (state, action) => {
  state.isShowModal = !state.isShowModal
  state.isFeature = false
  return {
    ...state,
    isShowModal: state.isShowModal,
    isFeature: state.isFeature
  }
}

const modalReduce2 = (state, action) => {
  state.isShowModal = !state.isShowModal
  state.isFeature = true
  return {
    ...state,
    isShowModal: state.isShowModal,
    isFeature: state.isFeature
  }
}

export const doModal = (text) => ({
  type: 'MODAL',
  text
})

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}
