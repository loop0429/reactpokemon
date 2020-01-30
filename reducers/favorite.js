import { TOGGLE_FAVORITE } from '../actions'

export const favoriteState = {
  favoritesPokemon: []
}

const favoriteReducer = (state = favoriteState, action) => {
  switch (action.type) {
    // お気に入りのトグル
    case TOGGLE_FAVORITE:
      let favorites = state.favoritesPokemon.slice()

      // favoritesPokemonにすでに同一のidが含まれているなら、そのidを除外。そうでなければidを追加。
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

export default favoriteReducer
