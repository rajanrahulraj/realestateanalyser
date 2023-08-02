import React, { useState, useEffect } from 'react'
// import { Pie } from 'react-chartjs-2'
// import { Chart, ArcElement } from 'chart.js'
// Chart.register(ArcElement)
import { Bar } from 'react-chartjs-2'
import realdata from '../data/pricehistory.json'

const T = () => {
  const [dropoffLocationID, setDropoffLocationID] = useState(4)
  const [startYear, setStartYear] = useState(2017)

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
  for (let j = 2017; j <= 2021; j++) {
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
      const url = `/app/trip/dropoff?dropoffLocationID=${dropoffLocationID}&year=${startYear}`
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


  // Process data to prepare it for the horizontal bar chart
  const prepareChartData = () => {
    const labels = data.dropoffLocationID
    const value1 = data.totalPassengers
    const value2 = data.tripCount
    return {
      labels: ["Total Passengers and Trip Count"],
      datasets: [
        {
          label: "Total Passengers",
          data: [value1],

          backgroundColor: "rgba(255, 99, 132, 0.6)"
        },
        {
          label: "Trip Count",
          data: [value2],

          backgroundColor: "rgba(54, 162, 235, 0.6)"
        }
      ],

    }
  }

  return (
    <div style={{ height: '300px' }}>

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
        Year:
        <select

          value={startYear}
          onChange={(e) => handleFilterChange('startYear', e.target.value)}
        >
          {yearOptions}
        </select>
      </label>



      {/* Render the horizontal bar chart */}
      <Bar
        data={prepareChartData()}

      />
    </div>
  )
}

export default T
