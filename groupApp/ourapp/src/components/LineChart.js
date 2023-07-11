import React from 'react'
import { Line } from 'react-chartjs-2'

const LineChart = () => {
  // Define your data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Dataset 2',
        data: [45, 89, 70, 51, 76, 85],
        fill: false,
        borderColor: 'rgb(192, 75, 192)',
        tension: 0.1
      }
    ]
  }

  // Define the chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  return <Line data={data} options={options} />
}

export default LineChart