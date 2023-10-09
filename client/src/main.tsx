import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider domain="pantry-state.eu.auth0.com" clientId='17UMeGoC4bz7axhQYYFwDg6diHEEOKRS' authorizationParams={{
    // redirect_uri: `${window.location.origin}/food-items-list`,
    redirect_uri: `http://localhost:3009/auth/auth0/callback`,
    audience: 'https://pantry-state.eu.auth0.com/api/v2/',
    scope: 'read:current_user',
  }}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
)
