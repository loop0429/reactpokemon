import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  SHOW_FEATURE_MODAL, SHOW_WEEKREGIST_MODAL,
  HIDE_MODAL, TOGGLE_SIDEBAR,
  TOGGLE_FAVARITE, FILTERING_TYPES,
  FILTERING_SERIES, FILTERING_CLEAR
} from './actions'
import pokedex from './pokedex.json'
import weekResistDex from './weak_resist.json'

const initialState = {
  isOpenModal: false,
  switchModalContent: '',
  isOpenSidebar: false,
  favoritesPokemon: [],
  weekResist: {},
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
      const weekResist = calcWeekRegist(action.payload.index)
      return {
        ...state,
        isOpenModal: true,
        switchModalContent: action.payload.content,
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

const calcWeekRegist = (index) => {
  const pokemonData = pokedex[index]
  const types = pokemonData.type
  const wsData = {}

  // タイプの数だけ回す
  types.forEach((type) => {
    const typeData = weekResistDex[type]

    // すでにwsDataに登録されていたら、すでに登録されているものを±して計算

    // 弱点
    const weeks = typeData.week
    weeks.forEach((week) => {
      wsData[week] = (wsData[week]) ? wsData[week] + 1 : 1
    })

    // 耐性
    const resists = typeData.resistance
    resists.forEach((resist) => {
      wsData[resist] = (wsData[resist]) ? wsData[resist] - 1 : -1
    })

    // 無効※ポケGoでは二重耐性
    const noEffects = typeData.no_effect
    noEffects.forEach((noEffect) => {
      wsData[noEffect] = (wsData[noEffect]) ? wsData[noEffect] - 1 : -1
    })
  })

  const payload = {
    week2: {
      name: '二重弱点',
      types: []
    },
    week1: {
      name: '弱点',
      types: []
    },
    resist1: {
      name: '耐性',
      types: []
    },
    resist2: {
      name: '二重耐性',
      types: []
    },
    resist3: {
      name: '三重耐性',
      types: []
    }
  }

  Object.keys(wsData).forEach((type) => {
    const data = {
      type: weekResistDex[type].ja,
      img: `/static/img/icon/type-${type}.png`
    }

    switch (wsData[type]) {
      // 二重弱点
      case 2:
        payload.week2.types.push(data)
        break
      // 弱点
      case 1:
        payload.week1.types.push(data)
        break
      // 耐性
      case -1:
        payload.resist1.types.push(data)
        break
      // 二重耐性
      case -2:
        payload.resist2.types.push(data)
        break
      // 三重耐性
      case -3:
        payload.resist3.types.push(data)
        break
    }
  })

  return payload
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
  let filtered = []
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

      filtered = filteringTypes(types)
      return {
        ...state,
        selectedTypes: types,
        selectedSeries: '',
        filteredZukan: filtered
      }
    case FILTERING_SERIES:
      const selectedSeries = action.series
      filtered = filteringSeries(selectedSeries)
      return {
        ...state,
        selectedTypes: [],
        selectedSeries,
        filteredZukan: filtered
      }
    case FILTERING_CLEAR:
      return {
        ...state,
        selectedTypes: [],
        selectedSeries: '',
        filteredZukan: filtered
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
