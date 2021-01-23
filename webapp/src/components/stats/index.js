import { arrayOf, bool, number, shape, string } from 'prop-types'
import React from 'react'
import { VictoryLabel, VictoryPie } from 'victory'

export function Stats ({ data }) {
  const [creditData, debitData] = [{ x: 'Credit', y: 0 }, { x: 'Debit', y: 0 }]
  data.forEach(
    ({ credit, debit, amount }) => {
      if (credit) creditData.y += amount
      if (debit) debitData.y += amount
    })
  creditData.y /= 100
  debitData.y /= 100

  return (
    <section>
      <VictoryPie
        colorScale={['tomato', 'orange']}
        data={[creditData, debitData]}
        endAngle={-90}
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
                      }
                      ) } : null
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
            outlineColor: 'black',
            stroke: 'rgba(0,0,0,.5)',
            'stroke-width': 0.5
          }} />
        )}
        labelRadius={100}
        startAngle={90}
      />
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
