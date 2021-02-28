import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { AuthClientTokens } from '@react-keycloak/core/lib/types'
import { ReactKeycloakProvider } from '@react-keycloak/web'

import { keycloak } from './auth'
import { client } from './graphql'
import { HomePage } from './pages'
import { RouteWithLayout } from './utils'
import { HeaderContent } from './layouts'

const tokenLogger = (tokens: AuthClientTokens) => {
  const token = tokens.token

  if (token) {
    localStorage.setItem('token', token)
  } else {
    localStorage.removeItem('token')
  }
}

const App: React.FC = () => (
  <ApolloProvider client={client}>
    <ReactKeycloakProvider authClient={keycloak} onTokens={tokenLogger}>
      <CssBaseline />
      <Router>
        <RouteWithLayout
          exact
          path="/"
          layout={HeaderContent}
          component={HomePage}
        />
        <RouteWithLayout
          exact
          path="/home"
          layout={HeaderContent}
          component={HomePage}
        />
      </Router>
    </ReactKeycloakProvider>
  </ApolloProvider>
)

export default App
