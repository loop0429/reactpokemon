import React from 'react'
import { withRedux } from '../lib/redux'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Modal from '../components/modal'
import { showFeatureModal } from '../actions'
import { useDispatch } from 'react-redux'

const useModal = () => {
  const dispatch = useDispatch()

  const open = () => {
    dispatch(showFeatureModal('FEATURE'))
  }

  return { open }
}

const IndexPage = () => {
  const { open } = useModal()
  return (
    <>
      <Header />
      <button type="button" onClick={open}>hoge</button>
      <Modal />
    </>
  )
}

export default withRedux(IndexPage)
