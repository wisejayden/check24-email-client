import React from 'react'
import { render } from 'react-dom'
import UserContactForm from './pages/UserContactForm'
import { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    font-family: sans-serif;
  }
`

const renderApp = AppComponent =>
  render(<AppComponent />, document.getElementById('react-root'))

renderApp(UserContactForm)
