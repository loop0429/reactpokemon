import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '../actions'

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
  return (
    <div className={sidebarClass}>
      <div className="sidebar__overlay" onClick={handleOverlayClick} />
      <div className="sidebar__wrapper">
        <dl className="m-0">
          <dt className="bg-gray-200 p-2">絞り込み検索</dt>
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
          transition: all .5s;
          z-index: 50;
        }
        .sidebar__overlay {
          position: fixed;
          top: 0;
          display: none;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0);
          transition: all .5s;
          z-index: 49;
        }
        .sidebar.is-open .sidebar__wrapper {
          transform: translateX(250px);
        }
        .sidebar.is-open .sidebar__overlay {
          display: block;
          background: rgba(0, 0, 0, .5);
        }
      `}</style>
    </div>
  )
}

export default Sidebar
