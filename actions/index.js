export const SHOW_FEATURE_MODAL = 'SHOW_FEATURE_MODAL'
export const SHOW_WEAKREGIST_MODAL = 'SHOW_WEAKREGIST_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
export const FILTERING_TYPES = 'FILTERING_TYPES'
export const FILTERING_SERIES = 'FILTERING_SERIES'
export const FILTERING_FAVORITES = 'FILTERING_FAVORITES'
export const FILTERING_CLEAR = 'FILTERING_CLEAR'
export const UPDATE_PAGE = 'UPDATE_PAGE'

export const showFeatureModal = () => ({
  type: SHOW_FEATURE_MODAL,
  content: 'FEATURE'
})

export const showWeakResistModal = (id) => ({
  type: SHOW_WEAKREGIST_MODAL,
  payload: {
    content: 'WEAK_RESIST',
    id
  }
})

export const hideModal = () => ({
  type: HIDE_MODAL
})

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
})

export const toggleFavorite = (id) => ({
  type: TOGGLE_FAVORITE,
  id
})

export const filteringTypes = (pokeType) => ({
  type: FILTERING_TYPES,
  pokeType
})

export const filteringSeries = (series) => ({
  type: FILTERING_SERIES,
  series
})

export const filteringFavorites = (favoritesPokemon) => ({
  type: FILTERING_FAVORITES,
  favoritesPokemon
})

export const filteringClear = () => ({
  type: FILTERING_CLEAR
})

export const updatePage = () => ({
  type: UPDATE_PAGE
})
