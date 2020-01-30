import {
  FILTERING_TYPES, FILTERING_SERIES,
  FILTERING_FAVORITES, FILTERING_CLEAR,
  UPDATE_PAGE
} from '../actions'
import pokedex from '../assets/pokedex.json'

// 増加量
const INCREASE = 35

export const filteringState = {
  filteredZukan: pokedex.slice(0, INCREASE),
  rowZukan: pokedex,
  selectedTypes: [],
  selectedSeries: '',
  page: 1,
  hasMore: true
}

const filteringReducer = (state = filteringState, action) => {
  let rowZukan = []
  let page = 1
  let end = 1
  let hasMore = true
  let payload = {}

  switch (action.type) {
    // タイプで絞り込み
    case FILTERING_TYPES:
      let types = state.selectedTypes.slice()

      // selectedTypesにすでに同一のtypeが含まれているなら、そのtypeを除外。そうでなければtypeを追加。
      if (types.includes(action.pokeType)) {
        types = state.selectedTypes.filter((type) => {
          return type !== action.pokeType
        })
      } else {
        types.push(action.pokeType)
      }

      // typesが空でなければtypesから一致するポケモンデータを返してもらう。空ならpokedexの全データを使用する。
      rowZukan = types.length > 0 ? filteringTypes(types) : pokedex

      // inifite scroll対応
      payload = checkFilteredData(rowZukan)

      return {
        ...state,
        selectedTypes: types,
        selectedSeries: '',
        filteredZukan: payload.zukan,
        rowZukan,
        page: 1,
        hasMore: payload.hasMore
      }
    // シリーズで絞り込み
    case FILTERING_SERIES:
      const selectedSeries = action.series

      // 選択したシリーズから一致するポケモンデータを返してもらう
      rowZukan = filteringSeries(selectedSeries)

      // inifite scroll対応
      payload = checkFilteredData(rowZukan)

      return {
        ...state,
        selectedTypes: [],
        selectedSeries,
        filteredZukan: payload.zukan,
        rowZukan,
        page: 1,
        hasMore: payload.hasMore
      }
    // お気に入りポケモンで絞り込み
    case FILTERING_FAVORITES:
      const favoritesPokemon = action.favoritesPokemon

      // お気に入り登録されているidから一致するポケモンデータを返してもらう
      rowZukan = filteringFavorites(favoritesPokemon)

      // inifite scroll対応
      payload = checkFilteredData(rowZukan)

      return {
        ...state,
        selectedTypes: [],
        selectedSeries: '',
        filteredZukan: payload.zukan,
        rowZukan,
        page: 1,
        hasMore: payload.hasMore
      }
    // 選択をクリア
    case FILTERING_CLEAR:
      return {
        ...state,
        selectedTypes: [],
        selectedSeries: '',
        filteredZukan: pokedex.slice(0, INCREASE),
        rowZukan: pokedex,
        page: 1,
        hasMore: true
      }
    // pageのカウントアップ
    case UPDATE_PAGE:
      page = state.page + 1
      end = page * INCREASE
      hasMore = true

      // rowZukanの件数を超えたら、infinite scrollを停止させる
      if (end > state.rowZukan.length) {
        end = state.rowZukan.length
        hasMore = false
      }

      return {
        ...state,
        page,
        filteredZukan: state.rowZukan.slice(0, end),
        hasMore
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

// お気に入りidに一致するポケモンを抽出する
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

// 絞り込みかけられたdataからinfinite scroller稼働の可否を精査
const checkFilteredData = (data) => {
  const payload = {
    hasMore: false,
    zukan: data
  }

  // データ件数が35件超えてるかを判別
  if (data.length > INCREASE) {
    payload.hasMore = true
    payload.zukan = data.slice(0, INCREASE)
  }

  return payload
}

export default filteringReducer
