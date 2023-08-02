import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import realdata from '../data/pricehistory.json'
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'
Chart.register(LineController, LineElement, PointElement, LinearScale, Title)
Chart.register(PointElement)



const PredictionPrice = () => {
  // Calculate the trendline using linear regression
  const calculateTrendline = (data) => {
    const n = data.length
    let sumX = 0
    let sumY = 0
    let sumXY = 0
    let sumX2 = 0

    for (let i = 0; i < n; i++) {
      sumX += i
      sumY += data[i]
      sumXY += i * data[i]
      sumX2 += i * i
    }

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    const trendline = []
    for (let i = 0; i < n; i++) {
      trendline.push(slope * i + intercept)
    }

    return trendline
  }
  const [dropoffLocationID, setDropoffLocationID] = useState(4)
  const [startYear, setStartYear] = useState(5)

  const [data, setData] = useState([])
  // Create an array of options for the Location ID dropdown
  // Filter the data for the year 2017
  const data2017 = realdata.filter((item) => item.year === 2017)

  // Extract unique locationid values for the year 2017
  const locationIDs2017 = [...new Set(data2017.map((item) => item.locationid))]

  // Generate locationIDOptions based on locationIDs2017 and sort them in ascending order
  const locationIDOptions = locationIDs2017
    .sort((a, b) => a - b) // Sort in ascending order based on id values
    .map((id) => (
      <option key={id} value={id}>
        {id}
      </option>
    ))


  const yearOptions = []
  for (let j = 1; j <= 20; j++) {
    yearOptions.push(
      <option key={j} value={j}>
        {j}
      </option>
    )
  }
  useEffect(() => {
    fetchData()
  }, [dropoffLocationID, startYear])

  const fetchData = async () => {
    try {
      const url = `/ml/realestate/priceprediction?location_id=${dropoffLocationID}&num_years=${startYear}`
      const response = await fetch(url)
      const jsonData = await response.json()
      setData(jsonData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleFilterChange = (filterName, value) => {
    if (filterName === 'dropoffLocationID') {
      setDropoffLocationID(value)
    } else if (filterName === 'startYear') {
      setStartYear(value)
    }
  }


  // Process data to prepare it for the bar chart
  const prepareChartData = () => {
    const labels = data.map((item) => item.year)
    const barData = data.map((item) => item.predicted_val)
    // Sort the data based on the year labels in ascending order
    const sortedData = labels.map((label, index) => ({
      label: label,
      price: barData[index],
    })).sort((a, b) => a.label - b.label)

    // Extract the sorted labels and barData after sorting
    const sortedLabels = sortedData.map((item) => item.label)
    const sortedLineData = sortedData.map((item) => item.price)
    // Calculate the trendline using linear regression
    const trendline = calculateTrendline(sortedLineData)
    return {
      labels: sortedLabels,
      datasets: [
        {
          label: 'Price',
          data: barData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          pointRadius: 0, // Hide data points
        }

      ],
    }
  }


  return (
    <div>

      <label>
        Location ID:
        <select
          value={dropoffLocationID}
          onChange={(e) => handleFilterChange('dropoffLocationID', e.target.value)}
        >
          {locationIDOptions}
        </select>
      </label>
      <label>
        The length of years you want:
        <select
          value={startYear}
          onChange={(e) => handleFilterChange('startYear', e.target.value)}
        >
          {yearOptions}
        </select>
      </label>



      {/* Render the horizontal bar chart */}
      <Line
        data={prepareChartData()}

      />
    </div>
  )
}

export default PredictionPrice
