import React from 'react'
import ReactDOM from 'react-dom'
import Root from './app.jsx'
import { AppContainer } from 'react-hot-loader'

render( Root )

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./app.jsx', () => {
    const NextRoot = require('./app.jsx').default;
    render( NextRoot )
  })
}

function render ( RootElement ) {
  ReactDOM.render(
    <AppContainer>
      <RootElement/>
    </AppContainer>,
    document.getElementById('app')
  )
}