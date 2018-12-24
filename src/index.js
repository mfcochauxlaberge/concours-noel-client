import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'

import { BrowserRouter } from 'react-router-dom'

// Services
import { SessionProvider } from './services/session'

import './styles/main.scss'

import App from './App.jsx'

ReactDOM.render(
  <SessionProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SessionProvider>,
  document.getElementById('app'),
)

hot.module.accept()
