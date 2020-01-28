import { TOGGLE_SIDEBAR } from '../actions'

export const sidebarState = {
  isOpenSidebar: false
}

const sidebarReducer = (state = sidebarState, action) => {
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

export default sidebarReducer
