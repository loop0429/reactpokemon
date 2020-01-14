import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const useCounter = () => {
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()
  const increment = () => {
    dispatch({
      type: 'INCREMENT',
    })
  }
  const decrement = () => {
    dispatch({
      type: 'DECREMENT',
    })
  }
  const reset = () => {
    dispatch({
      type: 'RESET',
    })
  }
  const modal = () => {
    dispatch({
      type: 'MODAL',
    })
  }
  const modal2 = () => {
    dispatch({
      type: 'MODAL2',
    })
  }
  return { count, increment, decrement, reset, modal, modal2 }
}

const Counter = () => {
  const { count, increment, decrement, reset, modal, modal2 } = useCounter()
  return (
    <div>
      <h1>
        Count: <span>{count}</span>
      </h1>
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
      <button onClick={reset}>Reset</button>
      <button onClick={modal}>Modal</button>
      <button onClick={modal2}>Modal2</button>
    </div>
  )
}

export default Counter
