import logo from './logo.svg'
import './App.css'
import React from 'react'
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
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* content */}
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '30%',
          top: '30%',
        }}
      >
        <MapWithCenter
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </div>
  )
}

export default App;

