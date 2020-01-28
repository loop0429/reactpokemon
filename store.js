import { combineReducers, createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import { createWhitelistFilter } from 'redux-persist-transform-filter'
import storage from 'redux-persist/lib/storage'
import {
  SHOW_FEATURE_MODAL, SHOW_WEAKREGIST_MODAL,
  HIDE_MODAL, TOGGLE_SIDEBAR,
  TOGGLE_FAVARITE, FILTERING_TYPES,
  FILTERING_SERIES, FILTERING_FAVORITES,
  FILTERING_CLEAR
} from './actions'
import pokedex from './assets/pokedex.json'
import weakResistDex from './assets/weak_resist.json'

// state
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

// モーダル関係のreducer
const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    // 機能紹介のモーダル
    case SHOW_FEATURE_MODAL:
      return {
        ...state,
        isOpenModal: true,
        switchModalContent: action.content,
        weakResist: {}
      }
    // 弱点耐性表のモーダル
    case SHOW_WEAKREGIST_MODAL:
      // 弱点耐性のオブジェクトを作ってもらう
      const weakResist = calcWeakRegist(action.payload.id)
      return {
        ...state,
        isOpenModal: true,
        switchModalContent: action.payload.content,
        weakResist
      }
    // モーダルを非表示
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

// 弱点耐性の計算
const calcWeakRegist = (id) => {
  // pokedexから該当のポケモンを取得
  const pokemonData = pokedex.find((pokemon) => {
    return pokemon.id === id
  })

  const types = pokemonData.type
  const wsData = {}

  // タイプの数だけ回す
  types.forEach((type) => {
    // weakResistDexから弱点・耐性のデータを取得
    const typeData = weakResistDex[type]

    // すでにwsDataに登録されていたら、登録されているものを±して計算
    // 弱点
    typeData.weak.forEach((weak) => {
      wsData[weak] = (wsData[weak]) ? wsData[weak] + 1 : 1
    })

    // 耐性
    typeData.resistance.forEach((resist) => {
      wsData[resist] = (wsData[resist]) ? wsData[resist] - 1 : -1
    })

    // 無効※ポケGoでは二重耐性
    typeData.no_effect.forEach((noEffect) => {
      wsData[noEffect] = (wsData[noEffect]) ? wsData[noEffect] - 2 : -2
    })
  })

  // 先に型を用意
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

  // wsDataに登録されてる内容から、弱点耐性の振り分け
  Object.keys(wsData).forEach((type) => {
    // 画像ファイルと日本語名
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

// サイドバー関係のreducer
const sidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    // サイドバーのトグル
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        isOpenSidebar: !state.isOpenSidebar
      }
    default:
      return state
  }
}

// お気に入り関係のreducer
const favariteReducer = (state = initialState, action) => {
  switch (action.type) {
    // お気に入りのトグル
    case TOGGLE_FAVARITE:
      let favorites = state.favoritesPokemon.slice()

      // favoritesPokemonにすでに同一のidが含まれているなら、そのidを除外
      // そうでなければidを追加
      if (favorites.includes(action.id)) {
        favorites = state.favoritesPokemon.filter((pokemon) => {
          return pokemon !== action.id
        })
      } else {
        favorites.push(action.id)
      }

      return {
        ...state,
        favoritesPokemon: favorites
      }
    default:
      return state
  }
}

// フィルタリング関係のreducer
const filteringReducer = (state = initialState, action) => {
  let filtered = []
  switch (action.type) {
    // タイプで絞り込み
    case FILTERING_TYPES:
      let types = state.selectedTypes.slice()

      // selectedTypesにすでに同一のtypeが含まれているなら、そのtypeを除外
      // そうでなければtypeを追加
      if (types.includes(action.pokeType)) {
        types = state.selectedTypes.filter((type) => {
          return type !== action.pokeType
        })
      } else {
        types.push(action.pokeType)
      }

      // typesが空でなければtypesから一致するポケモンデータを返してもらう
      // 空ならpokedexの全データを使用する
      filtered = types.length > 0 ? filteringTypes(types) : pokedex

      return {
        ...state,
        selectedTypes: types,
        selectedSeries: '',
        filteredZukan: filtered
      }
    // シリーズで絞り込み
    case FILTERING_SERIES:
      const selectedSeries = action.series

      // 選択したシリーズから一致するポケモンデータを返してもらう
      filtered = filteringSeries(selectedSeries)

      return {
        ...state,
        selectedTypes: [],
        selectedSeries,
        filteredZukan: filtered
      }
    // お気に入りポケモンで絞り込み
    case FILTERING_FAVORITES:
      const favoritesPokemon = action.favoritesPokemon

      // お気に入り登録されているidから一致するポケモンデータを返してもらう
      filtered = filteringFavorites(favoritesPokemon)

      return {
        ...state,
        selectedTypes: [],
        selectedSeries: '',
        filteredZukan: filtered
      }
    // 選択をクリア
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

// ポケモンをid順で並び替え
const sortPokemonList = (list) => {
  list.sort((a, b) => {
    if(a.id > b.id) return 1
    if(a.id < b.id) return -1
    return 0
  })

  return list
}

// タイプに一致するポケモンを抽出する
const filteringTypes = (data) => {
  // タイプに一致するポケモンを配列に入れる
  // 重複する可能性があるので、とりあえず仮データとして扱う
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

  // id順にソートしたデータを返す
  return sortPokemonList(payload)
}

// シリーズに一致するポケモンを抽出する
const filteringSeries = (data) => {
  // dataは'1-151'のような形式で渡ってくるので、'-'で区切る
  const splitId = data.split('-')

  // splitId[0]を開始点、splitId[1]を終了点とする
  // -1してるのは実際はindex値で検索するので番地が一つずれるため
  const start = Number(splitId[0]) - 1
  const end = Number(splitId[1]) - 1

  // pokedexからstart〜endの配列を抜き取って返す
  return pokedex.slice(start, end)
}

// お気に入りに入ってるidに一致するポケモンを抽出する
const filteringFavorites = (data) => {
  const payload = []

  data.forEach((id) => {
    pokedex.forEach((pokemon) => {
      if (pokemon.id.includes(id)) {
        payload.push(pokemon)
      }
    })
  })

  // id順にソートしたデータを返す
  return sortPokemonList(payload)
}

// TODO: 思った通りに設定できてない
// persistの設定
const persistConfig = {
  key: 'pkmzfavorite',
  storage,
  transforms: [
    createWhitelistFilter('favariteReducer', ['favoritesPokemon'])
  ]
}

// reducerを一つにまとめる
const reducer = combineReducers({
  modalReducer,
  sidebarReducer,
  favariteReducer,
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
