import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider domain="pantry-state.eu.auth0.com" clientId='17UMeGoC4bz7axhQYYFwDg6diHEEOKRS' authorizationParams={{
    redirect_uri: `${window.location.origin}/food-items-list`
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
)
