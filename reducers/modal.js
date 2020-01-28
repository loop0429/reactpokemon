import { SHOW_FEATURE_MODAL, SHOW_WEAKREGIST_MODAL, HIDE_MODAL } from '../actions'
import weakResistDex from '../assets/weak_resist.json'
import pokedex from '../assets/pokedex.json'

export const modalState = {
  isOpenModal: false,
  switchModalContent: '',
  weakResist: {}
}

const modalReducer = (state = modalState, action) => {
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

export default modalReducer
