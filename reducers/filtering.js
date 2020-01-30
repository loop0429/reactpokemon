import {
  FILTERING_TYPES, FILTERING_SERIES,
  FILTERING_FAVORITES, FILTERING_CLEAR,
  UPDATE_PAGE, RESET_PAGE
} from '../actions'
import pokedex from '../assets/pokedex.json'

export const filteringState = {
  filteredZukan: pokedex.slice(0, 35),
  selectedTypes: [],
  selectedSeries: '',
  page: 1,
  hasMore: true
}

const filteringReducer = (state = filteringState, action) => {
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
    // pageのカウントアップ
    case UPDATE_PAGE:
      const page = state.page + 1
      let end = page * 35
      let hasMore = true

      // 図鑑番号を超えたら
      if (end > pokedex.length) {
        end = pokedex.length
        hasMore = false
      }

      return {
        ...state,
        page,
        filteredZukan: pokedex.slice(0, end),
        hasMore
      }
    // pageのリセット
    case RESET_PAGE:
      return {
        ...state,
        page: 0,
        hasMore: true
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

export default filteringReducer
