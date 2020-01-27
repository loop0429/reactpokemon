import React from 'react'
import App from 'next/app'
import withReduxStore from '../lib/redux'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import '../css/tailwind.css'
import '../css/sprite1.css'
import '../css/sprite2.css'
import '../css/sprite3.css'
import '../css/sprite4.css'
import '../css/sprite5.css'
import '../css/sprite6.css'
import '../css/sprite7.css'
import '../css/sprite8.css'
import '../css/sprite9.css'
import '../css/sprite10.css'
import '../css/sprite11.css'
import '../css/sprite12.css'
import '../css/sprite13.css'
import '../css/sprite14.css'
import '../css/collapse.css'

class MyApp extends App {
  constructor(props) {
    super(props)
    this.persistor = persistStore(props.reduxStore)
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <PersistGate
          loading={null}
          persistor={this.persistor}
        >
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
