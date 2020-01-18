import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  SHOW_FEATURE_MODAL, SHOW_WEEKREGIST_MODAL,
  HIDE_MODAL, TOGGLE_SIDEBAR,
  TOGGLE_FAVARITE, FILTERING_TYPES,
  FILTERING_SERIES, FILTERING_CLEAR
} from './actions'

const initialState = {
  isOpenModal: false,
  switchModalContent: '',
  isOpenSidebar: false,
  selectedPokemon: 0,
  favoritesPokemon: [],
  weekResist: [],
  filteredZukan: [],
  selectedTypes: [],
  selectedSeries: ''
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FEATURE_MODAL:
      return {
        ...state,
        isOpenModal: true,
        switchModalContent: action.content
      }
    case SHOW_WEEKREGIST_MODAL:
      const payload = {
        weekResist: state.weekResist.slice(),
        no: action.payload.no
      }
      const weekResist = calcWeekRegist(payload)

      return {
        ...state,
        isOpenModal: true,
        switchModalContent: action.payload.content,
        selectedPokemon: payload.no,
        weekResist
      }
    case HIDE_MODAL:
      return {
        ...state,
        isOpenModal: false
      }
    default:
      return state
  }
}

const calcWeekRegist = (data) => {
  console.log(data)
  return []
}

const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpenSidebar: !state.isOpenSidebar
      }
    default:
      return state
  }
}

const favariteReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVARITE:
      let favorites = state.favoritesPokemon.slice()
      if (state.favoritesPokemon.includes(action.no)) {
        favorites = state.favoritesPokemon.filter((pokemon) => {
          return pokemon !== action.no
        })
      } else {
        favorites.push(action.no)
      }
      return {
        ...state,
        favoritesPokemon: favorites
      }
    default:
      return state
  }
}

const filteringReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTERING_TYPES:
      let types = state.selectedTypes.slice()
      if (state.selectedTypes.includes(action.pokeType)) {
        types = state.selectedTypes.filter((pokemon) => {
          return pokemon !== action.no
        })
      } else {
        types.push(action.type)
      }

      const filteredZukan = filteringTypes(types)
      return {
        ...state,
        selectedTypes: types,
        selectedSeries: '',
        filteredZukan
      }
    case FILTERING_SERIES:
      const selectedSeries = action.series
      const filteredZukan = filteringSeries(selectedSeries)
      return {
        ...state,
        selectedTypes: [],
        selectedSeries,
        filteredZukan
      }
    case FILTERING_CLEAR:
      return {
        ...state,
        selectedTypes: [],
        selectedSeries: '',
        filteredZukan: []
      }
    default:
      return state
  }
}

const filteringTypes = (data) => {
  console.log(data)
  return []
}

const filteringSeries = (data) => {
  console.log(data)
  return []
}

const reducer = combineReducers({
  modalReducer,
  sidebarReducer,
  favariteReducer,
  filteringReducer
})

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}
