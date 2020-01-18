import React from 'react'
import { withRedux } from '../lib/redux'
import Sidebar from '../components/sidebar'
import Modal from '../components/modal'

const IndexPage = () => {
  return (
    <>
      <Modal />
    </>
  )
}

export default withRedux(IndexPage)
