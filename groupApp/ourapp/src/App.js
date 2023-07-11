import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
import TaxiZoneMap from './TaxiZoneMap'

// import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from "./Auth"
import Main from "./Main"


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

// const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

// const MapWithCenter = withGoogleMap(() => (

//   <GoogleMap
//     apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} // add apiKey
//     defaultZoom={12}
//     defaultCenter={{ lat: 40.7831, lng: -73.9712 }} // position of Manhattan

//   >


//     {/* <Marker position={{ lat: 40.7831, lng: -73.9712 }} /> */}
//     {/* // add a marker */}
//     {/* Render hospital markers */}

//   </GoogleMap>
// ))


// function App () {
//   const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//     datasets: [
//       {
//         labels: 'Dataset',
//         data: [65, 59, 80, 81, 56, 55],

//         borderColor: 'rgb(75, 192, 192)',

//       },

//     ]
//   }

//   // Define the chart options
//   const options = {
//     plugins: {

//       legend: true

//     }
//   }
//   return (
//     <div className='App'>
//       <Line>data={data} options={options}</Line>
//     </div>
//   )
// }

function App () {

  // const [timeRange, setTimeRange] = useState([2015, 2019])
  // // const [activity, setActivity] = useState('pickup')
  // // const [timeSlot, setTimeSlot] = useState('')
  // const [area, setArea] = useState('')

  // const handleTimeRangeChange = (event) => {
  //   setTimeRange(event.target.value)
  // }

  // // const handleActivityChange = (event) => {
  // //   setActivity(event.target.value)
  // // }

  // // const handleTimeSlotChange = (event) => {
  // //   setTimeSlot(event.target.value)
  // // }

  // const handleAreaChange = (event) => {
  //   setArea(event.target.value)
  // }

  // // const [hospitals, setHospitals] = useState([])

  // // useEffect(() => {
  // //   const fetchHospitalsData = async () => {
  // //     try {
  // //       const response = await axios.get(
  // //         `/api/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=150000&type=hospital&key=AIzaSyCyO52_euiv4kQ72cu1H1PpPxbUyA67bUA`, {
  // //         timeout: 5000
  // //       }
  // //       )
  // //       setHospitals(response.data.results)
  // //     } catch (error) {
  // //       console.log('Error fetching hospitals data:', error)
  // //     }
  // //   }

  // //   fetchHospitalsData()
  // // }, [])
  // // console.log(hospitals)

  // const [chartData, setChartData] = useState({
  //   datasets: [],
  // })

  // const [chartOptions, setChartOptions] = useState({})

  // useEffect(() => {
  //   setChartData({
  //     labels: ["1", "2", "3", "4", "5"],
  //     datasets: [
  //       {
  //         label: "Number of passengers",
  //         data: [50, 1, 1, 0, 1000],
  //         borderColor: "rgb(53, 162, 235)",
  //         backgroundColor: "rgba(53, 162, 235, 0.3)",
  //       },
  //     ],
  //   })
  //   setChartOptions({
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         position: "top",
  //       },
  //       title: {
  //         display: true,
  //         text: "Price & Busyness",
  //       },
  //     },
  //   })
  // }, [])
  return (

    // <div className="App">
    //   {/* <LineChart /> */}
    //   <h1>Real Estate Analyzer</h1>
    //   <div className='row'>
    //     <div className='col'>
    //       <div className='filters'>

    //         <h2>Time Filter</h2>
    //         <input
    //           type="range"
    //           min={2015}
    //           max={2019}
    //           value={timeRange}
    //           onChange={handleTimeRangeChange}
    //         />

    //         {/* <h2>Vehicle Activity Choice</h2>
    //     <select value={activity} onChange={handleActivityChange}>
    //       <option value="pickup">Pick-up</option>
    //       <option value="dropoff">Drop-off</option>
    //     </select>

    //     <h2>Time Slot Choice</h2>
    //     <input
    //       type="time"
    //       value={timeSlot}
    //       onChange={handleTimeSlotChange}
    //     /> */}

    //         <h2>Area Choice</h2>
    //         <select value={area} onChange={handleAreaChange}>
    //           <option value="">All Areas</option>
    //           <option value="area1">Area 1</option>
    //           <option value="area2">Area 2</option>
    //           <option value="area3">Area 3</option>
    //         </select>

    //         {/* 其他组件内容 */}
    //       </div>



    //       <div style={{ position: 'relative', width: '100%', height: '70vh' }}>
    //         {/* content */}
    //         <div
    //           style={{
    //             position: 'absolute',
    //             bottom: '0',
    //             left: '10%',
    //             right: '10%',
    //             top: '5%',
    //           }}
    //         >
    //           <MapWithCenter
    //             containerElement={<div style={{ border: '5px solid rgba(255,125,58,0.6)', height: '100%' }} />}
    //             mapElement={<div style={{ height: '100%' }} />}

    //           />

    //         </div>
    //       </div>
    //     </div>

    //     <div className='bar'><Bar options={chartOptions} data={chartData} /></div>
    //     {/* <TaxiZoneMap /> */}
    //   </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
    // </div >

  )
}


export default App;

