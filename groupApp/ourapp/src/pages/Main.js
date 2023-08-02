// referencing from https://stackoverflow.com/questions/72382437/react-invalid-hook-call-while-using-chartjs

import '../App.css'
import React, { useState, useEffect } from 'react'

import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
// import "bootstrap/dist/css/bootstrap.min.css"

ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend)

// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   PointElement,
//   LinearScale
// } from 'chart.js'

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement
// )

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const MapWithCenter = withGoogleMap(() => (
  <GoogleMap
    apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} // add apiKey
    defaultZoom={12}
    defaultCenter={{ lat: 40.7831, lng: -73.9712 }} // position of Manhattan

  >
    {/* <Marker position={{ lat: 40.7831, lng: -73.9712 }} /> */}
    {/* // add a marker */}
    {/* Render hospital markers */}
  </GoogleMap>
))


function Main () {

  const [timeRange, setTimeRange] = useState([2015, 2019])

  const [area, setArea] = useState('')

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value)
  }



  const handleAreaChange = (event) => {
    setArea(event.target.value)
  }


  const [chartData, setChartData] = useState({
    datasets: [],
  })

  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    setChartData({
      labels: ["1", "2", "3", "4", "5"],
      datasets: [
        {
          label: "Number of passengers",
          data: [50, 1, 1, 0, 1000],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.3)",
        },
      ],
    })
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Price & Busyness",
        },
      },
    })
  }, [])
  return (

    <div className="App">

      <h1>Real Estate</h1>
      <div className="d-flex">
        <div className="col">
          <div className="filters">

            <h2>Time Filter</h2>
            <input
              type="range"
              min={2015}
              max={2019}
              value={timeRange}
              onChange={handleTimeRangeChange}
            />


            <h2>Area Choice</h2>
            <select value={area} onChange={handleAreaChange}>
              <option value="">All Areas</option>
              <option value="area1">Area 1</option>
              <option value="area2">Area 2</option>
              <option value="area3">Area 3</option>
            </select>


          </div>



          <div style={{ position: 'relative', width: '100%', height: '70vh' }}>
            {/* content */}
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                left: '10%',
                right: '10%',
                top: '5%',
              }}
            >
              <MapWithCenter
                containerElement={<div style={{ border: '5px solid rgba(255,125,58,0.6)', height: '100%' }} />}
                mapElement={<div style={{ height: '100%' }} />}

              />

            </div>
          </div>
        </div>

        <div><Bar options={chartOptions} data={chartData} /></div>

      </div>

    </div>

  )
}


export default Main;

