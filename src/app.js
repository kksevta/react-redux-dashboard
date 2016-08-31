import React from 'react'
import { render } from 'react-dom'
import Routes from './modules/routes'
import {Provider} from 'react-redux'
import Store from './modules/app-store'

render(
  <Provider store={Store}>
    <Routes/>
  </Provider>,
  document.getElementById('root')
)