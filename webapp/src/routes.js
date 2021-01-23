import { css } from '@emotion/core'
import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { Home } from './home'

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/another'>Another route</Link>
            </li>
          </ul>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={() => (<div>Content for /another route</div>)} exact path='/another' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    display: grid;
    grid-row-gap: 24px;
`

const navStyle = css`
  grid-row: 1;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  a {
    background-color: snow;
    border: 1px solid black;
    border-radius: 1rem;
    color: black;
    font-weight: 700;
    margin .5rem;
    padding: .5rem 2rem;
    text-decoration: none;
  }
  a:hover {
    background-color: lightsteelblue;
  }
  a:active {
    color: snow;
    background-color: steelblue;
  }
  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
  }
  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
  display: grid;
  justify-content: center;
`
