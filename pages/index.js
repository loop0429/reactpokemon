import React from 'react'
import { withRedux } from '../lib/redux'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Modal from '../components/modal'

const IndexPage = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Modal />
    </>
  )
}

export default withRedux(IndexPage)
