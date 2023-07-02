import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app.tsx'

import './styles/globals.css'

import Providers from './providers.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
)
