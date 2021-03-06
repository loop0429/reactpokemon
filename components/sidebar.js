import React, { useState } from 'react'
import { Collapse } from 'react-collapse'
import { useSelector, useDispatch } from 'react-redux'
import {
  toggleSidebar, filteringFavorites,
  filteringTypes, filteringSeries,
  filteringClear
} from '../actions'
import { TYPES, SERIES } from '../assets/constans'

const useSidebar = () => {
  // state
  const isOpenSidebar = useSelector((state) => state.sidebarReducer.isOpenSidebar)
  const selectedTypes = useSelector((state) => state.filteringReducer.selectedTypes)
  const selectedSeries = useSelector((state) => state.filteringReducer.selectedSeries)
  const favoritesPokemon = useSelector((state) => state.favoriteReducer.favoritesPokemon)

  const dispatch = useDispatch()

  // 背景のoverlay押下時
  const handleOverlayClick = () => {
    dispatch(toggleSidebar())
  }

  // 「お気に入りポケモンで絞り込み」押下時
  const handleFilterFavoritesClick = () => {
    dispatch(filteringFavorites(favoritesPokemon))
  }

  // 「タイプで絞り込み」押下時
  const handleFilterTypeClick = (type) => {
    dispatch(filteringTypes(type))
  }

  // 「シリーズで絞り込み」押下時
  const handleFilterSeriesClick = (series) => {
    dispatch(filteringSeries(series))
  }

  // 「選択をクリア」押下時
  const handleFilterClearClick = () => {
    dispatch(filteringClear())
  }

  return {
    isOpenSidebar, selectedTypes,
    selectedSeries, handleOverlayClick,
    handleFilterFavoritesClick, handleFilterTypeClick,
    handleFilterSeriesClick, handleFilterClearClick
  }
}

const useCollapse = () => {
  // collapseの開閉状態
  // types: タイプで絞り込み / series: シリーズで絞り込み
  const isCollapseOpened = {
    types: false,
    series: false
  }

  const initialStyle = {
    height: '0px',
    overflow: 'hidden'
  }

  // stateの設定
  // cf., https://ja.reactjs.org/docs/hooks-state.html
  const [isOpened, setCollapseOpened] = useState(isCollapseOpened)

  // collapseのトグル
  const toggleCollapse = (e) => {
    const payload = {}
    Object.keys(isOpened).forEach((key) => {
      // 選択したものなら、Booleanをtoggle。選択したものでなければ閉じる（閉じてても閉じる）
      payload[key] = e === key ? !isOpened[e] : false
    })

    setCollapseOpened(payload)
  }

  return { initialStyle, isOpened, toggleCollapse }
}

const Sidebar = () => {
  const {
    isOpenSidebar, selectedTypes,
    selectedSeries, handleOverlayClick,
    handleFilterFavoritesClick, handleFilterTypeClick,
    handleFilterSeriesClick, handleFilterClearClick
  } = useSidebar()

  const { initialStyle, isOpened, toggleCollapse } = useCollapse()

  // isOpenSidebar: trueならサイドバーを表示させる
  let sidebarClass = 'sidebar'
  if (isOpenSidebar === true) {
    sidebarClass = `${sidebarClass} is-open`
  }

  return (
    <div className={sidebarClass}>
      <div className="sidebar__overlay" onClick={() => {handleOverlayClick()}} />
      <div className="sidebar__wrapper">
        <dl className="m-0">
          <dt className="p-2 bg-gray-200">絞り込み検索</dt>
          <dd className="text-sm">
            <button
              className="block w-full p-2 bg-blue-600 text-white text-left btn-filter"
              type="button"
              onClick={() => {handleFilterFavoritesClick()}}
            >
              お気に入りポケモンで絞り込み
            </button>
          </dd>
          <dd className="text-sm">
            <button
              className="block w-full p-2 bg-blue-600 text-white text-left btn-filter"
              type="button"
              onClick={() => {toggleCollapse('types')}}
            >
              タイプで絞り込み
            </button>
            <Collapse isOpened={isOpened.types} initialStyle={initialStyle}>
              <ul className="filter-child__list">
                {TYPES.map((item) => {
                  // タイプ一覧の表示
                  return (
                    <li key={item.en} className="filter-child__item">
                      <button
                        className={selectedTypes.includes(item.en) ?
                          "relative w-full bg-gray-200 filter-child__btn" :
                          "relative w-full filter-child__btn"
                        }
                        type="button"
                        onClick={() => {handleFilterTypeClick(item.en)}}
                      >
                        <div className="relative flex items-center p-2 z-10">
                          <img
                            className="mr-1"
                            src={`/static/img/icon/type-${item.en}.png`}
                            width="15"
                          />
                          {item.ja}
                        </div>
                      </button>
                    </li>
                  )
                })}
                <li>
                  <button
                    className="w-full p-2 bg-gray-200 text-left btn-clear-filter"
                    type="button"
                    onClick={() => {handleFilterClearClick()}}
                  >
                    選択をクリア
                  </button>
                </li>
              </ul>
            </Collapse>
          </dd>
          <dd className="text-sm">
            <button
              className="block w-full p-2 bg-blue-600 text-white text-left btn-filter"
              type="button"
              onClick={() => {toggleCollapse('series')}}
            >
              シリーズで絞り込み
            </button>
            <Collapse isOpened={isOpened.series} initialStyle={initialStyle}>
              <ul className="filter-child__list">
                {SERIES.map((item) => {
                  // シリーズ一覧の表示
                  return (
                    <li key={item.numbers} className="filter-child__item">
                      <button
                        className={selectedSeries === item.numbers ?
                          "relative w-full bg-gray-200 filter-child__btn" :
                          "relative w-full filter-child__btn"
                        }
                        type="button"
                        onClick={() => {handleFilterSeriesClick(item.numbers)}}
                      >
                        <div className="relative flex items-center p-2 z-10">{item.area}</div>
                      </button>
                    </li>
                  )
                })}
                <li>
                  <button
                    className="w-full p-2 bg-gray-200 text-left btn-clear-filter"
                    type="button"
                    onClick={() => {handleFilterClearClick()}}
                  >
                    選択をクリア
                  </button>
                </li>
              </ul>
            </Collapse>
          </dd>
        </dl>
      </div>
      <style jsx>{`
        .sidebar__wrapper {
          position: fixed;
          left: -250px;
          top: 0;
          overflow-y: scroll;
          width: 250px;
          height: 100%;
          background: #FFF;
          transition: all 0.3s ease-in-out;
          z-index: 50;
        }
        .sidebar__overlay {
          position: fixed;
          top: 0;
          display: none;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0);
          transition: all 0.3s ease-in-out;
          z-index: 49;
        }
        .sidebar.is-open .sidebar__wrapper {
          transform: translateX(250px);
        }
        .sidebar.is-open .sidebar__overlay {
          display: block;
          background: rgba(0, 0, 0, .5);
        }
        .filter-child__item {
          border-bottom: 1px solid #e2e8f0;
        }
        .filter-child__btn:after {
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 100%;
          background: #edf2f7;
          content: "";
          z-index: 9;
          transition: width 0.2s ease-in-out;
        }
        .filter-child__btn:hover:after {
          width: 100%;
        }
        .filter-child__btn:focus {
          outline: none;
        }
        .btn-filter {
          margin-bottom: 1px;
          transition: opacity 0.2s ease-in-out;
        }
        .btn-filter:hover {
          opacity: 0.7;
        }
        .btn-filter:focus {
          outline: none;
        }
        .btn-clear-filter {
          transition: opacity 0.2s ease-in-out;
        }
        .btn-clear-filter:hover {
          opacity: 0.7;
        }
        .btn-clear-filter:focus {
          outline: none;
        }
      `}</style>
    </div>
  )
}

export default Sidebar
