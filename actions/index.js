export const SHOW_FEATURE_MODAL = 'SHOW_FEATURE_MODAL'
export const SHOW_WEAKREGIST_MODAL = 'SHOW_WEAKREGIST_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR'
export const TOGGLE_FAVARITE = 'TOGGLE_FAVARITE'
export const FILTERING_TYPES = 'FILTERING_TYPES'
export const FILTERING_SERIES = 'FILTERING_SERIES'
export const FILTERING_CLEAR = 'FILTERING_CLEAR'

export const showFeatureModal = () => ({
  type: SHOW_FEATURE_MODAL,
  content: 'FEATURE'
})

export const showWeakResistModal = (index) => ({
  type: SHOW_WEAKREGIST_MODAL,
  payload: {
    content: 'WEAK_RESIST',
    index
  }
})

export const hideModal = () => ({
  type: HIDE_MODAL
})

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR
})

export const toggleFavarite = (no) => ({
  type: TOGGLE_FAVARITE,
  no
})

export const filteringTypes = (pokeType) => ({
  type: FILTERING_TYPES,
  pokeType
})

export const filteringSeries = (series) => ({
  type: FILTERING_SERIES,
  series
})

export const filteringClear = () => ({
  type: FILTERING_CLEAR
})
