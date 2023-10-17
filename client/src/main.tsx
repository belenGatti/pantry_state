import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Auth0ProviderWithNavigate} from './components/Auth0ProviderWithNavigate'
import {BrowserRouter} from 'react-router-dom'
// @TODO: add react context for state management
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>,
)
