import { render, screen } from '@testing-library/react'
import React from 'react'
import { HistoryWrapper } from '../../../mocks/router-history'
import { Paginator } from './Paginator'

describe('Transactions Table', () => {
  it('should display links to pages 2-5 and the next page with 45 transactions', () => {
    render(<Paginator txCount={45} />, { wrapper: HistoryWrapper })
    expect(screen
      .getAllByRole('link').length)
      .toBe(5)
    expect(screen
      .getByText('4'))
      .toContainHTML('href="/4"')
    expect(screen
      .getByText('>'))
      .toContainHTML('href="/2"')
  })
  it('should display links to pages 2-7 and the next page with 61 transactions', () => {
    render(<Paginator txCount={61} />, { wrapper: HistoryWrapper })
    expect(screen
      .getAllByRole('link').length)
      .toBe(7)
    expect(screen
      .getByText('>'))
      .toContainHTML('href="/2"')
  })
  it('should condense the links to pages 2, 3, 15, 16, 17 and the next page with 165 transactions', () => {
    render(<Paginator txCount={165} />, { wrapper: HistoryWrapper })
    expect(screen
      .getAllByRole('link').length)
      .toBe(6)
    expect(screen
      .getByText('2'))
      .toContainHTML('href="/2"')
    expect(screen
      .getByText('15'))
      .toContainHTML('href="/15"')
    expect(screen
      .getByText('16'))
      .toContainHTML('href="/16"')
    expect(screen
      .getByText('17'))
      .toContainHTML('href="/17"')
  })
})
