import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import { updatePage } from '../actions'
import Header from '../components/header'
import Zukan from '../components/zukan'
import Sidebar from '../components/sidebar'
import Modal from '../components/modal'

const usePage = () => {
  // state
  const hasMore = useSelector((state) => state.filteringReducer.hasMore)

  const dispatch = useDispatch()
  const handleLoadMore = () => {
    dispatch(updatePage())
  }

  return { hasMore, handleLoadMore }
}

const IndexPage = () => {
  const { hasMore, handleLoadMore } = usePage()

  return (
    <>
      <Header />
      <InfiniteScroll
        page={0}
        loadMore={() => {handleLoadMore()}}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
        useWindow={false}
      >
        <Zukan />
      </InfiniteScroll>
      <Sidebar />
      <Modal />
    </>
  )
}

export default IndexPage
