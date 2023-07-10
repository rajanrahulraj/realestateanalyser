// referencing from https://www.youtube.com/watch?v=D4jq5Bd9bTA

import './App.css'
import React, { useState, useEffect } from 'react'
import TaxiZones from './ManhattanTaxiData.json'
import Mymap from './Mymap'
import 'leaflet/dist/leaflet.css'
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet'


const TaxiZoneMap = () => {
  const onEachZone = (zone, layer) => {

    const zoneName = zone.properties.zone
    const boroughName = zone.properties.borough
    layer.bindPopup(zoneName + ", Borough: " + boroughName)

  }

  return (
    <div className="TaxiZoneMap">
      <Mymap />
      <MapContainer style={{ height: "80vh" }} zoom={10} center={[40.7, -74]}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON data={TaxiZones.features}
          onEachFeature={onEachZone} />
      </MapContainer>

    </div>
  )
}

export default TaxiZoneMap