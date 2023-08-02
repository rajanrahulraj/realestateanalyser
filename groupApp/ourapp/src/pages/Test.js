// referencing from https://www.youtube.com/watch?v=D4jq5Bd9bTA
// referencing from https://codewithwolf.com/how-to-change-marker-color-react-leaflet

import React, { useState, useEffect } from 'react'
import TaxiZones from '../data/ManhattanTaxiData.json'
import Mymap from '../Mymap'
// import 'leaflet/dist/leaflet.css'
import { MapContainer, GeoJSON, TileLayer, Marker, Popup } from 'react-leaflet'
import { parse } from 'papaparse'
import schooldata from '../data/schooldata.json'
import hospitaldata from '../data/hospitaldata.json'
import taxidata from '../data/2021taxi.json'
import realestatedata from '../data/realestate.json'


import * as L from "leaflet"
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
ChartJS.register(CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend)

// Helper function to get the color based on the value and gradient
const getColor = (value, gradient) => {
  const length = gradient.length
  const index = Math.floor(value * length)
  return gradient[Math.min(index, length - 1)]
}




const Test = () => {
  console.log(realestatedata[0].LocationID)
  const [filteredData, setFilteredData] = useState([])
  const [selectedLocationID, setSelectedLocationID] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  // Extract all unique LocationID and Date options from the JSON data
  const locationIDOptions = Array.from(new Set(taxidata.map(item => item.LocationID)))
  const dateOptions = Array.from(new Set(taxidata.map(item => item.Date)))
  const yearOptions = Array.from(new Set(taxidata.map(item => item.Year)))

  const filterData = () => {
    console.log(realestatedata[0])
    let filteredItems = taxidata

    if (selectedLocationID) {
      filteredItems = filteredItems.filter(item => item.LocationID === selectedLocationID)
    }

    if (selectedDate) {
      filteredItems = filteredItems.filter(item => item.Date === selectedDate)
    }

    if (selectedYear) {
      filteredItems = filteredItems.filter(item => item.Year === selectedYear)
    }

    setFilteredData(filteredItems)
  }

  return (
    <div>
      <label htmlFor="locationSelect">Choose a Location ID:</label>
      <select id="locationSelect" value={selectedLocationID} onChange={(e) => setSelectedLocationID(e.target.value)}>
        <option value="">All</option>
        {locationIDOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
        {/* Add more options based on your data */}
      </select>


      <label htmlFor="dateSelect">Choose a date:</label>
      <select id="dateSelect" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
        <option value="">All</option>
        {dateOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>

      <label htmlFor="yearSelect">Choose a year:</label>
      <select id="yearSelect" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
        <option value="">All</option>
        {yearOptions.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>



      <button onClick={filterData}>Filter</button>
      <div>
        <h2>Filtered Data:</h2>
        <ul>
          {filteredData.map((item, index) => (
            <li key={index}>locationID: {item.LocationID}, pick up passenger: {item.PU_passenger}, drop off passenger: {item.DO_passenger}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Test