import React from 'react'
import { useDispatch } from 'react-redux'
import { showFeatureModal, toggleSidebar } from '../actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

const useHeader = () => {
  const dispatch = useDispatch()

  const handleAboutClick = () => {
    dispatch(showFeatureModal())
  }

  const handleMenuClick = () => {
    dispatch(toggleSidebar())
  }

  return { handleAboutClick, handleMenuClick }
}

const Header = () => {
  const { handleAboutClick, handleMenuClick } = useHeader()
  return (
    <header className="fixed w-full bg-white shadow-md">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-2 py-3">
        <button className="btn-header" type="button" onClick={() => {handleMenuClick()}}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
        <h1 className="text-2xl lg:text-4xl font-semibold text-center">ポケモンGO図鑑</h1>
        <button className="btn-header" type="button" onClick={() => {handleAboutClick()}}>
          <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
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
