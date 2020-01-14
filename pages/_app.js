import React from 'react'
import App from 'next/app'
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

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp
