import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  SHOW_FEATURE_MODAL, SHOW_WEAKREGIST_MODAL,
  HIDE_MODAL, TOGGLE_SIDEBAR,
  TOGGLE_FAVARITE, FILTERING_TYPES,
  FILTERING_SERIES, FILTERING_CLEAR
} from './actions'
import pokedex from './pokedex.json'
import weakResistDex from './weak_resist.json'

const initialState = {
  isOpenModal: false,
  switchModalContent: '',
  isOpenSidebar: false,
  favoritesPokemon: [],
  weakResist: {},
  filteredZukan: pokedex,
  selectedTypes: [],
  selectedSeries: ''
}

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_FEATURE_MODAL:
      return {
        ...state,
        isOpenModal: true,
        switchModalContent: action.content,
        weakResist: {}
      }
    case SHOW_WEAKREGIST_MODAL:
      const weakResist = calcWeakRegist(action.payload.index)
      return {
        ...state,
        isOpenModal: true,
        switchModalContent: action.payload.content,
        weakResist
      }
    case HIDE_MODAL:
      return {
        ...state,
        isOpenModal: false,
        weakResist: {}
      }
    default:
      return state
  }
}

const calcWeakRegist = (index) => {
  const pokemonData = pokedex[index]
  const types = pokemonData.type
  const wsData = {}

  // タイプの数だけ回す
  types.forEach((type) => {
    const typeData = weakResistDex[type]

    // すでにwsDataに登録されていたら、すでに登録されているものを±して計算

    // 弱点
    const weaks = typeData.weak
    weaks.forEach((weak) => {
      wsData[weak] = (wsData[weak]) ? wsData[weak] + 1 : 1
    })

    // 耐性
    const resists = typeData.resistance
    resists.forEach((resist) => {
      wsData[resist] = (wsData[resist]) ? wsData[resist] - 1 : -1
    })

    // 無効※ポケGoでは二重耐性
    const noEffects = typeData.no_effect
    noEffects.forEach((noEffect) => {
      wsData[noEffect] = (wsData[noEffect]) ? wsData[noEffect] - 2 : -2
    })
  })

  const payload = {
    weak2: {
      name: '二重弱点',
      types: []
    },
    weak1: {
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
      type: weakResistDex[type].ja,
      img: `/static/img/icon/type-${type}.png`
    }

    switch (wsData[type]) {
      // 二重弱点
      case 2:
        payload.weak2.types.push(data)
        break
      // 弱点
      case 1:
        payload.weak1.types.push(data)
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
          return pokemon !== action.pokeType
        })
      } else {
        types.push(action.pokeType)
      }

      filtered = filteringTypes(types)

      // データが空ならpokedex.jsonの全データを使用する
      if (filtered.length === 0) {
        filtered = pokedex
      }

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
        filteredZukan: pokedex
      }
    default:
      return state
  }
}

const sortPokemonList = (list) => {
  list.sort((a, b) => {
    if(a.id > b.id) return 1
    if(a.id < b.id) return -1
    return 0
  })

  return list
}

const filteringTypes = (data) => {
  const dummyData = []
  data.forEach((type) => {
    pokedex.forEach((pokemon) => {
      if(pokemon.type.includes(type)) {
        dummyData.push(pokemon)
      }
    })
  })

  // 重複するデータを削除
  const payload = dummyData.filter((value, index, self) => {
    return self.indexOf(value) === index
  })

  // ソート実行したものを返す
  return sortPokemonList(payload)
}

const filteringSeries = (data) => {
  const splitId = data.split('-')
  const start = Number(splitId[0]) - 1
  const end = Number(splitId[1]) - 1

  return pokedex.slice(start, end)
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
