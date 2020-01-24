import React from 'react'
import { withRedux } from '../lib/redux'
import Header from '../components/header'
import Zukan from '../components/zukan'
import Sidebar from '../components/sidebar'
import Modal from '../components/modal'

const IndexPage = () => {
  return (
    <>
      <Header />
      <Zukan />
      <Sidebar />
      <Modal />
    </>
  )
}

export default withRedux(IndexPage)
