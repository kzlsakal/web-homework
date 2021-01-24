import { createMemoryHistory } from 'history'
import { object, string } from 'prop-types'
import React from 'react'
import { Route, Router } from 'react-router-dom'

export function HistoryWrapper ({ children, path = '/1' }) {
  const history = createMemoryHistory({
    initialEntries: [path]
  })
  return (
    <Router history={history}>
      <Route path={path}>{children}</Route>
    </Router>
  )
}

HistoryWrapper.propTypes = { children: object, path: string }
