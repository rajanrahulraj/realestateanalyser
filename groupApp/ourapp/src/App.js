import logo from './logo.svg'
import './App.css'
import React, { useState } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY


const MapWithCenter = withGoogleMap(() => (
  <GoogleMap
    apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} // add apiKey
    defaultZoom={12}
    defaultCenter={{ lat: 40.7831, lng: -73.9712 }} // position of Manhattan

  >
    <Marker position={{ lat: 40.7831, lng: -73.9712 }} />
    {/* // add a marker */}
  </GoogleMap>
))

function App () {
  const [timeRange, setTimeRange] = useState([2015, 2019])
  const [activity, setActivity] = useState('pickup')
  const [timeSlot, setTimeSlot] = useState('')
  const [area, setArea] = useState('')

  const handleTimeRangeChange = (event) => {
    setTimeRange(event.target.value)
  }

  const handleActivityChange = (event) => {
    setActivity(event.target.value)
  }

  const handleTimeSlotChange = (event) => {
    setTimeSlot(event.target.value)
  }

  const handleAreaChange = (event) => {
    setArea(event.target.value)
  }
  return (
    <div>
      <div>

        <h2>Time Filter</h2>
        <input
          type="range"
          min={2015}
          max={2019}
          value={timeRange}
          onChange={handleTimeRangeChange}
        />

        <h2>Vehicle Activity Choice</h2>
        <select value={activity} onChange={handleActivityChange}>
          <option value="pickup">Pick-up</option>
          <option value="dropoff">Drop-off</option>
        </select>

        <h2>Time Slot Choice</h2>
        <input
          type="time"
          value={timeSlot}
          onChange={handleTimeSlotChange}
        />

        <h2>Area Choice</h2>
        <select value={area} onChange={handleAreaChange}>
          <option value="">All Areas</option>
          <option value="area1">Area 1</option>
          <option value="area2">Area 2</option>
          <option value="area3">Area 3</option>
        </select>

        {/* 其他组件内容 */}
      </div>



      <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
        {/* content */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '30%',
            top: '5%',
          }}
        >
          <MapWithCenter
            containerElement={<div style={{ height: '100%' }} />}
            mapElement={<div style={{ height: '100%' }} />}
          />
        </div>
      </div>
    </div>
  )
}

export default App;

