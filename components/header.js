import React from 'react'
import { useDispatch } from 'react-redux'
import { showFeatureModal, toggleSidebar } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

const useHeader = () => {
  const dispatch = useDispatch()

  // 右上のフィーチャーボタン押下時
  const handleFeatureClick = () => {
    dispatch(showFeatureModal())
  }

  // 左上のメニューボタン押下時
  const handleMenuClick = () => {
    dispatch(toggleSidebar())
  }

  return { handleFeatureClick, handleMenuClick }
}

const Header = () => {
  const { handleFeatureClick, handleMenuClick } = useHeader()
  return (
    <header className="fixed w-full bg-white shadow-md z-10">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-2 py-3">
        <button
          className="btn-header"
          type="button"
          onClick={() => {handleMenuClick()}}
        >
          <FontAwesomeIcon
            icon={faBars}
            size="2x"
          />
        </button>
        <h1 className="text-2xl lg:text-4xl font-semibold text-center">ポケモンGO図鑑</h1>
        <button
          className="btn-header"
          type="button"
          onClick={() => {handleFeatureClick()}}
        >
          <FontAwesomeIcon
            icon={faQuestionCircle}
            size="2x"
          />
        </button>
      </div>
      <style jsx>{`
        .btn-header:focus {
          outline: none;
        }
      `}</style>
    </header>
  )
}

export default Header
