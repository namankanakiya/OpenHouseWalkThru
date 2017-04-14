// React imports

import React from 'react'
import ReactDOM from 'react-dom'

// Root app
import Root from './app.jsx'

// UI import
import { AppContainer } from 'react-hot-loader'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

render( Root )

// Hot Module Replacement API (auto reload on change)
if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    const NextRoot = require('./app.jsx').default;
    render( NextRoot )
  })
}

// inject our application into the app div in index.html
function render ( RootElement ) {
  ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
          <RootElement/>
      </MuiThemeProvider>
    </AppContainer>,
    document.getElementById('app')
  )
}