import React from 'react'
import { Chart } from 'react-google-charts';

const LineChart = props => {
  const vAxisLabel = props.data[0][1]

  return (
    <div className='chart-container'>
      <div>
        <h3>{props.selectedExercise}</h3>
        <Chart
          chartType="LineChart"
          data={props.data}
          options={{
            hAxis: {
              title: 'Date',
            },
            vAxis: {
              title: `${vAxisLabel}`,
            },
          }}
          graph_id="LineChart"
          width="100%"
          height="400px"
        />
      </div>
    </div>
  )
}

export default LineChart
