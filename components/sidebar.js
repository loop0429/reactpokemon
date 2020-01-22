import React, { useState } from 'react'
import { Collapse } from 'react-collapse'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '../actions'
import { TYPES, SERIES } from '../constans'

const useSidebar = () => {
  const isOpenSidebar = useSelector((state) => state.sidebarReducer.isOpenSidebar)

  const dispatch = useDispatch()
  const handleOverlayClick = () => {
    dispatch(toggleSidebar())
  }

  return { isOpenSidebar, handleOverlayClick }
}

const Sidebar = () => {
  const { isOpenSidebar, handleOverlayClick } = useSidebar()

  let sidebarClass = 'sidebar'
  if (isOpenSidebar === true) {
    sidebarClass = `${sidebarClass} is-open`
  }

  const isCollapseOpened = {
    types: false,
    series: false
  }

  const [isOpened, setCollapseOpened] = useState(isCollapseOpened)

  const toggleCollapse = (e) => {
    const payload = {}
    Object.keys(isOpened).forEach((key) => {
      payload[key] = (e === key) ? !isOpened[e] : false
    })
    setCollapseOpened(payload)
  }

  return (
    <div className={sidebarClass}>
      <div className="sidebar__overlay" onClick={handleOverlayClick} />
      <div className="sidebar__wrapper">
        <dl className="m-0">
          <dt className="p-2 bg-gray-200">絞り込み検索</dt>
          <dd className="text-sm">
            <button className="block w-full p-2 bg-blue-600 text-white text-left btn-filter" type="button">お気に入りポケモンで絞り込み</button>
          </dd>
          <dd className="text-sm">
            <button
              className="block w-full p-2 bg-blue-600 text-white text-left btn-filter"
              type="button"
              onClick={() => {
                toggleCollapse('types')
              }}
            >
              タイプで絞り込み
            </button>
            <Collapse isOpened={isOpened.types} initialStyle={{height: '0px', overflow: 'hidden'}}>
              <ul className="filter-child__list">
                {TYPES.map((item) => {
                  return (
                    <li key={item.en} className="filter-child__item">
                      <button className="relative w-full filter-child__btn" type="button">
                        <div className="relative flex items-center p-2 z-10">
                          <img className="mr-1" src={`/static/img/icon/type-${item.en}.png`} width="15" />
                          {item.ja}
                        </div>
                      </button>
                    </li>
                  )
                })}
                <li>
                  <button className="w-full p-2 bg-gray-200 text-left btn-clear-filter" type="button">選択をクリア</button>
                </li>
              </ul>
            </Collapse>
          </dd>
          <dd className="text-sm">
            <button
              className="block w-full p-2 bg-blue-600 text-white text-left btn-filter"
              type="button"
              onClick={() => {
                toggleCollapse('series')
              }}
            >
              シリーズで絞り込み
            </button>
            <Collapse isOpened={isOpened.series} initialStyle={{height: '0px', overflow: 'hidden'}}>
              <ul className="filter-child__list">
                {SERIES.map((item) => {
                  return (
                    <li key={item.numbers} className="filter-child__item">
                      <button className="relative w-full filter-child__btn" type="button">
                        <div className="relative flex items-center p-2 z-10">
                          {item.area}
                        </div>
                      </button>
                    </li>
                  )
                })}
                <li>
                  <button className="w-full p-2 bg-gray-200 text-left btn-clear-filter" type="button">選択をクリア</button>
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
        .btn-filter {
          margin-bottom: 1px;
          transition: opacity 0.2s ease-in-out;
        }
        .btn-filter:hover {
          opacity: 0.7;
        }
        .btn-clear-filter {
          transition: opacity 0.2s ease-in-out;
        }
        .btn-clear-filter:hover {
          opacity: 0.7;
        }
      `}</style>
    </div>
  )
}

export default Sidebar
