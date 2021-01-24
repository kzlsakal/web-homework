import { css } from '@emotion/core'
import { number } from 'prop-types'
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PageLink = ({ num }) => (
  <Link key={`tx-page-${num}`} to={`${num}`}> {num} </Link>
)

export function Paginator ({ txCount }) {
  let { pageNo } = useParams()
  pageNo = pageNo > 0 ? Number(pageNo) : 1
  const numberOfPages = Math.ceil(txCount / 10)

  if (numberOfPages > 12) {
    return (
      <nav css={styles}>
        { pageNo > 1 ? <Link to={`${pageNo - 1}`}>&lt;</Link> : <span>&lt;</span>}

        {[1, 2, 3].map((num) =>
          num === pageNo
            ? <span key={`tx-pagelink-text-${num}`}>{num}</span>
            : <PageLink key={`tx-pagelink-${num}`} num={num} />
        )}

        .{pageNo > 3 && pageNo < numberOfPages - 2 ? <span>{pageNo}</span> : '...'}.

        {[numberOfPages - 2, numberOfPages - 1, numberOfPages].map((num) =>
          num === pageNo
            ? <span key={`tx-pagelink-text-${num}`}>{num}</span>
            : <PageLink key={`tx-pagelink-${num}`} num={num} />
        )}

        { pageNo < numberOfPages ? <Link to={`${pageNo + 1}`}>&gt;</Link> : <span>&gt;</span>}

        <div>Current Page: {pageNo} | Total Number of Transactions: {txCount}</div>
      </nav>
    )
  }

  return (
    <nav css={styles}>
      { pageNo > 1 ? <Link to={`${pageNo - 1}`}>&lt;</Link> : <span>&lt;</span>}

      {Array.from({ length: numberOfPages }, (_, idx) => (
        idx + 1 === pageNo
          ? <span key={`tx-pagelink-text-${idx + 1}`}>{idx + 1}</span>
          : <PageLink key={`tx-pagelink-${idx + 1}`} num={idx + 1} />
      ))}

      { pageNo < numberOfPages ? <Link to={`${pageNo + 1}`}>&gt;</Link> : <span>&gt;</span>}

      <div>Current Page: {pageNo} | Total Number of Transactions: {txCount}</div>
    </nav>
  )
}

Paginator.propTypes = { txCount: number }
PageLink.propTypes = { num: number }

const styles = css`
  margin-bottom: 1rem;
  text-align: center;
  user-select:none;
  font-size: small;
  a {
    background-color: whitesmoke;
    border: lightgray 1px solid;
    border-radius: 10px;
    color: black;
    display: inline-block;
    font-weight: 700;
    margin: .5rem .3rem;
    padding: .6rem;
    text-decoration: none;
  }
  a:hover {
    background-color: lightsteelblue;
  }
  a:visited {
    color: black;
  }
  span {
    background-color: lightgray;
    border: lightgray 1px solid;
    border-radius: .8rem;
    display: inline-block;
    font-weight: 700;
    margin: .5rem .3rem;
    padding: .6rem;
  }
`
