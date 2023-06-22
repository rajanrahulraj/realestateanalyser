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
    options={{
      // left lower corner
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
      },
    }}
  >
    <Marker position={{ lat: 40.7831, lng: -73.9712 }} />
    {/* // add a marker */}
  </GoogleMap>
))

function App () {
  return (
    <div>
      {/* content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}>
        <MapWithCenter
          containerElement={<div style={{ height: '100vh' }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    </div>
  )
}

export default App;

