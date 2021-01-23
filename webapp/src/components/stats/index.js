import { css } from '@emotion/core'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import React from 'react'
import { VictoryChart, VictoryLabel, VictoryPie, VictoryScatter, VictoryTooltip, VictoryZoomContainer } from 'victory'
import { createUserExpenseDataLabel, getCreditDebitStats, getUserExpenseData } from '../../utils'

export function Stats ({ data }) {
  const creditDebitStats = getCreditDebitStats(data)
  const userExpenseData = getUserExpenseData(data)
  return (
    <section css={styles}>
      <div>
        <h1>Credit : Debit Ratio</h1>
        <VictoryPie
          colorScale={['tomato', 'orange']}
          data={creditDebitStats}
          events={[{
            target: 'data',
            eventHandlers: {
              onMouseOver: () => {
                return [
                  {
                    target: 'data',
                    mutation: ({ style }) => {
                      return style.fill === 'firebrick'
                        ? null
                        : { style: { fill: 'firebrick' } }
                    }
                  }, {
                    target: 'labels',
                    mutation: ({ text, datum }) => {
                      return text === datum.x
                        ? { text: datum.y.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                          style: 'currency',
                          currency: 'USD'
                        }) }
                        : null
                    }
                  }
                ]
              },
              onMouseOut: () => {
                return [
                  { target: 'data', mutation: () => null },
                  { target: 'labels', mutation: () => null }
                ]
              }
            }
          }]}
          labelComponent={(
            <VictoryLabel style={{
              fill: 'snow',
              fontWeight: 700,
              fontSize: 20,
              stroke: 'rgba(0,0,0,.5)',
              strokeWidth: 0.3
            }} />
          )}
          labelRadius={26}
        />
      </div>
      <div>
        <h1>Expense Counts and Amounts Per User</h1>
        <VictoryChart
          containerComponent={(
            <VictoryZoomContainer
              zoomDomain={{
                x: [0, userExpenseData.maxExpense + userExpenseData.maxExpense / 10],
                y: [0, userExpenseData.maxCount + userExpenseData.maxCount / 10]
              }}
            />
          )}
        >
          <VictoryScatter
            data={userExpenseData}
            domain={{
              x: [0, userExpenseData.maxExpense + userExpenseData.maxExpense / 10],
              y: [0, userExpenseData.maxCount + userExpenseData.maxCount / 10]
            }}
            labelComponent={<VictoryTooltip centerOffset={{ x: 25 }} dy={0} flyoutPadding={10} />}
            labels={createUserExpenseDataLabel}
            style={{
              data: {
                opacity: ({ datum }) => datum.y % 2 ? 0.7 : 0.4,
                fill: ({ datum }) => datum.y % 2 ? 'tomato' : 'black'
              }
            }}
          />
        </VictoryChart>
      </div>
    </section>
  )
}

Stats.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }))
}

const styles = css`
  background-color: gainsboro;
  border-radius: 5rem;
  margin-bottom: 10rem;
  text-align: center;
  width: 100vh;
`
